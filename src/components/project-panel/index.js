import React from 'react';

/**
 * Project explorer. Provides file and entity exploration views, search
 * functions.
 */
export default class ProjectPanel extends React.Component {
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
      <div className={'project panel'}>
        <div className={'header'}>Header</div>
        <div className={'body'}>Body</div>
      </div>
    );
  }
}
