import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import userReducer from "./userSlise";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
