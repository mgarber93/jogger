import axios from 'axios';
import cookie from 'js-cookie';
import { NEW_JOG, REMOVE_JOG_SUCCESS, UPDATE_JOG_SUCCESS } from './jogs';

// Types
const REGISTER_FAILURE = 'jogger/auth/REGISTER/FAILURE';
export const REGISTER_SUCCESS = 'jogger/auth/REGISTER/SUCCESS';

const LOGIN_FAILURE = 'jogger/auth/LOGIN/FAILURE';
export const LOGIN_SUCCESS = 'jogger/auth/LOGIN/SUCCESS';

const LOGOUT_FAILURE = 'jogger/auth/LOGOUT/FAILURE';
const LOGOUT_SUCCESS = 'jogger/auth/LOGOUT/SUCCESS';

// Reducer
export default (state = {}, action = {}) => {
  const newUser = { ...state.user };
  switch (action.type) {
    case NEW_JOG:
      newUser.jogs.unshift(action.payload);
      return {
        ...state,
        user: newUser,
      };
    case REMOVE_JOG_SUCCESS:
      newUser.jogs = newUser.jogs.filter(j => j._id !== action.id);
      return {
        ...state,
        user: newUser,
      };
    case UPDATE_JOG_SUCCESS:
      newUser.jogs = newUser.jogs.map(j => {
        if (j._id === action.payload._id) {
          return action.payload;
        }
        return j;
      });
      return {
        ...state,
        user: newUser,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: undefined
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

function setCookie(token) {
  cookie.set('jwt', token);
}

// Action creators
export function register(name) {
  return (dispatch, getState) => {
    const { form } = getState();
    return axios.post('/auth/local/register', form[name].values)
      .then(data => dispatch(registerSuccess(data)))
      .catch(error => dispatch(registerError(error)));
  };
}

export function login(name) {
  return (dispatch, getState) => {
    const { form } = getState();
    return axios.post('/auth/local/login', form[name].values)
      .then(data => dispatch(loginSuccess(data)))
      .catch(error => dispatch(loginError(error)));
  };
}

export function loginSuccess({ data }) {
  const jogs = data.user.jogs;
  data.user.jogs = undefined;
  delete data.user.jogs;

  setCookie(data.token);

  return {
    type: REGISTER_SUCCESS,
    user: data.user,
    jogs,
  };
}

export function registerSuccess({ data }) {
  const jogs = data.user.jogs;
  data.user.jogs = undefined;
  delete data.user.jogs;

  setCookie(data.token);

  return {
    type: REGISTER_SUCCESS,
    user: data.user,
    jogs,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_FAILURE,
  };
}

export function registerError(data) {
  return {
    type: REGISTER_FAILURE,
  };
}

export function logout() {
  return (dispatch, getState) => axios.get('/auth/local/logout').then(
    data => dispatch(logoutSuccess(data)),
    error => dispatch(logoutError(error))
  );
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}


export function logoutError() {
  return {
    type: LOGOUT_FAILURE,
  };
}

