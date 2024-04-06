import { authActions, authSlice } from '../auth/auth.slice';
import type { ApiMiddleware } from '../helpers/api.helpers';

export const refreshTokenMiddleware: ApiMiddleware = async (result) => {
  // Проверяем заголовки ответа от API, там может быть нужный нам.
  const headers = result.meta?.response?.headers;
  // Если его нет - прекращаем обработку.
  if (!headers?.has('X-Access-Token')) return;

  // Получаем новый токен из заголовка.
  const accessToken = headers.get('X-Access-Token') || '';
  // Если получили тот же токен, который у нас установлен - прекращаем обработку.
  const { store } = await import('../store');
  if (store.getState()[authSlice.name].token === accessToken) return;

  // Сохраняем новый токен в хранилище.
  store.dispatch(authActions.loginSuccess(accessToken));
};
