import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../../redux/reducers/productsReducer.js';
import ProductForm from './ProductForm';
import { hashHistory } from 'react-router';

const mapStateToProps = ()=> {
  return {
    product: {
      name: ''
    }
  };
};

const mapDispatchToProps = ( dispatch)=> {
  return {
    save: (product, imageData)=> {
      return dispatch(createProduct(product, imageData))
              .then(()=> hashHistory.push('products'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
