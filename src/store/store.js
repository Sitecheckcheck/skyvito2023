import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import userReducer from "./userSlise";
import myProductsReducer from "./myProductsSlise";

export const store = configureStore({
  reducer: {
    user: userReducer,
    myProducts: myProductsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
