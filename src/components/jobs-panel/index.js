import React from 'react';

/**
 * Git repository management panel.
 */
export default class JobsPanel extends React.Component {
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
      <div className={'jobs panel'}>Jobs Panel</div>
    );
  }
}
