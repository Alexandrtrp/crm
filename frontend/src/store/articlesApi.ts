import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/articles" }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query<Article[], void>({
      query: () => "",
      providesTags: ['Articles'],
    }),
    addStock: builder.mutation< void, { articleId: number; amount: number; warehouseId: number } >({
      query: (body)=> ({
        url: '/add-stock',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Articles'],
    })
  }),
});

export const { useGetArticlesQuery, useAddStockMutation } = articlesApi
