// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { componentsApi } from "./componentsApi";
import { articlesApi } from "./articlesApi";
import { taskApi } from "./taskApi";

export const store = configureStore({
  reducer: {
    [componentsApi.reducerPath]: componentsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(componentsApi.middleware)
      .concat(articlesApi.middleware)
      .concat(taskApi.middleware),
});

setupListeners(store.dispatch);
