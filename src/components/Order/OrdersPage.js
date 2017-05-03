import React from 'react';
import { connect } from 'react-redux';

const OrdersPage = ({ orders })=> {
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
                            { lineItem.product.name } 
                            ( { lineItem.quantity } )
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
  }
);

const mapStateToProps = ({ orders, user })=> {
  const filtered = orders.filter(order => order.state !== 'CART');
  return {
    orders: filtered,
    user
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
