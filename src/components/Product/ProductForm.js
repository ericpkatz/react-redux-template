import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../../redux/reducers/productsReducer.js';

import FileInput from '../common/FileInput';


const _ProductForm = ({ name, onChange, error, save, onChangeFile, imageData } )=> {
  return (
    <form className='well'>
      <h2>Insert a New Product</h2>
      {
        error ? (
          <div className='alert alert-warning'>Error</div>
        ): (null)
      }
      <div className='form-group'>
        <input value={ name } className='form-control' name='name' onChange={ onChange }/>
      </div>
      <div className='form-group'>
        <FileInput onChangeFile={ onChangeFile } imageData={ imageData }/>
      </div>
      <button className='btn btn-primary' onClick={ save } disabled={ !name }>Save</button>
    </form>
  );
};

class ProductForm extends Component{
  constructor(){
    super();
    this.state = { name: '', imageData: '' };
    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
  }
  onChangeFile(imageData){
    this.setState({ imageData });
  }
  onChange(ev){
    let change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render(){
    const { name, error, imageData } = this.state;
    const save = (ev)=> {
      ev.preventDefault();
      this.props.save(this.state)
        .then(()=> this.setState({ name: '', imageData: '', error: null }))
        .catch((ex)=> this.setState( { error: ex }));
    };
    return (
      <_ProductForm error={error} save={ save } imageData={imageData} name={ name } onChange={ this.onChange }onChangeFile={this.onChangeFile}></_ProductForm>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    save: (product)=> {
      return dispatch(createProduct(product));
    }
  };
};

export default connect(null, mapDispatchToProps)(ProductForm);
