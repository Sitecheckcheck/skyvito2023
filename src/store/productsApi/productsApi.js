import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/ads",
      providesTags: [{ type: "ADS", id: "LIST" }],
    }),


    getMeProducts: builder.query({
      query: (body) => ({
        url: "/ads/me",
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${body}`,
        },
      }),
      providesTags: [{ type: "ADS", id: "LIST" }],
    }),


    addProductText: builder.mutation({
      query: (body) => ({
        url: "/adstext",
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${body.access_token}`,
        },
        body: JSON.stringify({
          title: body.ads.title,
          description: body.ads.description,
          price: body.ads.price,
        }),
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "ADS", id: "LIST" }] : [],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetMeProductsQuery, useAddProductTextMutation } = productsApi;
