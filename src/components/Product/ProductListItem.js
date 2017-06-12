import React, { Component } from 'react';
import { Link } from 'react-router';
import ConfirmationModal from '../common/ConfirmationModal.js';


const ProductListItem = ({ product, destroyProduct })=> (
  <li className='list-group-item'>
    <Link to={`/products/${product.id}`}>{ product.name }</Link>
    {
      product.imageURL ? (
        <div className='well'>
          <img src={ product.imageURL } width='100px' height='100px'/>
        </div>
      ) : ( null )
    }
    <ConfirmationModal message={`Are you sure you want to delete ${product.name}`} onConfirm={ destroyProduct }>
      <button className='btn btn-danger pull-right'>x</button>
    </ConfirmationModal>
    <br style={{ clear: 'both'}} />
  </li>
);

export default ProductListItem;

