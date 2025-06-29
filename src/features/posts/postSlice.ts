import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type PostType = 'Контент' | 'Событие' | 'Вакансия';
export type Direction = 'Frontend Developer' | 'Backend Developer' | 'QA Engineer' | 'Designer' | 'Manager' | 'HR';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    nickname: string;
    role: Direction;
  };
  type: PostType;
  direction: Direction;
  likes: number;
  isLikedByUser: boolean;
  previewImage?: string;
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  filterType: PostType | '';
  filterDirection: Direction | '';
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  filterType: '',
  filterDirection: '',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (filters: { type?: PostType; direction?: Direction } = {}) => {
    const params = new URLSearchParams();
    if (filters.type) params.append('type', filters.type);
    if (filters.direction) params.append('direction', filters.direction);
    const res = await fetch(`http://localhost:5000/api/posts?${params.toString()}`, {
      credentials: 'include',
    });
    const data = await res.json();
    // Преобразуем _id в id и добавляем isLikedByUser (заглушка, потом будет с сервера)
    return data.map((post: any) => ({
      ...post,
      id: post._id,
      isLikedByUser: false, // потом заменить на реальное значение
    }));
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setFilterType(state, action: PayloadAction<PostType | ''>) {
      state.filterType = action.payload;
    },
    setFilterDirection(state, action: PayloadAction<Direction | ''>) {
      state.filterDirection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки постов';
      });
  },
});

export const { setFilterType, setFilterDirection } = postsSlice.actions;
export default postsSlice.reducer; 