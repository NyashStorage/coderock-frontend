import { createApi } from '@reduxjs/toolkit/query/react';
import { configureBackendBaseQuery } from '../helpers/api.helpers';
import type { UserResponse } from './users.dto';
import { unauthorizedMiddleware } from '../middlewares/unauthorized.middleware';
import { refreshTokenMiddleware } from '../middlewares/refresh-token.middleware';

export const usersApi = createApi({
  // Просто название, как и у слайса.
  reducerPath: 'users/api',
  // Настраиваем базовый запрос, подробнее в самой функции.
  baseQuery: configureBackendBaseQuery('users', [
    // Эти запросы уже требуют авторизации, следовательно,
    // токен может обновиться и его придётся сохранять ( refreshTokenMiddleware ),
    // либо оказаться слишком старым/некорректным и его придётся обнулить ( unauthorizedMiddleware ),
    // соответственно, подключаем эти обработчики.
    refreshTokenMiddleware,
    unauthorizedMiddleware,
  ]),
  // Здесь мы описываем запросы к API.
  endpoints: (build) => ({
    // me - название функции, которую мы будем использовать для запроса.
    // UserResponse - ответ, который придёт от API.
    // void в данном случае означает, что мы ничего не передаём,
    // ибо query хочет получить именно два типа.
    me: build.query<UserResponse, void>({
      query: () => 'me',
    }),
  }),
});

// Экспортируем хуки, которые будем использовать для получения функций запросов ( me ).
export const { useLazyMeQuery } = usersApi;
