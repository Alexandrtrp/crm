import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { componentsApi } from './componentsApi';
import { articlesApi } from './articlesApi';
import { taskApi } from './taskApi';
import { userApi } from './userApi';
import authReducer from "./authSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
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
      .concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
