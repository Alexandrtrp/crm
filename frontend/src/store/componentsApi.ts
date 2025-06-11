// src/services/componentsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type TComponents = {
  name: string;
  id: number;
  componentsInStock: TComponent[];
};

type TComponent = {
  id: number;
  count: number;
  componentId: number;
  warehouse: TWarehouse;
};

type TWarehouse = {
  id: number;
  nane: string;
  location?: string;
};

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
