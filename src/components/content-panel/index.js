import React from 'react';
import TabbedPanel from '../tabbed-panel';

/**
 * Content editing and viewing panel.
 */
export default class ContentPanel extends React.Component {
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
      <div className={'content panel'}>
        <TabbedPanel />
      </div>
    );
  }
}
