import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../redux/reducers/authReducer';

const Layout = ({ children, products, auth, logout })=> (
  <div className='container'>
    <h1>React Redux w/ OAUTH and AWS</h1>
    <div className='container'>
    <Link to='/'>Home</Link>
    { ' | ' }
    <Link to='/products'>Products ({ products.length})</Link>
    { ' | ' }
    {
      !auth.id ? (
        <Link to='/login'>Login</Link>
      ):(
        <span>
          {
            auth.githubAccessToken ? (
              <span>
                <Link to='/github'>Github Repos</Link>
                { ' | ' }
              </span>
            ): (null)
          }
          <a onClick={ logout }>Logout ({ auth.name })</a>
          { ' | ' }
          <Link to='/settings'>Settings</Link>
        </span>
      )
    }
    </div>
    { children }
  </div> 
);

const mapStateToProps = ({ products, auth})=>(
  { products, auth }
);

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(logout())
                    .then(()=> hashHistory.push('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
