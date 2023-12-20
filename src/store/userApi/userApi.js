import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090/",
  }),
  endpoints: (builder) => ({
    // getUser: builder.mutation({
    //   query: (body) => ({
    //     url: "/user",
    //     method: `GET`,
    //     headers: {
    //       Authorization: `Bearer ${body}`,
    //     },
    //   }),
    // }),

    getAllUsers: builder.query({
      query: (body) => ({
        url: "/user/all",
        headers: {
          "content-type": "application/json",
        },
        method: "GET",
      }),
    }),

    changeUser: builder.mutation({
      query: (body) => ({
        headers: {
          "content-type": "application/json",
        },
        url: "user",
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    }),

    updatePassword: builder.query({
      query: (body) => ({
        url: "/user/password",
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(body),
      }),
    }),

    installAvatar: builder.query({
      query: (body) => ({
        url: "/user/avatar",
        headers: {
          "content-type": "multipart/form-data",
        },
        method: "PUT",
        body: JSON.stringify(body),
      }),
    }),
  }),
});

export const {
  // useGetUserMutation,
  useGetAllUsersQuery,
  useChangeUserMutation,
  useUpdatePasswordQuery,
  useInstallAvatarQuery,
} = userApi;
