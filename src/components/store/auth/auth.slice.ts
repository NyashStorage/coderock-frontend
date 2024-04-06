import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

// Описываем, какие данные будут лежать в authSlice.
interface AuthState {
  token: string | null;
}

// Задаём стандартные значения для данных в authSlice.
const initialState: AuthState = {
  token: null,
};

export const authSlice = createSlice({
  // Уникальное название слайса.
  name: 'auth',
  initialState,
  // Функции по изменению хранимых данных.
  reducers: {
    // state - текущее состояние слайса, action.payload - то, что передали в функцию.
    // В нашем случае мы передаём просто токен, поэтому в качесте типа ( PayloadAction<Тип> )
    // просто строка, но там может быть и объект например, если нужно указать несколько значений.
    loginSuccess: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    // А в этой функции мы вообще ничего не принимаем, просто вызываем её, поэтому нет action.
    logoutSuccess: (state) => {
      state.token = null;
    },
  },
});

// actions это как раз наши функции из reducers, которые мы будем использовать для установки значений.
// Из мы обернём в "actions.hook.ts", чтобы использовать без лишнего кода.
export const authActions = authSlice.actions;
// Специальный хук, чтобы при каждом использовании значения из слайса не приходилось
// писать что-то из серии: "const token = useSelector((state: RootState) => state.auth.token);".
export const useAuthState = (): AuthState =>
  useSelector((state: RootState) => state.auth);
