// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8090/",
//   }),
//   endpoints: (builder) => ({
//     addUser: builder.mutation({
//       query: (body) => ({
//         headers: {
//           "Content-type": "application/json",
//         },
//         url: "auth/register",
//         method: "POST",
//         body: JSON.stringify({
//           email: body.email,
//           password: body.password,
//           name: body.name,
//           surname: body.surname,
//           city: body.city,
//         }),
//       }),
//     }),
//     getTokens: builder.mutation({
//       query: (body) => ({
//         url: "/auth/login",
//         headers: {
//           "Content-type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify({
//           email: body.email,
//           password: body.password,
//         }),
//       }),
//     }),
//     updateTokens: builder.mutation({
//       query: (body) => ({
//         url: "/auth/login",
//         method: "PUT",
//         body: 
//         JSON.stringify(
//           {
//           access_token: body.access_token,
//           refresh_token: body.refresh_token,
//         }
//         )
//         ,
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${body.access_token}`,
//         },
//       }),
//     }),
//   }),
// });

// export const {
//   useAddUserMutation,
//   useGetTokensMutation,
//   useUpdateTokensMutation,
// } = authApi;
