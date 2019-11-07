import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import faker from 'faker';
import jest from 'jest';
import mock from 'jest-mock';
import React from 'react';
import TabComponent from '../tab';
import BreadcrumbComponent from '../../breadcrumbs/breadcrumb';

describe('Edge panel tab', () => {
  it('renders the icon', () => {
    const icon = <span>icon</span>;
    const wrapper = mount(<TabComponent icon={icon} label={'TEST'} />);
    const props = wrapper.props();
    expect(props.hasOwnProperty('icon')).to.equal(true);
  });

  it('renders the label', () => {
    const label = faker.lorem.word();
    const wrapper = mount(<TabComponent label={label} />);
    const props = wrapper.props();
    expect(props.hasOwnProperty('label')).to.equal(true);
    expect(props.label).to.equal(label);
  });

  it('calls the click handler', () => {
    let count = 0;
    const clickHandler = function() {
      count = count + 1;
    };
    const wrapper = mount(<TabComponent label={'TEST'} onClick={() => clickHandler()} />);
    let component = wrapper.find(TabComponent);
    component.simulate('click');
    expect(count).to.equal(1);
  });

  it('changes the display state when in selected state', () => {
    let wrapper = mount(<TabComponent label={'TEST'} selected={true} />);
    let component = wrapper.find(TabComponent);
    let props = component.props();
    expect(props.hasOwnProperty('selected')).to.equal(true);
    expect(props.selected).to.equal(true);

    wrapper = mount(<TabComponent label={'TEST'} selected={false} />);
    component = wrapper.find(TabComponent);
    props = component.props();
    expect(props.selected).to.equal(false);
  });
});
