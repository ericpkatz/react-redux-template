import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';


import Layout from './components/Layout';
import Home from './components/Home';
import ProductsPage from './components/Product/ProductsPage'; 
import LoginPage from './components/LoginPage'; 
import GithubPage from './components/GithubPage'; 
import ProductEdit from './components/Product/ProductEdit';
import ProductInsert from './components/Product/ProductInsert';

import { exchangeTokenForUser } from './redux/reducers/authReducer';
import { loadProducts } from './redux/reducers/productsReducer';
import { loadRepos } from './redux/reducers/githubReducer';



const Routes = ({ bootstrap, getRepos })=> {
  return (
    <Router history={ hashHistory } onEnter={ bootstrap() }>
      <Route path='/' component={ Layout }>
        <IndexRoute component={ Home } />
        <Route path='products' component={ProductsPage} />
        <Route path='products/insert' component={ ProductInsert } />
        <Route path='products/:id' component={ProductEdit} />
        <Route path='login' component={LoginPage} />
        <Route path='github' component={GithubPage} onEnter={ getRepos }/>
      </Route>
    </Router>
  );
};

const mapDispatchToProps = (dispatch)=> {
  const bootstrap = ()=> {
    dispatch(exchangeTokenForUser())
      .then( user => console.log(user))
      .catch( er => window.localStorage.removeItem('token'));
    dispatch(loadProducts());
  };

  const getRepos = ()=> {
    dispatch(exchangeTokenForUser())
      .then( ()=> dispatch(loadRepos()));
  };
  return {
    bootstrap,
    getRepos
  };
};

export default connect(null, mapDispatchToProps)(Routes);
