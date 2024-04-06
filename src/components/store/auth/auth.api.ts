import { createApi } from '@reduxjs/toolkit/query/react';
import type { AuthRequest, TokenResponse } from './auth.dto';
import { configureBackendBaseQuery } from '../helpers/api.helpers';

export const authApi = createApi({
  // Просто название, как и у слайса.
  reducerPath: 'auth/api',
  // Настраиваем базовый запрос, подробнее в самой функции.
  baseQuery: configureBackendBaseQuery('auth'),
  // Здесь мы описываем запросы к API.
  endpoints: (build) => ({
    // register - название функции, которую мы будем использовать для запроса.
    // TokenResponse - ответ, который придёт от API.
    // AuthRequest - данные, которые мы отправим.
    register: build.query<TokenResponse, AuthRequest>({
      // credentials - данные для отправки, которые мы получим при
      // вызове функции register.
      query: (credentials: AuthRequest) => ({
        // Последний кусочек запроса, куда именно мы отправляем данные.
        // Вместе получится: https://laptop.nyashmyash99.ru/api/v1/auth/register
        url: 'register',
        // Тип HTTP запроса
        method: 'POST',
        // Собственно тело запроса, данные, которые мы отправляем.
        body: credentials,
      }),
    }),
    login: build.query<TokenResponse, AuthRequest>({
      query: (credentials: AuthRequest) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: build.query({
      query: () => ({
        url: '',
        method: 'DELETE',
      }),
    }),
  }),
});

// Экспортируем хуки, которые будем использовать для получения функций запросов ( register, login, logout ).
export const { useLazyRegisterQuery, useLazyLoginQuery, useLazyLogoutQuery } =
  authApi;
