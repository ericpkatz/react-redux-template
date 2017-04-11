import axios from 'axios';

import {
  LOAD_PRODUCTS_SUCCESS,
  DESTROY_PRODUCT_SUCCESS,
  UNSET_FAVORITE_PRODUCT} from './constants';

const loadProductsSuccess = (products)=> ({
  type: LOAD_PRODUCTS_SUCCESS,
  products: products
});

const destroyProductSuccess = (product)=> ({
  type: DESTROY_PRODUCT_SUCCESS,
  product: product
});


const loadProducts = ()=> {
  return (dispatch)=> {
    return axios.get('/api/products')
      .then(response => dispatch(loadProductsSuccess(response.data)));
  };
};

const destroyProduct = (product)=> {
  return (dispatch)=> {
    return axios.delete(`/api/products/${product.id}`)
      .then(response => dispatch(destroyProductSuccess(product)));
  };
};


export {
  destroyProduct,
  loadProducts
};
