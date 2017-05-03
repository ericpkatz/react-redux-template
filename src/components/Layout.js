import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../redux/reducers/userReducer';

const Layout = ({ children, products, user, logout })=> (
  <div className='container'>
    <h1>React Redux Template</h1>
    <div className='container'>
    <Link to='/'>Home</Link>
    { ' | ' }
    <Link to='/products'>Products ({ products.length})</Link>
    { ' | ' }
    {
      !user.id ? (
        <Link to='/login'>Login</Link>
      ):(
        <a onClick={ logout }>Logout ({ user.name })</a>
      )
    }
    </div>
    { children }
  </div> 
);

const mapStateToProps = ({ products, user})=>(
  { products, user }
);

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(logout())
                    .then(()=> hashHistory.push('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
