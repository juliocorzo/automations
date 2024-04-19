import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Todo } from '@prisma/client';

type CreateArgs = {
  user: string;
  title: string;
  description: string;
  duedate: string;
};

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/todo' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    createTodo: builder.mutation<Todo, CreateArgs>({
      query: ({
        user, title, description, duedate,
      }) => ({
        url: `/create?user=${encodeURIComponent(user)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&duedate=${duedate}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Todo' }],
    }),
    getTodosByUser: builder.query<Todo[], string>({
      query: (user) => `/get/${user}`,
      transformResponse: (response: { data: Todo[] }) => response.data,
      providesTags: [{ type: 'Todo' }],
    }),
    updateTodoById: builder.mutation<Todo, { id: number; completed: boolean }>({
      query: ({ id, completed }) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body: { completed },
      }),
      invalidatesTags: [{ type: 'Todo' }],
    }),
  }),
});

export const { useCreateTodoMutation, useGetTodosByUserQuery } = todoApi;
