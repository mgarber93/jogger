import axios from 'axios';
import { NEW_JOG, REMOVE_JOG_SUCCESS, UPDATE_JOG_SUCCESS } from './app';
// Types
const REGISTER_FAILURE = 'jogger/auth/REGISTER/FAILURE';
const REGISTER_SUCCESS = 'jogger/auth/REGISTER/SUCCESS';

const LOGIN_FAILURE = 'jogger/auth/LOGIN/FAILURE';
const LOGIN_SUCCESS = 'jogger/auth/LOGIN/SUCCESS';

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
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.data
      };
    case REGISTER_FAILURE:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data
      };
    default:
      return { ...state };
  }
};

// Action creators
export function register(name) {
  return (dispatch, getState) => {
    // dispatch({type: REGISTER});
    const { form } = getState();
    return axios.post('/auth/local/register', form[name].values).then(
      data => dispatch(registerSuccess(data)),
      error => dispatch(registerError(error)),
    );
  };
}

export function login(name) {
  return (dispatch, getState) => {
    // dispatch({type: LOGIN});
    const { form } = getState();
    return axios.post('/auth/local/login', form[name].values).then(
      data => dispatch(loginSuccess(data)),
      error => dispatch(loginError(error))
    );
  };
}

export function loginSuccess({ data }) {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
}

export function registerSuccess({ data }) {
  return {
    type: REGISTER_SUCCESS,
    data,
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

