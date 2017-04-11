import React from 'react';
import { connect } from 'react-redux';
import { destroyProduct } from './actions';

const ProductList = ({ products, destroyProduct})=> (
    <ul className='list-group'>
    {
      products.map( product => {
        return (
          <li className='list-group-item' key={ product.id}>
            { product.name }
                  <button onClick={ ()=> destroyProduct(product)} className='btn btn-danger pull-right'>x</button>
            <br style={{ clear: 'both'}} />
          </li>
        );
      })
    }
    </ul>
);

const mapDispatchToProps = (dispatch)=> (
  {
    destroyProduct: (product)=> dispatch(destroyProduct(product))
  }
);

const mapStateToProps = (state)=> (
  {
    products: state.products
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
