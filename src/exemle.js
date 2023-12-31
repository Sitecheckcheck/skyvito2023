import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  createDislikeTrackAction,
  createLikeTrackAction,
} from '../store/slice/audioplayer/actions'
import { setAuth } from '../store/auth'

const TRACKS_TAG = 'Tracks'

/**
 * baseQueryWithReauth – это наша кастомная обертка над fetchBaseQuery, которая умеет обновлять access токен если запрос вернул 401 код.
 * Эта функция подразумевает, что access и refresh токены хранятся в redux сторе auth.
 *
 * args - это параметры конкретного запроса, там лежит url, method и другие параметры запроса
 * api и extraOptions - это доп. параметры с хелперами
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  /**
   * fetchBaseQuery - это обертка от rtk-query над fetch функцией
   * https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
   *
   * fetchBaseQuery возвращает функцию, которую можно воспринимать как аналог fetch или axios функции.
   * то есть вызов "await baseQuery(...)" можно воспринимать как вызов "await fetch(...)"
   */
  const baseQuery = fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech',
    // prepareHeaders - это часть api fetchBaseQuery, которая позволяет сформировать общие заголовки для всех запросов
    prepareHeaders: (headers, { getState }) => {
      // Мы достаем из стора access токен и прикрепляем его ко всем запросам, чтобы не пробрасывать токен в каждый запрос вручную
      // Мы находимся внутри callback функции, которая вызывается непосредственно перед каждым запросом,
      // таким образом все запросы всегда используют актуальный acces токен из redux стора
      const token = getState().auth.access

      // Чтобы выключить отображение debug логов в консоли браузера, включите уровень Verbose\Debug в консоли разработчика
      console.debug('Использую токен из стора', { token })

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  })

  // Делаем запрос
  const result = await baseQuery(args, api, extraOptions)
  console.debug('Результат первого запроса', { result })

  // Если запрос выполнился не с 401 кодом, то все хорошо, просто отдаем результат запроса наружу
  if (result?.error?.status !== 401) {
    return result
  }

  // Ниже обрабатываем 401 код

  // Функция которая отчищает данные о юзере в сторе и отправляет на страницу логина
  const forceLogout = () => {
    console.debug('Принудительная авторизация!')
    api.dispatch(setAuth(null))
    window.location.navigate('/login')
  }

  // Функция getState возвращает состояние redux стейта целиком, ее нам предоставляет rtk query, она прилетает параметром запроса в функцию
  const { auth } = api.getState()
  console.debug('Данные пользователя в сторе', { auth })
  // Если в сторе нет refresh токена, то помочь пользователю мы уже ничем не сможем помочь, разлогиниваем его и отправляем авторизоваться руками
  if (!auth.refresh) {
    return forceLogout()
  }

  // Делаем запрос за новым access токеном в API обновления токена
  const refreshResult = await baseQuery(
    {
      url: '/user/token/refresh/',
      method: 'POST',
      body: {
        refresh: auth.refresh,
      },
    },
    api,
    extraOptions,
  )

  console.debug('Результат запроса на обновление токена', { refreshResult })

  // Если api обновления токена не вернуло новый access токен, то ничего сделать мы не можем, разлогиниваем юзера
  // Апи может не вернуть новый access токен по разным причинам, например у нас неверный refresh токен или refresh токен протух (обычно refresh токены не протухаю, но бывает и такое)
  if (!refreshResult.data.access) {
    return forceLogout()
  }

  // Мы наконец получили новый access токен, сохраняем его в стор, чтобы последующие запросы могли его использовать внутри prepareHeaders
  api.dispatch(setAuth({ ...auth, access: refreshResult.data.access }))

  // Делаем повторный запрос с теми же параметрами что и исходный,
  // но помним, что повторный запрос произойдет уже с новым токеном,
  // потому что для него вызовется callback prepareHeaders, который получит актуальный access токен из стора,
  // который мы положили в стор строчкой выше
  const retryResult = await baseQuery(args, api, extraOptions)

  // Если повторный запрос выполнился с 401 кодом, то что-то совсем пошло не так, отправляем на принудительную ручную авторизацию
  if (retryResult?.error?.status === 401) {
    return forceLogout()
  }

  console.debug('Повторный запрос завершился успешно')

  return retryResult
}

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  // Используем кастомную baseQueryWithReauth вместо стандартной fetchBaseQuery
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'https://skypro-music-api.skyeng.tech',
  // }),
  endpoints: (builder) => ({
    getMainPlaylist: builder.query({
      query: () => '/catalog/track/all/',
      providesTags: () => [TRACKS_TAG],
    }),
    getMyPlaylist: builder.query({
      query: () => ({
        url: '/catalog/track/favorite/all/',
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
        }))
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
        method: 'POST',
      }),
      invalidatesTags: [TRACKS_TAG],
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            createLikeTrackAction({ id: args.id, auth: getState().auth }),
          )
        } catch (error) {
          console.error(error)
        }
      },
    }),
    dislikeTrack: builder.mutation({
      query: ({ id }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: 'DELETE',
      }),
      invalidatesTags: [TRACKS_TAG],
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            createDislikeTrackAction({ id: args.id, auth: getState().auth }),
          )
        } catch (error) {
          console.error(error)
        }
      },
    }),
  }),
})

export const {
  useGetMainPlaylistQuery,
  useGetMyPlaylistQuery,
  useLikeTrackMutation,
  useDislikeTrackMutation,
  useGetCategoryQuery,
} = playlistApi
