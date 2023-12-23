import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi/productsApi";
import { userApi } from "./userApi/userApi";
import userReducer from './userSlise'


export const store = configureStore({
  reducer: {
    user: userReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        productsApi.middleware,
        userApi.middleware,
    ),
});