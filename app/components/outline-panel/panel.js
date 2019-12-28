import { Tree } from 'antd';
import { equals } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { File } from 'styled-icons/fa-solid/File';
import { Folder } from 'styled-icons/fa-solid/Folder';
import { Body, Footer, Header, OutlinePanel } from './styles';
import { loadIndex, updateIndex } from '../../store/actions/project';
import Project from '../../lib/project';

const { TreeNode } = Tree;

/**
 * Outline panel.
 */
class OutlinePanelComponent extends React.Component {
  /**
   * Constructor.
   * @param {Object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      autoExpandParent: true,
      // checkable: false,
      // checkedKeys: [],
      expandedKeys: [],
      // filter: null,
      selectedKeys: [],
      showIcon: true,
      showLine: false,
      tree: []
    };
  }

  /**
   * Handle componentDidUpdate lifecycle event.
   * @param {object} prevProps - Previous component properties
   */
  componentDidUpdate(prevProps) {
    const self = this;
    if (!equals(self.props, prevProps)) {
      const { project } = self.props;
      if (project.path !== "" && !equals(project.path, prevProps.project.path)) {
        console.info('loading new project folder');
        Project
          .loadFileTree(project.path)
          .then(function(tree) {
            self.setState({ expandedKeys: [tree[0].key], tree });
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    }
  }

  /**
   * Get file mimetype.
   * @param {Object} f - File
   * @returns {String} mimetype
   */
  getFileItemMimetype(f) {
    return 'application/octet-stream';
  }

  /**
   * Get file icon.
   * @param {object} item - File metadata
   * @returns {JSX.Element}
   */
  getIcon(item) {
    switch (item.mimetype) {
      case 'application/javascript':
        return <File />;
        break;
      case 'application/json':
        return <File />;
        break;
      case 'application/pdf':
        return <File />;
        break;
      case 'application/postscript':
        return <File />;
        break;
      case 'image/jpeg':
        return <File />;
        break;
      case 'image/png':
        return <File />;
        break;
      case 'image/svg+xml':
        return <File />;
        break;
      case 'text/css':
        return <File />;
        break;
      case 'text/html':
        return <File />;
        break;
      case 'text/markdown':
        return <File />;
        break;
      case 'text/yaml':
        return <File />;
        break;
      default:
        return <File />;
    }
  }

  /**
   * Handle tree item check.
   * @param checkedKeys
   */
  onCheck(checkedKeys) {
    this.setState({ checkedKeys });
  }

  /**
   * Handle tree item expand event.
   * @param {array} expandedKeys - List of expanded tree nodes
   */
  onExpand(expandedKeys) {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({ autoExpandParent: false, expandedKeys });
  }

  // onLoadData(treeNode) {
  //   const self = this;
  //   console.info('load', treeNode);
  //   const { key } = treeNode.props.dataRef;
  //   return Project.loadFileTree(key).then(function(subtree) {
  //     const tree = clone(this.state.tree);
  //     const keyLens = lensProp('key');
  //     const children = subtree.children;
  //     const node = set(keyLens, key, {children});
  //     console.info('subtree', subtree);
  //     treeNode.props.dataRef.children = children;
  //     self.setState({ tree: [...self.state.tree] });
  //     return subtree;
  //   });
  // }

  /**
   * Handle tree item selection.
   * @param selectedKeys
   * @param info
   */
  onSelect(selectedKeys, info) {
    this.setState({ selectedKeys });
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    return (
      <OutlinePanel className="noselect">
        <Body>
          <Tree
            autoExpandParent={this.state.autoExpandParent}
            expandedKeys={this.state.expandedKeys}
            onCheck={this.onCheck.bind(this)}
            onExpand={this.onExpand.bind(this)}
            onSelect={this.onSelect.bind(this)}
            selectedKeys={this.state.selectedKeys}
            showIcon={this.state.showIcon}
            showLine={this.state.showLine}
          >
            {this.renderTreeNodes(this.state.tree)}
          </Tree>
        </Body>
      </OutlinePanel>
    );
  }

  /**
   * Render the component footer.
   * @returns {JSX.Element}
   */
  renderFooter() {
    return <Footer>Search box</Footer>;
  }

  /**
   * Render the component header.
   * @returns {JSX.Element}
   */
  renderHeader() {
    return <Header /> ;
  }

  /**
   * Render tree nodes.
   * @param data
   * @returns {*}
   */
  renderTreeNodes(data) {
    return data
      .filter(item => !item.hidden)
      .map((item) => {
        if (item.dir === true && Array.isArray(item.children)) {
          const icon = <Folder />;
          return (
            <TreeNode title={item.title} icon={icon} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        // a file or symbolic link
        const icon = this.getIcon(item);
        return <TreeNode {...item} icon={icon} isLeaf dataRef={item} />;
      });
  }
}

/**
 * Map data store state to component properties.
 * @param {object} state - Data store state
 * @returns {object}
 */
const mapStateToProps = state => {
  return {
    application: state.application,
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
