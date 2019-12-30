import { Dropdown, Menu, Tree } from 'antd';
import { equals } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { File } from 'styled-icons/fa-solid/File';
import { Folder } from 'styled-icons/fa-solid/Folder';
import { Body, Footer, Header, OutlinePanel } from './styles';
import { loadIndex, openFile, updateIndex } from '../../store/actions/project';
import Project from '../../lib/project';

const { DirectoryTree, TreeNode } = Tree;
const DOUBLE_CLICK_TIMEOUT = 200;

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
    this.clickTarget = null;
    this.doubleClickTimeout = null;
    this.state = {
      autoExpandParent: true,
      expandedKeys: [],
      selectedKeys: [],
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
   * Handle tree item expand event.
   * @param {array} expandedKeys - List of expanded tree nodes
   */
  onExpand(expandedKeys) {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({ autoExpandParent: false, expandedKeys });
  }

  onNodeContextClick(e) {
    console.info('node context click', e);
  }

  /**
   * Handle tree item selection.
   * @param {array} selectedKeys - Selected node keys
   * @param {Event} e - Click event
   */
  onSelect(selectedKeys, e) {
    const self = this;
    if (self.doubleClickTimeout !== null && self.clickTarget === e.node.key) {
      this.props.openFile(e.node.props.eventKey);
    } else {
      self.clickTarget = e.node.key;
      self.doubleClickTimeout = setTimeout(() => {
        self.clickTarget = null;
        self.doubleClickTimeout = null;
      }, DOUBLE_CLICK_TIMEOUT);
    }
    this.setState({ selectedKeys });
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    const icon = (<Folder style={{width:16}} />);
    return (
      <OutlinePanel className="noselect">
        <Body>
          <DirectoryTree
            defaultExpandAll
            multiple
            onExpand={this.onExpand.bind(this)}
            onRightClick={this.onNodeContextClick.bind(this)}
            onSelect={this.onSelect.bind(this)}
            >
            {this.renderTreeNodes(this.state.tree)}
          </DirectoryTree>
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
    /* eslint no-else-return: 0 */
    return data
      .filter(item => !item.hidden)
      .map((item) => {
        const { key, title } = item;
        if (item.dir === true && Array.isArray(item.children)) {
          const icon = <Folder />;
          return (
            <TreeNode key={key} title={title}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        } else {
          // a file or symbolic link
          // const icon = this.getIcon(item);
          return <TreeNode key={key} title={title} isLeaf />;
        }
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
const mapDispatchToProps = {
  loadIndex,
  openFile,
  updateIndex
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutlinePanelComponent);
