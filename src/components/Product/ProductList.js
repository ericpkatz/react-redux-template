import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { destroyProduct } from '../../redux/reducers/productsReducer';
import ProductListItem from './ProductListItem';

const ProductList = ({ products, destroyProduct})=> (
    <ul className='list-group'>
    {
      products.map( product => {
        return (
          <ProductListItem  key={ product.id} product={ product } destroyProduct={()=> destroyProduct(product)} /> 
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
