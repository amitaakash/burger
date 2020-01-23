import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  email: null,
  loading: false,
  error: null
};

//const authenticationLoading = (state, action) =>{}
function authSuccess(state, action) {
  return updateObject(state, {
    token: action.payload.token,
    userId: action.payload.userId,
    email: action.payload.email,
    loading: false,
    error: null
  });
}
function authFail(state, action) {
  return updateObject(state, {
    loading: false,
    error: action.payload.error
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTHENICATION_LOADING:
      return updateObject(state, { loading: true });
    case actionType.AUTHENICATION_SUCCESSS:
      return authSuccess(state, action);
    case actionType.AUTHENICATION_FAIL:
      return authFail(state, action);
    case actionType.AUTHENICATION_LOGOUT:
      return updateObject(state, { token: null, userId: null, email: null });
    default:
      return state;
  }
};

export default reducer;
