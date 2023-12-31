import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeUser } from "./userSlise";

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8090/",

    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("access_token");

      // console.debug("Использую токен из LS ", { token });

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);
  // console.debug("Результат первого запроса", { result });

  if (result?.error?.status !== 401) {
    return result;
  }

  const forceLogout = () => {
    // console.debug("Принудительная авторизация!");
    localStorage.clear();
    api.dispatch(removeUser());
  };

  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  // console.debug("Данные token в LS", { refresh_token });

  if (!refresh_token) {
    return forceLogout();
  }

  const refreshResult = await baseQuery(
    {
      url: "/auth/login/",
      method: "PUT",
      body: JSON.stringify({
        access_token,
        refresh_token,
      }),
      headers: {
        "content-type": "application/json",
      },
    },
    api,
    extraOptions
  );

  if (refreshResult?.error?.status === 401) {
    return forceLogout();
  } else {
    if (!refreshResult.data.access_token) {
      return forceLogout();
    }

    localStorage.setItem("access_token", refreshResult.data.access_token);
    localStorage.setItem("refresh_token", refreshResult.data.refresh_token);
  }

  // console.debug("Результат запроса на обновление токена", { newTokens });

  const retryResult = await baseQuery(args, api, extraOptions);

  if (retryResult?.error?.status === 401) {
    return forceLogout();
  }

  // console.debug("Повторный запрос завершился успешно");

  return retryResult;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["ADS", "COMMENTS", "USER"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: "/user",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
      providesTags: ["USER"],
    }),

    addUser: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
          name: body.name,
          surname: body.surname,
          city: body.city,
        }),
      }),
    }),

    updateUser: builder.mutation({
      query: (body) => {
        return {
          url: "/user",
          method: "PATCH",
          body: JSON.stringify({
            name: body.nameText,
            surname: body.surnameText,
            city: body.cityText,
            phone: body.phoneText,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["USER"],
    }),

    setAvatarUser: builder.mutation({
      query: (body) => {
        const formData = new FormData();
        console.log(body.file);
        formData.append("file", body);

        return {
          url: `/user/avatar`,
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": undefined,
          },
        };
      },
      invalidatesTags: ["USER"],
    }),

    getAllProducts: builder.query({
      query: () => "/ads",
      providesTags: ["ADS"],
    }),

    getOneProduct: builder.query({
      query: (id) => `/ads/${id}`,
      providesTags: ["ADS"],
    }),

    getMeProducts: builder.query({
      query: () => {
        return {
          url: "/ads/me",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
      providesTags: ["ADS"],
    }),

    addProductText: builder.mutation({
      query: (body) => ({
        url: "/adstext",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: body.title,
          description: body.description,
          price: body.price,
        }),
      }),
      invalidatesTags: ["ADS"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/ads/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ADS"],
    }),

    updateProduct: builder.mutation({
      query: (body) => {
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
          },
        };
      },
      invalidatesTags: ["ADS"],
    }),

    addProductImage: builder.mutation({
      query: (body) => {
        const formData = new FormData();
        console.log(body.file);
        formData.append("file", body.file);

        return {
          url: `/ads/${body.id}/image`,
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": undefined,
          },
        };
      },
      invalidatesTags: ["ADS"],
    }),

    deleteProductImage: builder.mutation({
      query: (body) => {
        return {
          url: `/ads/${body.id}/image/?${new URLSearchParams({
            file_url: body.url,
          })}`,
          method: "DELETE",
          headers: {},
        };
      },
      invalidatesTags: ["ADS"],
    }),

    getAdsComments: builder.query({
      query: (body) => {
        return {
          url: `/ads/${body.id}/comments`,
          method: "GET",
        };
      },
      providesTags: ["COMMENTS"],
    }),

    createComment: builder.mutation({
      query: (body) => {
        return {
          url: `/ads/${body.id}/comments`,
          method: "POST",
          body: JSON.stringify({ text: body.textComment }),
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["COMMENTS"],
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useSetAvatarUserMutation,
  useGetAllProductsQuery,
  useLazyGetMeProductsQuery,
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
