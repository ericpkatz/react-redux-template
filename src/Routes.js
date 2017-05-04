import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';


import Layout from './components/Layout';
import Home from './components/Home';
import ProductsPage from './components/Product/ProductsPage'; 
import CartPage from './components/Cart/CartPage'; 
import OrdersPage from './components/Order/OrdersPage'; 
import LoginPage from './components/LoginPage'; 

import { exchangeTokenForUser } from './redux/reducers/userReducer';
import { loadProducts } from './redux/reducers/productsReducer';
import { loadOrders } from './redux/reducers/ordersReducer';



const Routes = ({ bootstrap })=> {
  return (
    <Router history={ hashHistory } onEnter={ bootstrap() }>
      <Route path='/' component={ Layout }>
        <IndexRoute component={ Home } />
        <Route path='products' component={ProductsPage} />
        <Route path='login' component={LoginPage} />
        <Route path='cart' component={CartPage} />
        <Route path='orders' component={OrdersPage} />
      </Route>
    </Router>
  );
};

const mapDispatchToProps = (dispatch)=> {
  const bootstrap = ()=> {
    dispatch(exchangeTokenForUser())
      .then( user => 
        dispatch(loadOrders(user))
      );
    dispatch(loadProducts());
  };
  return {
    bootstrap
  };
};

export default connect(null, mapDispatchToProps)(Routes);
