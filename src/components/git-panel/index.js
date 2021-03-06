import React from 'react';

/**
 * Git repository management panel.
 */
class GitPanel extends React.Component {
  /**
   * Constructor.
   * @param {Object} props - Component properties
   */
  constructor (props) {
    super(props);
    this.state = {
      branch: 'master',
      commit: 'This is a sample commit message',
      commits: 98,
      files: [],
      remote: {},
      staged: []
    };
  }

  /**
   * Handle text area value change.
   * @param a
   */
  handleTextAreaValueChange (a, b) {
    console.info('text area value change', a, b);
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
      return (
        <div className={'git panel'}>
          <div className={'header'}>
            <div>Git Panel</div>
          </div>
          {this.renderUnstagedChanges()}
          {this.renderStagedChanges()}
          {this.renderCommit()}
        </div>
      );
  }

  /**
   * Render commit panel.
   * @returns {XML}
   */
  renderCommit () {
    return (
      <div className={'commit'}>
        Commit message
        <textarea onChange={this.handleTextAreaValueChange} value={this.state.commit}></textarea>
      </div>
    );
  }

  /**
   * Render staged changes panel.
   * @returns {XML}
   */
  renderStagedChanges () {
    return (
      <div className={'staged changes'}>
        <div className={'header'}>
          Staged Changes
        </div>
        <div className={'body'}>
          Staged changes
        </div>
      </div>
    );
  }

  /**
   * Render unstaged changes panel.
   * @returns {XML}
   */
  renderUnstagedChanges () {
    return (
      <div className={'unstaged changes'}>
        <div className={'header'}>
          Unstaged Changes
        </div>
        <div className={'body'}>
          Unstaged changes
        </div>
      </div>
    );
  }

};

module.exports = GitPanel;
