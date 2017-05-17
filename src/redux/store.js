import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import userReducer from './reducers/userReducer'; 

const combined = combineReducers({
  products: productsReducer,
  user: userReducer
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
