import type { ApiMiddleware } from '../helpers/api.helpers';
import { authActions } from '../auth/auth.slice';

export const unauthorizedMiddleware: ApiMiddleware = async (result) => {
  // Если API запрос не получил ответ Unauthorized - прекращаем обработку.
  if (result.error?.status !== 401) return;

  // Удаляем токен из хранилища, ибо обновить его вероятно не получилось, раз ошибка Unauthorized.
  const { store } = await import('../store');
  store.dispatch(authActions.logoutSuccess());
};
