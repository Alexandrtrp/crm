import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const componentsApi = createApi({
  reducerPath: "componentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/components" }),
  endpoints: (builder) => ({
    getComponents: builder.query<TComponents[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetComponentsQuery } = componentsApi;
