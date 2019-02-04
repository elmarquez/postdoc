import React from 'react';
import './styles.css';

/**
 * Resize control.
 */
class Resize extends React.Component {
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
      <div className={'resize'}>&nbsp;</div>
    );
  }
}
