import fs from 'fs';
import path from 'path';
import React from 'react';
import { connect } from 'react-redux';
import project from '../../lib/project';
import utils from '../../lib/utils';
import Accordion from '../accordion';
import { Body, Footer, Header, OutlinePanel, TreeItem as TI } from './styles';
import { loadIndex, updateIndex } from '../../store/actions/library';

/**
 * Outline panel.
 */
class OutlinePanelComponent extends React.Component {
  /**
   * Constructor.
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      filter: null
    };
  }

  /**
   * Get file mimetype.
   * @param {Object} f - File
   * @returns {String} mimetype
   */
  getFileItemMimetype(f) {
    return 'application/octet-stream';
  }

  onProjectOpen(prj) {
    const self = this;
    if (!prj) {
    } else {
      project
        .load(prj)
        .then(p => {
          // let data = p.metadata;
          const items = p.files
            .map(f => {
              return {
                id: f.path,
                children: [],
                hasChildren: f.stats.isDirectory(),
                isExpanded: false,
                isChildrenLoading: false,
                data: {
                  title: path.basename(f.path)
                  // TODO add file metadata
                },
                onCollapse: self.onTreeItemCollapse,
                onExpand: self.onTreeItemExpand
              };
            })
            .reduce((m, f) => {
              m[f.id] = f;
              return m;
            }, {});
          items[prj] = {
            id: prj,
            children: Object.keys(items),
            hasChildren: true,
            isExpanded: true,
            isChildrenLoading: false,
            data: {
              title: path.basename(prj)
              // TODO add file metadata
            }
          };
          const tree = { rootId: prj, items };
          const projects = [{ label: path.basename(prj), value: prj }];
          self.setState({ project: tree, projects });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    return (
      <OutlinePanel className="noselect">
        <Body>{this.props.children}</Body>
      </OutlinePanel>
    );
  }

  renderFooter() {
    return <Footer>Search box</Footer>;
  }

  /**
   * Render header.
   * @returns {XML}
   */
  renderHeader() {
    return <Header />;
  }
}

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
  loadIndex: fp => dispatch(loadIndex(fp)),
  updateIndex: fp => dispatch(updateIndex(fp))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutlinePanelComponent);
