import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import app from './app';
import auth from './auth';
import { NEW_JOG } from '../modules/app';

export default combineReducers({
  app,
  auth,
  form: formReducer.plugin({
    NewJog: (state, action) => {
      switch (action.type) {
        case NEW_JOG:
          return undefined;
        default:
          return state;
      }
    }
  })
});
