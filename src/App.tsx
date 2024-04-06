import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useAuthState } from './components/store/auth/auth.slice';
import { useActions } from './components/hooks/actions.hook';
import {
  useLazyLoginQuery,
  useLazyLogoutQuery,
  useLazyRegisterQuery,
} from './components/store/auth/auth.api';
import { useUserState } from './components/store/users/users.slice';
import { useLazyMeQuery } from './components/store/users/users.api';

export default function App(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Используем самописные хуки для сокращения кода.
  // По сути, это как первый элемент из useState ( например username и password выше ) -
  // значение, которое меняется при помощи функции, перерисывая компоненты, в которых используется.
  const { token } = useAuthState();
  // Переименуем переменную в userId, ибо id не очень понятно.
  const { id: userId } = useUserState();

  // Используем самописный хук для сокращения кода.
  // А это как второй элемент из useState ( например setUsername и setPassword выше ) -
  // меняющее значение состояния функция.
  const { loginSuccess, logoutSuccess, storeUser } = useActions();

  // Функции API от RTKQuery.
  const [register] = useLazyRegisterQuery();
  const [login] = useLazyLoginQuery();
  const [logout] = useLazyLogoutQuery();
  const [me] = useLazyMeQuery();

  // useEffect следит за состоянием приложение и вызывается, когда оно изменяется.
  // Обычно в зависимостях указываются переменные, изменение которых вызовет функцию в useEffect,
  // но нам нужно отправить "/users/me" именно при первой загрузке странице, поэтому мы оставляем
  // массив пустым, что вызовет необходимый нам функционал.
  useEffect(() => {
    onMe();
  }, []);

  // А вот здесь мы уже следим за обновлением token и вызовем получение данных пользователя,
  // когда он изменится и будет иметь значение, то есть, сразу после авторизации.
  useEffect(() => {
    if (!token) return;
    onMe();
  }, [token]);

  async function onMe(): Promise<void> {
    const { isError, data } = await me();
    if (isError || !data) return;

    storeUser(data);
  }

  async function onRegister(): Promise<void> {
    const { isError, error, data } = await register({
      username,
      password,
    });

    if (isError || !data)
      return alert(
        `Произошла ошибка: ${(error as any)?.data?.message || 'неизвестная ошибка.'}`,
      );

    loginSuccess(data.access_token);
  }

  async function onLogin(): Promise<void> {
    const { isError, error, data } = await login({
      username,
      password,
    });

    if (isError || !data)
      return alert(
        `Произошла ошибка: ${(error as any)?.data?.message || 'неизвестная ошибка.'}`,
      );

    loginSuccess(data.access_token);
  }

  async function onLogout(): Promise<void> {
    const { isError, error } = await logout({});

    if (isError)
      return alert(
        `Произошла ошибка: ${(error as any)?.data?.message || 'неизвестная ошибка.'}`,
      );

    logoutSuccess();
  }

  return (
    <Stack direction="column" gap={2}>
      <Stack>
        <TextField
          label="Логин"
          sx={{ width: '30%' }}
          onChange={({ target }) => setUsername(target.value)}
        />

        <TextField
          label="Пароль"
          sx={{ width: '30%' }}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Stack>

      <Stack>
        <Button sx={{ width: '30%' }} onClick={onRegister}>
          Регистрация
        </Button>

        <Button sx={{ width: '30%' }} onClick={onLogin}>
          Авторизация
        </Button>

        <Button sx={{ width: '30%' }} onClick={onLogout}>
          Выход
        </Button>
      </Stack>

      <Stack direction="column" gap={1}>
        <Stack direction="column">
          <Typography variant="h5">Данные формы</Typography>
          <Typography>Логин: {username || 'null'}</Typography>
          <Typography>Пароль: {password || 'null'}</Typography>
        </Stack>

        <Stack direction="column">
          <Typography variant="h5">Данные из auth.slice</Typography>
          <Typography>Токен: {token || 'null'}</Typography>
        </Stack>

        <Stack direction="column">
          <Typography variant="h5">Данные из user.slice</Typography>
          <Typography>ID: {userId || 'null'}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
