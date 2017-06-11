const authConfig = ()=> (
  {
    headers: {
      Authorization: `Bearer ${ window.localStorage.getItem('token')}`
    } 
  }
);

export { authConfig };
