import React from 'react';
import { connect } from 'react-redux';
import { addItemToCart } from '../../redux/reducers/ordersReducer';
import { hashHistory } from 'react-router';

const ProductListItem = ({ product, addItemToCart })=> (
  <li className='list-group-item'>
    { product.name }
    <button onClick={ addItemToCart } className='btn btn-default pull-right'>+</button>
    <br style={{ clear: 'both'}} />
  </li>
);

const ProductList = ({ products, destroyProduct, user, cart, addItemToCart })=> (
    <ul className='list-group'>
    {
      products.map( product => {
        return (
          <ProductListItem
          key={ product.id}
          product={ product }
          addItemToCart={()=> addItemToCart( user, cart, product )}/> 
        );
      })
    }
    </ul>
);

const mapDispatchToProps = (dispatch)=> (
  {
    destroyProduct: (product)=> dispatch(destroyProduct(product)),
    addItemToCart: ( user, cart, product )=> dispatch(addItemToCart( user, cart, product)).then(()=> hashHistory.push('/cart'))
  }
);

const mapStateToProps = ({ products, orders, user })=> {
  const cart = orders.filter(order => order.state === 'CART');
  return {
    products,
    cart: cart ? cart[0] : null,
    user
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
