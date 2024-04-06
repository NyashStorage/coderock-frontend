import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { usersSlice } from './users/users.slice';
import { authApi } from './auth/auth.api';
import { usersApi } from './users/users.api';

export const store = configureStore({
  // Указываем функции изменения данных и к какой группе они принадлежат.
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
  },
  // Для каждого API необходимо указать middleware.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, usersApi.middleware),
});

// Этот тип содержит полную информацию о store, то есть,
// в нашем случае он будет описывать для TypeScript, что в нём есть
// "auth" с { token: string } ( от auth.slice ) и
// "users" с { id: number } ( от users.slice ).
export type RootState = ReturnType<typeof store.getState>;
