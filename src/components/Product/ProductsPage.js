import React from 'react';
import ProductList from './ProductList';
import { Link } from 'react-router';

const ProductsPage = ()=> (
  <div className='well'>
    <Link className='btn btn-primary' to='products/insert'>Insert A New Product</Link>
    <h2>Products</h2>
    <ProductList />
  </div>
);

export default ProductsPage;

