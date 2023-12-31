import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createDislikeTrackAction,
  createLikeTrackAction,
} from "../store/slice/audioplayer/actions";
import { setAuth } from "../store/auth";

const TRACKS_TAG = "Tracks";

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://skypro-music-api.skyeng.tech",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access;

      console.debug("Использую токен из стора", { token });

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);
  console.debug("Результат первого запроса", { result });

  if (result?.error?.status !== 401) {
    return result;
  }

  const forceLogout = () => {
    console.debug("Принудительная авторизация!");
    api.dispatch(setAuth(null));
    window.location.navigate("/login");
  };

  const { auth } = api.getState();
  console.debug("Данные пользователя в сторе", { auth });

  if (!auth.refresh) {
    return forceLogout();
  }

  const refreshResult = await baseQuery(
    {
      url: "/user/token/refresh/",
      method: "POST",
      body: {
        refresh: auth.refresh,
      },
    },
    api,
    extraOptions
  );

  console.debug("Результат запроса на обновление токена", { refreshResult });

  if (!refreshResult.data.access) {
    return forceLogout();
  }

  api.dispatch(setAuth({ ...auth, access: refreshResult.data.access }));

  const retryResult = await baseQuery(args, api, extraOptions);

  if (retryResult?.error?.status === 401) {
    return forceLogout();
  }

  console.debug("Повторный запрос завершился успешно");

  return retryResult;
};

export const playlistApi = createApi({
  reducerPath: "playlistApi",

  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    getMainPlaylist: builder.query({
      query: () => "/catalog/track/all/",
      providesTags: () => [TRACKS_TAG],
    }),
    getMyPlaylist: builder.query({
      query: () => ({
        url: "/catalog/track/favorite/all/",
      }),
      transformResponse: (response, meta, arg) => {
        return response.map((item) => ({
          ...item,
          stared_user: [
            {
              id: arg.auth.id,
              username: arg.auth.username,
              first_name: arg.auth.first_name,
              last_name: arg.auth.last_name,
              email: arg.auth.email,
            },
          ],
        }));
      },
      providesTags: () => [TRACKS_TAG],
    }),
    getCategory: builder.query({
      query: ({ id }) => ({
        url: `/catalog/selection/${id}/`,
      }),
      providesTags: () => [TRACKS_TAG],
    }),
    likeTrack: builder.mutation({
      query: ({ id }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: "POST",
      }),
      invalidatesTags: [TRACKS_TAG],
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            createLikeTrackAction({ id: args.id, auth: getState().auth })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    dislikeTrack: builder.mutation({
      query: ({ id }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: "DELETE",
      }),
      invalidatesTags: [TRACKS_TAG],
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            createDislikeTrackAction({ id: args.id, auth: getState().auth })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetMainPlaylistQuery,
  useGetMyPlaylistQuery,
  useLikeTrackMutation,
  useDislikeTrackMutation,
  useGetCategoryQuery,
} = playlistApi;
