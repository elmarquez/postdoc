import React from 'react';

/**
 * Tabbed content panel.
 */
export default class TabbedPanel extends React.Component {
  /**
   * Constructor.
   * @param {Object} props Component properties
   */
  constructor (props) {
    super(props);
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render () {
    return (
      <div className={'tabbed panel'}>
        <div className={'header'}>
          <div className={'tab'}>Tab One</div>
          <div className={'tab active'}>Tab Two</div>
          <div className={'tab'}>Tab Three</div>
        </div>
        <div className={'body'}>Tab content</div>
      </div>
    );
  }
}
