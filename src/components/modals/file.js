import PropTypes from 'prop-types';
import React from 'react';
import {loadApplicationState} from "../../store/actions/application";
import {loadProfile} from "../../store/actions/profile";

const TYPE = {
  FILE: 0,
  FOLDER: 2
};

/**
 * File selection modal.
 */
class FileSelectionModalComponent extends React.Component {
  /**
   * Handle file selection change event.
   * @param {Object} data - Selection data
   */
  onChange(data) {
    if (this.props.onSelect) {
      this.props.onSelect(data);
    }
  }

  /**
   * Render the component.
   * @return {JSX.Element}
   */
  render() {
    const isFolder = this.props.folder ? this.props.folder : false;
    if (isFolder) {
      return this.renderFolderSelectionModal();
    } else {
      return this.renderFileSelectionModal();
    }
  }

  /**
   * Render file selection input.
   * @returns {JSX.Element}
   */
  renderFileSelectionModal() {
    const accept = this.props.accept ? this.props.accept.join(',') : "";
    return (
      <input
        accept={accept}
        className={'offscreen hidden'}
        id="filepicker"
        multiple={this.props.multiple || false}
        name="fileList"
        type="file" />
    );
  }

  /**
   * Render folder selection input.
   * @returns {JSX.Element}
   */
  renderFolderSelectionModal() {
    const accept = this.props.accept ? this.props.accept.join(',') : "";
    return (
      <input
        accept={accept}
        className={'offscreen hidden'}
        id="filepicker"
        name="fileList"
        onChange={this.onChange.bind(this)}
        multiple={this.props.multiple || false}
        type="file"
        nwdirectory />
    );
  }
}

FileSelectionModalComponent.propTypes = {
  accept: PropTypes.array,
  folder: PropTypes.bool,
  multiple: PropTypes.bool,
  onSelect: PropTypes.func
};

const mapStateToProps = state => {
  return {
    application: state.application,
    library: state.library,
    profile: state.profile,
    project: state.project
  };
};

/**
 * Map data store dispatch functions to component properties.
 * @param {Function} dispatch - Redux dispatch function
 * @return {Object} Map of functions to be assigned to the component props
 */
const mapDispatchToProps = dispatch => ({
  loadApplicationState: () => dispatch(loadApplicationState()),
  loadProfile: () => dispatch(loadProfile()),
});


export default FileSelectionModalComponent;
