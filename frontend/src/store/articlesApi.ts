import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/articles" }),
  endpoints: (builder) => ({
    getArticles: builder.query<Article[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetArticlesQuery } = articlesApi
