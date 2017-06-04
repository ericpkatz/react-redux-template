import Home from './Home';
var Utils = require('react-dom/test-utils');
import React, { Component } from 'react';

class Wrapper extends Component{
  render(){
    return this.props.children;
  }
}

describe('home', function () {
  it('renders without problems', function () {
    const wrapper = Utils.renderIntoDocument(<Wrapper><Home /></Wrapper>);
    const div = Utils.findRenderedDOMComponentWithTag(wrapper, 'div');
    expect(div).to.be.ok;
  });
});
