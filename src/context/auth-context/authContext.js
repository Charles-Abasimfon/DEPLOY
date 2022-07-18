import React, {useReducer, createContext} from 'react';
import AuthReducer from './authReducer';
import {UserData} from '../../demo-data/userData';

const INITIAL_STATE = {
  user: UserData,
  isFetching: false,
  error: false,
  errorMsg: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        errorMsg: state.errorMsg,
        dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
