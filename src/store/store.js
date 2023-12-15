import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi/productsApi";
import { oneProductsApi } from "./oneProductApi/oneProductApi";
import { userApi } from "./userApi/userApi";
import { authApi } from "./authApi/authApi";


export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [oneProductsApi.reducerPath]: oneProductsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        productsApi.middleware,
        oneProductsApi.middleware,
        userApi.middleware,
        authApi.middleware,
    ),
});