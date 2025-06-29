import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { UserProfile, Project } from './types';

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      credentials: 'include',
    });
    const data = await res.json();
    // Преобразуем _id в id для пользователя и проектов
    return {
      ...data,
      id: data._id,
      portfolio: (data.portfolio || []).map((p: any) => ({ ...p, id: p._id })),
    } as UserProfile;
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ id, values }: { id: string; values: Partial<UserProfile> }) => {
    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(values),
    });
    const data = await res.json();
    return {
      ...data,
      id: data._id,
      portfolio: (data.portfolio || []).map((p: any) => ({ ...p, id: p._id })),
    } as UserProfile;
  }
);

export const addProject = createAsyncThunk(
  'profile/addProject',
  async ({ userId, project }) => {
    const res = await fetch(`http://localhost:5000/api/users/${userId}/portfolio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(project),
    });
    const data = await res.json();
    // Преобразуем _id в id для фронта
    return { ...data, id: data._id };
  }
);

export const updateProject = createAsyncThunk(
  'profile/updateProject',
  async ({ userId, projectId, values }: { userId: string; projectId: string; values: Partial<Project> }) => {
    const res = await fetch(`http://localhost:5000/api/users/${userId}/portfolio/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(values),
    });
    const data = await res.json();
    return { ...data, id: data._id } as Project;
  }
);

export const deleteProject = createAsyncThunk(
  'profile/deleteProject',
  async ({ userId, projectId }: { userId: string; projectId: string }, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:5000/api/users/${userId}/portfolio/${projectId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) {
      const error = await res.text();
      return rejectWithValue(error);
    }
    return projectId;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки профиля';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.portfolio.push(action.payload);
        }
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.portfolio = state.profile.portfolio.map(p =>
            p.id === action.payload.id ? action.payload : p
          );
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.portfolio = state.profile.portfolio.filter(p => p.id !== action.payload);
        }
      });
  },
});

export default profileSlice.reducer; 