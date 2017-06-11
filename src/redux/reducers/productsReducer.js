import axios from 'axios';

const authConfig = ()=> {
  return {
      headers: {'Authorization': `Bearer ${ window.localStorage.getItem('token')}`} 
    };
}

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
    return axios.delete(`/api/products/${product.id}`, authConfig())
      .then(response => dispatch(loadProducts()));
  };
};

const createProduct = (product, imageData)=> {
  return (dispatch)=> {
    const payload = Object.assign({}, product, { imageData });
    return axios.post(`/api/products`, payload, authConfig())
      .then(response => dispatch(loadProducts()));
  };
};

const updateProduct = (product, imageData)=> {
  const payload = Object.assign({}, product, { imageData });
  return (dispatch)=> {
    return axios.put(`/api/products/${product.id}`, payload, authConfig())
      .then(response => dispatch(loadProducts()));
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
