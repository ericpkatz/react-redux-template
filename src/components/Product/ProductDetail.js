import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../../redux/reducers/productsReducer.js';
import { hashHistory } from 'react-router';

import FileInput from '../common/FileInput';

const _ProductDetail = ({ product, onChangeName, onSave, onChangeFile, imageData, error })=> {
  return (
    <form className='well'>
      <h2>Update a Product</h2>
      {
        error ? (
          <div className='alert alert-warning'>Error</div>
        ): (null)
      }
      <div className='form-group'>
        <label>Name</label>
        <input className='form-control' value={ product.name } onChange={ onChangeName } />
      </div>
      {
        product.imageURL ? (
          <img src={ product.imageURL } width='100px' height='100px'/>
        ) : ( null )
      }
      <div className='form-group'>
        <FileInput onChangeFile={ onChangeFile } imageData={ imageData }/>
      </div>
      <button className='btn btn-primary' onClick={ onSave }>Update</button>
    </form>
  );
};

class ProductDetail extends Component{
  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.state = { product: null, imageData: '', error: null };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.product && !this.state.product){
      this.setState({ product: nextProps.product });
    }
  }
  onChangeFile(imageData){
    this.setState({ imageData });
  }
  onSave(ev){
    ev.preventDefault();
    this.props.updateProduct(this.state.product, this.state.imageData)
      .catch((err)=> {
        this.setState({ error: err });
      });
  }
  onChangeName(ev){
    const product = this.state.product;
    product.name = ev.target.value;
    this.setState({ product });
  }
  render(){
    const { product, imageData, error } = this.state;
    if(!product){
      return null;
    }
    return (
      <_ProductDetail onSave={ this.onSave } product={ product } onChangeName={ this.onChangeName } onChangeFile={ this.onChangeFile } imageData={ imageData } error={ error }/> 
    );
  }
}

const mapStateToProps = ({ products}, ownProps)=> {
  const product = products.find((product)=> product.id == ownProps.params.id ); 
  return {
    product
  };
};

const mapDispatchToProps = ( dispatch)=> {
  return {
    updateProduct: (product, imageData)=> {
      return dispatch(updateProduct(product, imageData)) 
        .then(()=> hashHistory.push('/products'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps )(ProductDetail);
