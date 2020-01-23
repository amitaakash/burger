import * as actionTypes from './actionTypes';
import Axios from 'axios';

const authenticationSuccess = authData => {
  return {
    type: actionTypes.AUTHENICATION_SUCCESSS,
    payload: {
      token: authData.idToken,
      userId: authData.localId,
      email: authData.email
    }
  };
};

const authenticationFail = error => {
  return {
    type: actionTypes.AUTHENICATION_FAIL,
    payload: {
      error
    }
  };
};

const authenticationLoading = () => {
  return {
    type: actionTypes.AUTHENICATION_LOADING
  };
};

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiresOn');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  return {
    type: actionTypes.AUTHENICATION_LOGOUT
  };
};

export const authenticationTimeOut = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, expiresIn);
  };
};

export const authenticationProcess = (email, password, isSignup) => {
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDvmYJNcElngdfOQ-THr9HaJqqvPzJKg8';
  if (isSignup)
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDvmYJNcElngdfOQ-THr9HaJqqvPzJKg8';

  return async dispatch => {
    dispatch(authenticationLoading());
    try {
      const authData = {
        email,
        password,
        returnSecureToken: true
      };
      const authentication = await Axios.post(url, authData);

      //console.log(authentication);
      localStorage.setItem('token', authentication.data.idToken);
      const expirationTime = new Date(
        new Date().getTime() + authentication.data.expiresIn * 1000
      );
      localStorage.setItem('expiresOn', expirationTime);
      localStorage.setItem('userId', authentication.data.localId);
      localStorage.setItem('email', authentication.data.email);
      dispatch(authenticationSuccess(authentication.data));
      dispatch(authenticationTimeOut(authentication.data.expiresIn * 1000));
    } catch (error) {
      //console.log(error.response.data);
      dispatch(authenticationFail(error.response.data.error));
    }
  };
};

export const checkAuthenticationFromLocal = () => {
  return dispatch => {
    const idToken = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const localId = localStorage.getItem('userId');
    //console.log(idToken, email, userId);
    if (!idToken) {
      dispatch(logOut());
    } else {
      const expirationTime = new Date(localStorage.getItem('expiresOn'));
      if (expirationTime > new Date().getTime()) {
        const authData = { idToken, email, localId };
        dispatch(authenticationSuccess(authData));
        dispatch(authenticationTimeOut(expirationTime - new Date().getTime()));
      } else {
        dispatch(logOut());
      }
    }
  };
};
