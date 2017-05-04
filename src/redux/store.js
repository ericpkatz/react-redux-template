import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import userReducer from './reducers/userReducer'; 
import ordersReducer from './reducers/ordersReducer'; 


const combined = combineReducers({
  products: productsReducer,
  user: userReducer,
  orders: ordersReducer,
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
