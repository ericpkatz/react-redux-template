import React from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const ProductsPage = ()=> (
  <div className='well'>
    <ProductForm />
    <ProductList />
  </div>
);

export default ProductsPage;

