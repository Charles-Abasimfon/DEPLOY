export const loginStart = () => ({
  type: 'LOGIN_INITIATED',
});

export const loginSuccess = user => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const loginFailure = errorMsg => ({
  type: 'LOGIN_FAILURE',
  payload: errorMsg,
});

export const loginReset = () => {
  return {
    type: 'RESET',
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
