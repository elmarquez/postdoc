import React from 'react';

/**
 * Git repository management panel.
 */
export default class GitPanel extends React.Component {
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
      <div className={'git panel'}>Git Panel</div>
    );
  }
}
