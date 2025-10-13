// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { componentsApi } from "./componentsApi";
import { articlesApi } from "./articlesApi";
import { taskApi } from "./taskApi";
import { userApi } from "./userApi";

export const store = configureStore({
  reducer: {
    [componentsApi.reducerPath]: componentsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(componentsApi.middleware)
      .concat(articlesApi.middleware)
      .concat(taskApi.middleware)
      .concat(userApi.middleware)
});

setupListeners(store.dispatch);
