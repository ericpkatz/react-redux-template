import React from 'react';
import { connect } from 'react-redux';
import { checkout, removeItemFromCart, addItemToCart } from '../../redux/reducers/ordersReducer';

const CartPage = ({ cart, removeItemFromCart, user, addItemToCart, checkout })=> {
  if(!cart){
    return null;
  }

  return (
    <div>
      <ul className='list-group'>
        {
          cart.lineItems.length === 0 ? (
            <li className='list-group-item list-group-item-warning'>
              Put some items in cart...
            </li>
          ) : ( null )
        }
        {
          cart.lineItems.map( lineItem => {
            return (
              <li key={ lineItem.id } className='list-group-item'>
                { lineItem.product.name }
                <span
                  onClick={()=> addItemToCart(user, cart, lineItem.product) }
                  style={ { marginLeft: '10px' } }
                  className='label label-default'>
                    { lineItem.quantity }
                </span>
                <button className='btn btn-warning pull-right' onClick={ ()=> removeItemFromCart(user, cart, lineItem)}>x</button>
                <br style={ { clear: 'both' }} />
              </li>
            )
          })
        }
      </ul>
      {
        cart.lineItems.length ? (
          <button onClick={ ()=> checkout(user, cart)} className='btn btn-primary'>
            Checkout
          </button>
        ) : (null) 
      }
    </div>
 );
};

const mapDispatchToProps = (dispatch)=> (
  {
    checkout: (user, cart)=> {
      return dispatch(checkout(user, cart));
    },
    removeItemFromCart: (user, cart, lineItem)=> {
      return dispatch(removeItemFromCart(user, cart, lineItem));
    },
    addItemToCart: ( user, cart, product )=> dispatch(addItemToCart( user, cart, product))
  }
);

const mapStateToProps = ({ orders, user })=> {
  const cart = orders.filter(order => order.state === 'CART');
  return {
    cart: cart ? cart[0] : null,
    user
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
