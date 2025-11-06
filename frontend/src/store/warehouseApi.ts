import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const warehouseApi = createApi({
  reducerPath: 'warehouseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/warehouse' }),
  tagTypes: ['Warehouse'],
  endpoints: (builder) => ({
    getWarehouses: builder.query<TWarehouse[], void>({
      query: () => '',
      providesTags: ['Warehouse'],
    }),
  }),
});

export const { useGetWarehousesQuery } = warehouseApi;
