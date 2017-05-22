import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import authReducer from './reducers/authReducer'; 
import githubReducer from './reducers/githubReducer'; 

const combined = combineReducers({
  products: productsReducer,
  auth: authReducer,
  repos: githubReducer
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
