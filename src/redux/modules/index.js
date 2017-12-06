import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import jogs from './jogs';
import auth from './auth';
import managable from './managable';
import { NEW_JOG } from '../modules/jogs';

export default combineReducers({
  jogs,
  auth,
  managable,
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
