import React, { Component} from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './redux/store';
import Routes from './Routes';

//for oauth
if(document.location.search.indexOf('token=') === 1){
  const token = document.location.search.slice(1).split('&')[0].split('token=')[1];
  console.log(token);
  window.localStorage.setItem('token', token);
  window.location = '/';
}


const App = (
  <Provider store = {store }>
    <Routes />
  </Provider>
);


render(App, root);
