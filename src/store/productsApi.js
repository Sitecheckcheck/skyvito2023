import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["ADS", "COMMENTS"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/ads",
      providesTags: [{ type: "ADS", id: "LIST" }],
    }),

    getOneProduct: builder.query({
      query: (id) => `/ads/${id}`,
      providesTags: (result) =>
      result ? [{ type: "ADS", id: "LIST" }] : [],
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
          Authorization: `Bearer ${body.access}`,
        },
        body: JSON.stringify({
          title: body.title,
          description: body.description,
          price: body.price,
        }),
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "ADS", id: "LIST" }] : [{ type: "ADS", id: "LIST" }],
    }),

    deleteProduct: builder.mutation({
      query: (id) => {
        const access_token = localStorage.getItem("access_token");
        return {
          url: `/ads/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "ADS", id: "LIST" }] : [{ type: "ADS", id: "LIST" }],
    }),

    addProductImage: builder.mutation({
      query: (body) => {
        const access_token = localStorage.getItem("access_token");
        const formData = new FormData();
        console.log(body.file)
        formData.append("file", body.file);

        return {
          url: `/ads/${body.id}/image`,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": undefined,
          },
        };
      },
      invalidatesTags: (result) =>
      result ? [{ type: "ADS", id: "LIST" }] : [{ type: "ADS", id: "LIST" }],
    }),

    deleteProductImage: builder.mutation({
      query: (body) => {
        const access_token = localStorage.getItem("access_token");

        return {
          url: `/ads/${body.id}/image/?${new URLSearchParams({
            file_url: body.url,
          })}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: (result) =>
      result ? [{ type: "ADS", id: "LIST" }] : [{ type: "ADS", id: "LIST" }],
    }),

    getAdsComments: builder.query({
      query: (body) => {
        return {
          url: `/ads/${body.id}/comments`,
          method: "GET",
        };
      },
      providesTags: [{ type: "COMMENTS", id: "LIST" }],
    }),

    updateProduct: builder.mutation({
      query: (body) => {
        const access_token = localStorage.getItem("access_token");

        return {
          url: `/ads/${body.id}`,
          method: "PATCH",
          body: JSON.stringify({
            title: body.title,
            description: body.description,
            price: body.price,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "ADS", id: "LIST" }] : [],
    }),

    createComment: builder.mutation({
      query: (body) => {
        const access_token = localStorage.getItem("access_token");

        return {
          url: `/ads/${body.id}/comments`,
          method: "POST",
          body: JSON.stringify({ text: body.textComment, }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "COMMENTS", id: "LIST" }] : [],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetMeProductsQuery,
  useAddProductTextMutation,
  useGetOneProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddProductImageMutation,
  useGetOneProductForModalQuery,
  useDeleteProductImageMutation,
  useGetAdsCommentsQuery,
  useCreateCommentMutation,
} = productsApi;
