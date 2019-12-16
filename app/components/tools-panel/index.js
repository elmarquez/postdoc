import Form, { Field } from '@atlaskit/form';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FlexColumn, FlexRow } from '../layout';
import { ErrorMessage } from './styles';
import {
  Body,
  ContentPanel,
  Footer,
  Header
} from '../edge-panel/styles/content';
import {
  loadIndex,
  updateIndex,
  writeIndex
} from '../../src/store/actions/library';

/**
 * Tools properties panel.
 */
class ToolsPanelComponent extends React.Component {
  /**
   * Handle load library action.
   */
  onLoadIndex() {
    this.props.loadIndex(this.props.profile.data.library);
  }

  /**
   * Handle update index action.
   */
  onUpdateIndex() {
    this.props.updateIndex(
      this.props.profile.data.library,
      this.props.library.data
    );
  }

  /**
   * Handle write index action.
   */
  onWriteIndex() {
    this.props.writeIndex(
      this.props.profile.data.library,
      this.props.library.data
    );
  }

  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    return (
      <ContentPanel>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </ContentPanel>
    );
  }

  /**
   * Render the component body.
   * @returns {JSX.Element}
   */
  renderBody() {
    return (
      <Body>
        <FlexColumn className={'padding-s'}>
          <h4>Library</h4>
          <Button appearance={'default'} onClick={() => this.onLoadIndex()}>
            Load Index
          </Button>
          <Button appearance={'default'} onClick={() => this.onUpdateIndex()}>
            Update Index
          </Button>
          <Button appearance={'default'} onClick={() => this.onWriteIndex()}>
            Write Index
          </Button>
        </FlexColumn>
      </Body>
    );
  }

  /**
   * Render the component footer.
   * @returns {JSX.Element}
   */
  renderFooter() {
    return <Footer>Footer</Footer>;
  }

  /**
   * Render the component header.
   * @returns {JSX.Element}
   */
  renderHeader() {
    return <Header>Tools</Header>;
  }
}

const mapStateToProps = state => {
  return {
    app: state.app,
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
  loadIndex: fp => dispatch(loadIndex(fp)),
  updateIndex: (fp, data) => dispatch(updateIndex(fp, data)),
  writeIndex: (fp, data) => dispatch(writeIndex(fp, data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolsPanelComponent);
