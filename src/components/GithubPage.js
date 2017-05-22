import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../redux/reducers/authReducer';

const GithubPage = ({ repos })=> (
  <div className='container'>
    {
      repos.map( repo => (
          <li className='list-group-item' key={ repo.name }>
            { repo.name }
            <br />
            { repo.description }
          </li>
        )
      )
    }
  </div> 
);

const mapStateToProps = ({ repos })=>(
  {
    repos
  }
);

const mapDispatchToProps = (dispatch)=> {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GithubPage);
