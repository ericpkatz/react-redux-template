import React from 'react';
import { connect } from 'react-redux';
import { addRating } from '../../redux/reducers/ordersReducer';
import { loadProducts } from '../../redux/reducers/productsReducer';

const OrdersPage = ({ orders, addRating, user, reviews })=> {
  const ratings = [
    1, 2, 3, 4, 5
  ];
  return (
    <div>
      <ul className='list-group'>
        {
          orders.map( order => {
            return (
              <li key={ order.id } className='list-group-item'>
                Order { order.id }
                {
                  <ul className='list-group'>
                    {
                      order.lineItems.map( lineItem => {
                        return (
                          <li className='list-group-item' key={ lineItem.id } >
                            Name: { lineItem.product.name } 

                            <br />
                            ( Quantity: { lineItem.quantity } )
                            {
                              lineItem.reviews.length ? (
                                <div>
                                  <div>
                                  You rated this: {lineItem.reviews[0].rating}
                                  </div>
                                  <div>
                                  The average rating was: { reviews[lineItem.productId].averageRating } 
                                  </div>
                                </div>

                              ) : (
                                <div>
                                  <label>Rating</label>
                                  <select className='form-control' onChange={ (ev)=> addRating(user, lineItem, ev.target.value )}>
                                    {
                                      ratings.map( rating => <option key={rating}>{rating}</option>)
                                    }
                                  </select>
                                </div>
                              )
                            }
                          </li>
                        )
                      })
                    }
                  </ul>
                }
               </li>
            );
          })
        }
      </ul>
    </div>
 );
};

const mapDispatchToProps = (dispatch)=> (
  {
    addRating: (user, lineItem, rating)=> {
      return dispatch(addRating(user, lineItem, rating))
        .then(()=> dispatch( loadProducts()));
    }
  }
);

const mapStateToProps = ({ orders, user, products })=> {
  const filtered = orders.filter(order => order.state !== 'CART');
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
    orders: filtered,
    user,
    reviews
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
