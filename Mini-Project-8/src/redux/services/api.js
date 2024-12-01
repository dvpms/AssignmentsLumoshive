import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Menyiapkan RTK Query API Slice
export const postsApi = createApi({
  reducerPath: "postsApi", // Nama untuk slice ini
  baseQuery: fetchBaseQuery({
    baseUrl: "https://lumoshive-academy-media-api.vercel.app/", // Base URL API Anda
  }),
  endpoints: (builder) => ({
    // Endpoint untuk mendapatkan recent posts
    getRecentPosts: builder.query({
      query: (page = 5) => `api/games?page=${page}`, // Mengambil data game berdasarkan halaman
    }),

    // Endpoint untuk mendapatkan posts
    getPosts: builder.query({
      query: (page = 5, search = "") =>
        `api/games/news?page=${page}&search=${search}`, // Mengambil news game
    }),

    // Endpoint untuk mendapatkan detail post berdasarkan URL
    getPostDetail: builder.query({
      query: (Key) => `api/detail/${Key}`, // URL untuk detail post
    }),

    // Endpoint untuk subscribe
    subscribe: builder.mutation({
      query: (email) => ({
        url: "api/subscribe", // URL untuk subscribe
        method: "POST",
        body: { email }, // Body berisi email yang akan disubscribe
      }),
    }),
  }),
});

export const {
  useGetRecentPostsQuery,
  useGetPostsQuery,
  useGetPostDetailQuery,
  useSubscribeMutation,
} = postsApi;
