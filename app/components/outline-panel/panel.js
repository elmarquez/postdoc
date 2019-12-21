import { Tree } from 'antd';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { connect } from 'react-redux';
import project from '../../lib/project';
import utils from '../../lib/utils';
import Accordion from '../accordion';
import { Body, Footer, Header, OutlinePanel, TreeItem as TI } from './styles';
import { loadIndex, updateIndex } from '../../store/actions/library';

const { TreeNode } = Tree;

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

  onDragEnter = info => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  onDrop = info => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
    });
  };

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
