import axios from 'axios';
import { authorizedRequest } from '../../common/auth';

const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';

const loadProductsSuccess = (products)=> ({
  type: LOAD_PRODUCTS_SUCCESS,
  products: products
});

const loadProducts = ()=> {
  return (dispatch)=> {
    return axios.get('/api/products')
      .then(response => dispatch(loadProductsSuccess(response.data)));
  };
};

const destroyProduct = (product)=> {
  return (dispatch)=> {
    const url = `/api/products/${product.id}`;
    const method = 'delete';
    return authorizedRequest({ url, method })
      .then(() => dispatch(loadProducts()));
  };
};

const createProduct = (product, imageData)=> {
  return (dispatch)=> {
    const payload = Object.assign({}, product, { imageData });
    const method = 'post';
    const url = 'api/products';
    return authorizedRequest({ url, method, payload })
      .then(() => dispatch(loadProducts()));
  };
};

const updateProduct = (product, imageData)=> {
  const payload = Object.assign({}, product, { imageData });
  const method = 'put';
  const url = `/api/products/${product.id}`;

  return (dispatch)=> {
    return authorizedRequest({ url, method, payload })
      .then(() => dispatch(loadProducts()));
  };
};

export {
  loadProducts,
  destroyProduct,
  createProduct,
  updateProduct
};

const productsReducer = (state=[], action)=> {
  switch(action.type){
    case LOAD_PRODUCTS_SUCCESS:
      state = action.products;
      break;
  }
  return state;
};

export default productsReducer;
