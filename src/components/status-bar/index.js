import React from 'react';
import './styles.css';

/**
 * Application status bar.
 */
export default class StatusBar extends React.Component {
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
      <div className={'status-bar flex flex-row align-items-center justify-content-space-between'}>
        <div className={'group'}>
          <div className={'item'}>document/summary.md</div>
          <div className={'item'}>1:1</div>
        </div>
        <div className={'group'}>
          <div className={'item'}>LF</div>
          <div className={'item'}>UTF-8</div>
          <div className={'item'}>Markdown</div>
          <div className={'item'}>master</div>
          <div className={'item'}>Fetch</div>
          <div className={'item'}>GitHub</div>
          <div className={'item'}>Git (201)</div>
          <div className={'item'}>1 update</div>
        </div>
      </div>
    );
  }
}
