import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './services/api';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer, // Menambahkan apiSlice ke store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware), // Menambahkan middleware dari RTK Query
});

export default store;
