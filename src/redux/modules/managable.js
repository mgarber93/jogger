// Handle the state for managing users and user rights
import axios from "axios";


//

export default (state = {}, action = {}) => {
  switch(action.type) {
    default: return {...state};
  }
}

//
export const fetchUsers = () => {
  return (dispatch, getState) => {
    axios.get('/api/accounts/')
      .then(console.log);
  };
};