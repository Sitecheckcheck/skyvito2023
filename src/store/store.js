import { configureStore } from "@reduxjs/toolkit";
// import userReduser from "./slices/userSlice";
// import courseReduser from "./slices/courseSlise";
import { productsApi } from "./productsApi/productsApi";
// import { UserCoursesApi } from "./userCoursApi";
// import { workoutsApi } from "./workoutsApi";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    // [UserCoursesApi.reducerPath]: UserCoursesApi.reducer,
    // [workoutsApi.reducerPath]: workoutsApi.reducer,
    // user: userReduser,
    // course: courseReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        productsApi.middleware,
    //   UserCoursesApi.middleware,
    //   workoutsApi.middleware
    ),
});