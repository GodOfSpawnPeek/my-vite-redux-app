import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import postReducer from './features/posts/postSlice';
import profileReducer from './features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 