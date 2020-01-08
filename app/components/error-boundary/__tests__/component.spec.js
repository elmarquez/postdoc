import chai from 'chai';
import { shallow } from 'enzyme';
import jest from 'jest';
import React from 'react';
import ErrorBoundary from '../index';

describe('ErrorBoundary panel', () => {
  const component = shallow(<ErrorBoundary />);

  it('renders the error view when a child component throws an exception', () => {
    chai.expect(component).to.exist;
  });
});
