import axios from 'axios';
import { authConfig, authorizedRequest } from '../../common/auth';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const loginUserSuccess = (user)=> {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};


const logoutSuccess = ()=> ({
  type: LOGOUT_SUCCESS
});


const exchangeTokenForUser = ()=> {
  return (dispatch)=> {
    if(!localStorage.getItem('token'))
      return Promise.reject('no local storage token');
    return authorizedRequest({ url: '/api/auth/' })
      .then(response => response.data)
      .then(user => {
        dispatch(loginUserSuccess(user));
        return user;
      });
  };
};

const updateUser = (user)=> {
  return (dispatch)=> {
    return authorizedRequest({ method: 'put', url: `/api/auth/`, payload: user })
      .then(() => dispatch(loginUserSuccess(user)));
  };
};


const attemptLogin = (dispatch)=> {
  return (dispatch)=> {
    return exchangeTokenForUser(localStorage.getItem('token'), dispatch);
  };
};

const logout = ()=> {
  return (dispatch)=> {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    return Promise.resolve();
  }
}

const login = (credentials)=> {
  return (dispatch)=> {
    return axios.post('/api/auth', credentials)
      .then(response => response.data)
      .then(data => localStorage.setItem('token', data.token))
      .then( ()=> dispatch(exchangeTokenForUser()))
      .catch((er)=> {
        localStorage.removeItem('token');
        throw er;
      });
  };
};


export {
  login,
  exchangeTokenForUser,
  logout,
  updateUser
};


const authReducer = (state={}, action)=> {
  switch(action.type){
    case LOGIN_SUCCESS:
      state = Object.assign({}, state, action.user); 
      break;
    case LOGOUT_SUCCESS:
      state = {}; 
      break;
  }
  return state;
};


export default authReducer;
