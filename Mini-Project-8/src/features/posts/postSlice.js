import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Menyiapkan RTK Query API Slice
export const postsApi = createApi({
  reducerPath: 'postsApi', // Nama untuk slice ini
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://lumoshive-academy-media-api.vercel.app/', // Base URL API Anda
  }),
  endpoints: (builder) => ({
    // Endpoint untuk mendapatkan recent posts
    getRecentPosts: builder.query({
      query: (page = 5) => `api/games?page=${page}`, // Mengambil data game berdasarkan halaman
    }),

    // Endpoint untuk mendapatkan posts
    getPosts: builder.query({
      query: (page = 5, search = '') => `api/games/news?page=${page}&search=${search}`, // Mengambil news game
    }),

    // Endpoint untuk mendapatkan detail berdasarkan URL tertentu
    getPostDetail: builder.query({
      query: (year, month, day, slug) => 
        `api/detail/${year}/${month}/${day}/${slug}`, // URL untuk detail post
    }),

    // Endpoint untuk subscribe
    subscribe: builder.mutation({
      query: (email) => ({
        url: 'api/subscribe', // URL untuk subscribe
        method: 'POST',
        body: { email }, // Body berisi email yang akan disubscribe
      }),
    }),
  }),
});

// Export hooks yang dihasilkan oleh RTK Query
export const {
  useGetRecentPostsQuery,
  useGetPostsQuery,
  useGetPostDetailQuery,
  useSubscribeMutation,
} = postsApi;
