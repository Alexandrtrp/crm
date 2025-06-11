// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { componentsApi } from './componentsApi'

export const store = configureStore({
  reducer: {
    [componentsApi.reducerPath]: componentsApi.reducer,
    // другие редьюсеры...
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(componentsApi.middleware),
})

setupListeners(store.dispatch)
