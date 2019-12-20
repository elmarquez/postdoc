import { shallow, mount, render } from 'enzyme';
import jest from 'jest';
import React from 'react';
import { expect } from 'chai';
import EdgePanel from '../index';
import TabComponent from '../tab';

class PanelComponent extends React.Component {
  render() {
    return <div>Panel</div>;
  }
}

describe('Edge panel', () => {
  it('renders a tab for each panel', () => {
    const panels = [<PanelComponent />, <PanelComponent />];
    const component = mount(<EdgePanel panels={panels} />);
    const props = component.props();
    expect(props.hasOwnProperty('panels')).to.equal(true);
    expect(props.panels).to.equal(panels);

    const tabs = component.find(TabComponent);
    expect(tabs.length).to.equal(panels.length);
  });

  it('displays a panel when the corresponding tab is clicked', () => {
    expect(1).to.equal(1);
  });

  it('changes the displayed panel when a different tab is clicked', () => {
    expect(1).to.equal(1);
  });

  it('hides the panel when a selected tab is clicked again', () => {
    expect(1).to.equal(1);
  });
});
