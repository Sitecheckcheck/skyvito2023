import { configureStore } from "@reduxjs/toolkit";
// import userReduser from "./slices/userSlice";
// import courseReduser from "./slices/courseSlise";
import { productsApi } from "./productsApi/productsApi";
import { oneProductsApi } from "./oneProductApi/oneProductApi";


export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [oneProductsApi.reducerPath]: oneProductsApi.reducer,
    // user: userReduser,
    // course: courseReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        productsApi.middleware,
        oneProductsApi.middleware,
    ),
});