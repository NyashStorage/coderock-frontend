import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { UserResponse } from './users.dto';

// Описываем, какие данные будут лежать в usersSlice.
interface UserState {
  id: number | null;
}

// Задаём стандартные значения для данных в usersSlice.
const initialState: UserState = {
  id: null,
};

export const usersSlice = createSlice({
  // Уникальное название слайса.
  name: 'users',
  initialState,
  // Функции по изменению хранимых данных.
  reducers: {
    // state - текущее состояние слайса, action.payload - то, что передали в функцию.
    // В нашем случае мы передаём целый объект из API, в отличие от простой строки в authSlice.
    storeUser: (state, { payload }: PayloadAction<UserResponse>) => {
      state.id = payload.id;
    },
  },
});

// actions это как раз наши функции из reducers, которые мы будем использовать для установки значений.
// Из мы обернём в "actions.hook.ts", чтобы использовать без лишнего кода.
export const userActions = usersSlice.actions;
// Специальный хук, чтобы при каждом использовании значения из слайса не приходилось
// писать что-то из серии: "const userId = useSelector((state: RootState) => state.users.id);".
export const useUserState = (): UserState =>
  useSelector((state: RootState) => state.users);
