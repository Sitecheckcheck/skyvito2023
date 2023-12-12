import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const oneProductsApi = createApi({
  reducerPath: "oneProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "http://localhost:8090/",
  }),
  endpoints: (builder) => ({
    getOneProduct: builder.query({
      query: (id) => `/ads/${id}`,
    }),
  }),
});

export const {useGetOneProductQuery} = oneProductsApi;