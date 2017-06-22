import React, { Component } from 'react';

class Map extends Component{
  componentDidMount(){
    const mapDiv = this.refs.map;
    const options = {
      center: new window.google.maps.LatLng(40.705189,-74.009209),
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      zoom: 16
    };
    const map = new window.google.maps.Map(mapDiv, options);
    //this.markers = [];
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
  }
  render(){
    return (
      <div>
        <div ref='map' style={{ height: '500px'}}/>
      </div>
    );
  }
}

export default Map;
