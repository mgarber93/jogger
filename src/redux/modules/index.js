import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import jogs from './jogs';
import auth from './auth';
import { NEW_JOG } from '../modules/jogs';

export default combineReducers({
  jogs,
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
