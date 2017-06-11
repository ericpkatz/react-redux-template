import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../../redux/reducers/productsReducer.js';
import { hashHistory } from 'react-router';
import ProductForm from './ProductForm';


const mapStateToProps = ({ products}, ownProps)=> {
  const product = products.find((product)=> product.id == ownProps.params.id ); 
  return {
    product
  };
};

const mapDispatchToProps = ( dispatch)=> {
  return {
    save: (product, imageData)=> {
      return dispatch(updateProduct(product, imageData)) 
        .then(()=> hashHistory.push('/products'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps )(ProductForm);
