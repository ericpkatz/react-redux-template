import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import FileInput from '../common/FileInput';

const _ProductForm = ({ product, onChangeName, onSave, onChangeFile, imageData, error, onCancel })=> {
  const title = product.id ? 'Update' : 'Insert';
  return (
    <form className='well'>
      <h2>{ title } a Product</h2>
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
      <button className='btn btn-primary' onClick={ onSave }>{ title }</button>
      <button className='btn btn-default' onClick={ onCancel }>Cancel</button>
    </form>
  );
};

class ProductForm extends Component{
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
    this.props.save(this.state.product, this.state.imageData)
      .catch((err)=> {
        this.setState({ error: err });
      });
  }
  onChangeName(ev){
    const product = this.state.product;
    product.name = ev.target.value;
    this.setState({ product });
  }
  onCancel(ev){
    ev.preventDefault();
    hashHistory.push('products');
  }
  render(){
    const { product, imageData, error } = this.state;
    if(!product){
      return null;
    }
    return (
      <_ProductForm onSave={ this.onSave } product={ product } onChangeName={ this.onChangeName } onChangeFile={ this.onChangeFile } imageData={ imageData } error={ error } onCancel={ this.onCancel } /> 
    );
  }
}

export default ProductForm; 
