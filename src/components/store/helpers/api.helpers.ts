import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

const url = 'https://laptop.nyashmyash99.ru/api/v1';
// const url = 'http://localhost:3000/api/v1';

// Это просто скопированный из библиотеки тип.
export type ApiMiddleware = (result: {
  error?: FetchBaseQueryError;
  data?: unknown;
  meta?: FetchBaseQueryMeta;
}) => void | Promise<void>;

export const configureBackendBaseQuery = (
  endpoint: string,
  middlewares: ApiMiddleware[] = [],
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    // Настраиваем так, что все запросы будут идти по одному адресу,
    // чтобы не прописывать его в каждом endpoints из API.
    baseUrl: `${url}/${endpoint}`,
    // Говорим, что хотим отправить данные авторизации вместе с запросом.
    credentials: 'include',
    // Формируем заголовки, а именно - авторизационные.
    prepareHeaders: (headers, { getState }) => {
      // Получаем токен из нашего auth.slice.
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  });

  // Немного сложная логика, грубо говоря, здесь мы формируем fetchBaseQuery, который увидит Redux.
  // Он вызовет его при вызове какого-либо API запроса и попадёт в функцию внутри, где мы:
  return async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: any,
  ) => {
    // Отправляем запрос и получаем ответ от API.
    const result = await baseQuery(args, api, extraOptions);

    // Обрабатываем ответ от API при помощи переданных middleware.
    for (const middleware of middlewares) await middleware(result);

    // Отдаём результат как результат выполнения API запроса ( например "login()" от "const [login] = useLazyLoginQuery();" ).
    return result;
  };
};
