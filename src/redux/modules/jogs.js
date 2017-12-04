import axios from 'axios';

import {LOGIN_SUCCESS, REGISTER_SUCCESS} from './auth';

// types
export const NEW_JOG = 'jogger/app/NEW_JOG';
export const UPDATE_JOG_SUCCESS = 'jogger/app/UPDATE_JOG_SUCCESS';
export const REMOVE_JOG_SUCCESS = 'jogger/app/REMOVE_JOG_SUCCESS';
const START_EDITING = 'jogger/app/START_EDITING';
const TOGGLE_EDITING = 'jogger/app/TOGGLE_EDITING';
const STOP_EDITING = 'jogger/app/STOP_EDITING';
const CHANGE_DISPLAY_ORDER = 'jogger/app/CHANGE_DISPLAY_ORDER';


const initState = {
  editing: {},
  displayOrder: 'date',
};

// reducer
export default (state = initState, action) => {
  const editing = { ...state.editing };
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        jogs: action.jogs,
      }
    case START_EDITING:
      editing[action.data] = true;
      return {
        ...state,
        editing,
      };
    case UPDATE_JOG_SUCCESS:
      editing[action.payload._id] = false;
      return {
        ...state,
        editing,
      };
    case TOGGLE_EDITING:
      editing[action.data] = !editing[action.data];
      return {
        ...state,
        editing,
      };
    case CHANGE_DISPLAY_ORDER:
      return {
        ...state,
        displayOrder: action.term,
      };
    case STOP_EDITING:
      editing[action.data] = false;
      return {
        ...state,
        editing,
      };
    default:
      return { ...state };
  }
};

// action dispatchers
export function newJog() {
  return (dispatch, getState) => {
    const { auth, form } = getState();
    return axios.post(`/api/accounts/${auth.user._id}/jogs/`, form.NewJog.values)
      .then(data => dispatch(newJogSuccess(data)));
  };
}

export function updateJog(newJog) {
  return (dispatch, getState) => {
    const { auth } = getState();
    return axios.patch(`/api/accounts/${auth.user._id}/jogs/${newJog._id}`, newJog)
      .then(data => dispatch(updateJogSuccess(data)));
  };
}

export function removeJog(jog) {
  return (dispatch, getState) => {
    const { auth } = getState();
    return axios.delete(`/api/accounts/${auth.user._id}/jogs/${jog._id}`)
      .then(data => dispatch(removeJogSuccess(jog._id)));
  };
}

export function newJogSuccess({ data }) {
  return {
    type: NEW_JOG,
    payload: data,
  };
}

export function startEditing(jog) {
  return {
    type: START_EDITING,
    data: jog._id,
    jog
  };
}

export function toggleEditing(jog) {
  return {
    type: TOGGLE_EDITING,
    data: jog._id,
    jog
  };
}

export function stopEditing({ _id }) {
  return {
    type: STOP_EDITING,
    data: _id,
  };
}

export function changeDisplayOrder(term) {
  return {
    type: CHANGE_DISPLAY_ORDER,
    term,
  };
}

export function removeJogSuccess(id) {
  return {
    type: REMOVE_JOG_SUCCESS,
    id,
  };
}

export function updateJogSuccess({ data }) {
  return {
    type: UPDATE_JOG_SUCCESS,
    payload: data
  };
}
