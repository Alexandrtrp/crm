import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateTaskDto {
  title: string;
  description: string;
  assigneeId: number;
  dueDate: string;
  status?: string;
}

interface UpdateTaskStatusDto {
  status: string;
}

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "api/" }),
  tagTypes: ["Tasks"],
  endpoints: (buider) => ({
    getTasks: buider.query<TTask[], void>({
      query: () => "tasks",
      providesTags: ["Tasks"],
    }),
    createTask: buider.mutation<TTask, CreateTaskDto>({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: buider.mutation<TTask, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `tasks/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
} = taskApi;
