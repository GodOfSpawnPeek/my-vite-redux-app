import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Role = 'Frontend Developer' | 'Backend Developer' | 'QA Engineer' | 'Designer' | 'Manager' | 'HR';

interface User {
  id: string;
  nickname: string;
  role: Role;
  token: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

// Селекторы
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectUser = (state: { user: UserState }) => state.user.user; 