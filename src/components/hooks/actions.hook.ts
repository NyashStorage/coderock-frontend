import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { authActions } from '../store/auth/auth.slice';
import { userActions } from '../store/users/users.slice';

export const APPLICATION_ACTIONS = {
  ...authActions,
  ...userActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(APPLICATION_ACTIONS, dispatch);
};
