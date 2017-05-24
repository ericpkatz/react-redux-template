import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../redux/reducers/authReducer';

const GithubPage = ({ repos })=> (
  <div className='container'>
    TODO - get all repos
    <ul className='list-group'>
    {
      repos.map( (repo, idx) => (
          <li className='list-group-item' key={ repo.name }>
            [ { idx } ] 
            { repo.name }
            <br />
            { repo.description }
          </li>
        )
      )
    }
    </ul>
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
