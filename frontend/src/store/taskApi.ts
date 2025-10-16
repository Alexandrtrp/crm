import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TTask } from '../types/types';

interface CreateTaskDto {
  title: string;
  description: string;
  assigneeId: string;
}

interface UpdateTaskStatusDto {
  status: string;
}

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<TTask[], void>({
      query: () => 'tasks',
      providesTags: (result) =>
        result
          ? [
              ...result.map((task) => ({ type: 'Tasks' as const, id: task.id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),

    createTask: builder.mutation<TTask, CreateTaskDto>({
      query: (body) => ({
        url: 'tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    updateTaskStatus: builder.mutation<TTask, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `tasks/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tasks', id }],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskStatusMutation } = taskApi;
