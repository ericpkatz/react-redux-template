import axios from 'axios';
const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';

const loadOrdersSuccess = (orders)=> ({
  type: LOAD_ORDERS_SUCCESS,
  orders
});

const loadOrders = (user)=> {
  return (dispatch)=> {
    return axios.get(`/api/users/${user.id}/orders`)
      .then(response => dispatch(loadOrdersSuccess(response.data)));
  };
};

const addItemToCart = (user, cart, product)=> {
  return (dispatch)=> {
    return axios.post(`/api/users/${user.id}/orders/${cart.id}/lineItems`,
      {
        productId: product.id
      }
    )
      .then(response => dispatch(loadOrders(user)));
  };
};

const addRating = (user, lineItem, rating)=> {
  return (dispatch)=> {
    return axios.post(`/api/users/${user.id}/reviews/`,
      {
        rating,
        lineItemId: lineItem.id
      }
    )
      .then(response => dispatch(loadOrders(user)));
  };
};

const checkout = (user, cart)=> {
  return (dispatch)=> {
    return axios.put(`/api/users/${user.id}/orders/${cart.id}`,
      {
        state: 'ORDER' 
      }
    )
      .then(response => dispatch(loadOrders(user)));
  };
};

const removeItemFromCart = (user, cart, lineItem)=> {
  return (dispatch)=> {
    return axios.delete(`/api/users/${user.id}/orders/${cart.id}/lineItems/${lineItem.id}`)
      .then(response => dispatch(loadOrders(user)));
  };
};

export {
  loadOrders,
  addItemToCart,
  removeItemFromCart,
  checkout,
  addRating
};

const ordersReducer = (state=[], action)=> {
  switch(action.type){
    case LOAD_ORDERS_SUCCESS:
      state = action.orders;
      break;
    case 'LOGOUT_SUCCESS':
      state = []; 
      break;
  }
  return state;
};

export default ordersReducer;
