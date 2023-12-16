import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090/",
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (body) => ({
        headers: {
          "content-type": "application/json",
        },
        url: "auth/register",
        method: "POST",
        body: JSON.stringify({
            email: body.email,
            password: body.password,
            name: body.name,
            surname: body.surname,
            city: body.city,
        }),
      }),
    }),
    getTokens: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: body.email,
          password: body.password,
      }),
      }),
    }),
    updateTokens: builder.query({
      query: (body) => ({
        url: "/auth/login",
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(body),
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetTokensMutation,
  useUpdateTokensQuery,
} = authApi;
