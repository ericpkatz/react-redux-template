import axios from 'axios';

const authConfig = ()=> (
  {
    headers: {
      Authorization: `Bearer ${ window.localStorage.getItem('token')}`
    } 
  }
);

const authorizedRequest = ({ method = 'get' , payload, url }) => {
  const axiosMethod = axios[method];
  if(payload){
    return axiosMethod(url, payload, authConfig());
  }
  return axiosMethod(url, authConfig());
};

export { authConfig, authorizedRequest };
