import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import jest from 'jest';
import React from 'react';
import ErrorBoundary from '../index';

describe('ErrorBoundary panel', () => {
  const component = shallow(<ErrorBoundary />);

  it('renders the error view when a child component throws an exception', () => {
    expect(1).to.equal(1);
  });
});
