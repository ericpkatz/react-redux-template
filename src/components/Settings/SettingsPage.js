import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/reducers/authReducer.js';

class SettingsPage extends Component{
  constructor(){
    super();
    this.state = { auth: {} };
    this.updatePosition = this.updatePosition.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({ auth: nextProps.auth });
  }
  updatePosition(ev){
    const auth = this.state.auth;
    Object.assign(auth, { position: ev.target.value });
    this.setState({ auth });
  }
  render(){
    const { auth, updateUser }  = this.props;
    if(!auth.id){
      return null;
    }
    const save = (ev)=> {
      ev.preventDefault();
      updateUser(this.state.auth)
        .then(()=> {
          this.setState({ message: 'success' });
        });
    };
    return (
      <div>
      <h2>User Settings for { auth.name }</h2>
        {
          this.state.message ? (<div className='alert alert-success'>{ this.state.message }</div>) : ( null )
        }
        <form>
          <div className='form-group'>
            <label>Position</label>
            <input onChange={ this.updatePosition } className='form-control' value={ this.state.auth.position }/>
          </div>
          <button className='btn btn-primary' onClick={ save }>Update</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth })=> {
  return {
    auth
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    updateUser: (user)=> dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
