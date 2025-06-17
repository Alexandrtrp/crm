import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignee: { id: number; name: string };
  dueDate: string;
}

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
    getTasks: buider.query<Task[], void>({
      query: () => "tasks",
      providesTags: ["Tasks"],
    }),
    createTask: buider.mutation<Task, CreateTaskDto>({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: buider.mutation<Task, { id: number; status: string }>({
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
