import Home from './Home';
import React, { Component } from 'react';
import { mount } from 'enzyme';

describe('Home', ()=> {
  it('renders', ()=> {
    const wrapper = mount(<Home fizz='buzz'/>);
    const span = wrapper.find('div');
    expect(wrapper).to.be.ok;
  });
});
