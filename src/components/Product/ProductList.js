import React from 'react';
import { connect } from 'react-redux';
import { addItemToCart } from '../../redux/reducers/ordersReducer';
import { hashHistory } from 'react-router';

const ProductListItem = ({ product, addItemToCart, reviews })=> (
  <li className='list-group-item'>
    { product.name }
    {
      reviews[product.id] ? (
        <span className='label label-default' style={ { marginLeft: '10px' }}>Average Rating { reviews[product.id].averageRating }</span>
      ) : (null)
    }
    <button onClick={ addItemToCart } className='btn btn-default pull-right'>+</button>
    <br style={{ clear: 'both'}} />
  </li>
);

const ProductList = ({ products, destroyProduct, user, cart, addItemToCart, reviews })=> (
    <ul className='list-group'>
    {
      products.map( product => {
        return (
          <ProductListItem
          key={ product.id}
          product={ product }
          reviews={reviews}
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
  const reviews = products.reduce((memo, product)=> {
    const sumOfRatings = product.lineItems.reduce((sum, lineItem) => {
      if(lineItem.reviews.length){
        sum += lineItem.reviews[0].rating;
      }
      return sum;
    }, 0); 
    if(sumOfRatings){
      memo[product.id] = {
        averageRating: (sumOfRatings/product.lineItems.length).toFixed(2) 
      };
    }
    return memo;
  }, {});
  return {
    products,
    cart: cart ? cart[0] : null,
    user,
    reviews
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
