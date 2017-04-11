import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { loadProducts } from './actions';

import { LOAD_PRODUCTS_SUCCESS, DESTROY_PRODUCT_SUCCESS } from './constants';

const productsReducer = (state=[], action)=> {
  switch(action.type){
    case LOAD_PRODUCTS_SUCCESS:
      state = action.products;
      break;
    case DESTROY_PRODUCT_SUCCESS:
      state = state.filter(product=> product.id != action.product.id);
      break;
  }
  return state;
};


const combined = combineReducers({
  products: productsReducer,
});

const store = createStore(combined, applyMiddleware(thunk));


store.dispatch(loadProducts());

export default store;
