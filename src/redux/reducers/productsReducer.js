import axios from 'axios';
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
    return axios.delete(`/api/products/${product.id}`)
      .then(response => dispatch(loadProducts()));
  };
};

const createProduct = (product)=> {
  return (dispatch)=> {
    return axios.post(`/api/products`, product)
      .then(response => dispatch(loadProducts()));
  };
};

export {
  loadProducts,
  destroyProduct,
  createProduct
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
