import React, { Component} from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './redux/store';
import Routes from './Routes';


const App = (
  <Provider store = {store }>
    <Routes />
  </Provider>
);


render(App, root);
