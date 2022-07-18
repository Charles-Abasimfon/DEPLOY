import {UserData} from '../../demo-data/userData';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_INITIATED':
      return {
        user: UserData,
        isFetching: true,
        error: false,
        errorMsg: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        errorMsg: null,
      };
    case 'LOGIN_FAILURE':
      return {
        user: UserData,
        isFetching: false,
        error: true,
        errorMsg: action.payload,
      };
    case 'RESET':
      return {
        user: null,
        isFetching: false,
        error: false,
        errorMsg: null,
      };
    case 'LOGOUT':
      return {
        user: UserData,
        isFetching: false,
        error: false,
        errorMsg: null,
      };
    default:
      return {...state};
  }
};

export default AuthReducer;
