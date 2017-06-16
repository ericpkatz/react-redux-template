import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/reducers/authReducer.js';

class SettingsPage extends Component{
  constructor(){
    super();
    this.state = { message: '' };
    this.updatePosition = this.updatePosition.bind(this);
  }
  updatePosition(ev){
    const auth = this.state.auth;
    Object.assign(auth, { position: ev.target.value });
    this.setState({ auth });
  }
  componentDidUpdate(){
    const autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete);
    autocomplete.addListener('place_changed', ()=> {
      const place = autocomplete.getPlace();
      const address = place.formatted_address;
      const auth = this.props.auth;
      auth.position = address;
      this.props.updateUser(auth)
        .then(()=> {
          this.setState({ message: 'success' });
        });
    });
  }
  render(){
    const { auth, updateUser }  = this.props;
    if(!auth.id){
      return null;
    }
    return (
      <div>
      <h2>User Settings for { auth.name }</h2>
        {
          this.state.message ? (<div className='alert alert-success'>{ this.state.message }</div>) : ( null )
        }
        <form>
          <div className='form-group'>
            <input type='text' className='form-control' ref='autocomplete' />
          </div>
          <div className='form-group'>
            <label>Position</label>
            <div>{ auth.position }</div>
          </div>
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
