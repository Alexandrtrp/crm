// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { componentsApi } from "./componentsApi";
import { articlesApi } from "./articlesApi";

export const store = configureStore({
  reducer: {
    [componentsApi.reducerPath]: componentsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(componentsApi.middleware)
      .concat(articlesApi.middleware),
});

setupListeners(store.dispatch);
