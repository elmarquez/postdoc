import FileIcon from "@atlaskit/icon/glyph/file";
import FolderIcon from "@atlaskit/icon/glyph/folder";
import FolderFilledIcon from "@atlaskit/icon/glyph/folder-filled";
import Select from "@atlaskit/select";
import Tree, { mutateTree, moveItemOnTree, TreeItem } from "@atlaskit/tree";
import fs from "fs";
import path from "path";
import React from "react";
import { connect } from "react-redux";
import project from "../../lib/project";
import utils from "../../lib/utils";
import Group from './group';
import Accordion from '../accordion';
import { Body, Footer, Header, ProjectPanel, TreeItem as TI } from "./styles";

import {FilePlus} from 'styled-icons/boxicons-solid/FilePlus';

import { loadIndex, updateIndex } from "../../store/actions/library";

const EVENTS = {};
const TREE = {
  rootId: '1',
  items: {
    '1': {
      id: '1',
      children: ['1-1', '1-2'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'root',
      },
    },
    '1-1': {
      id: '1-1',
      children: ['1-1-1', '1-1-2'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'First parent',
      },
    },
    '1-2': {
      id: '1-2',
      children: ['1-2-1', '1-2-2'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'Second parent',
      },
    },
    '1-1-1': {
      id: '1-1-1',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child one',
      },
    },
    '1-1-2': {
      id: '1-1-2',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child two',
      },
    },
    '1-2-1': {
      id: '1-2-1',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child three',
      },
    },
    '1-2-2': {
      id: '1-2-2',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child four',
      },
    },
  },
};

/**
 * Project explorer. Provides file and entity exploration views, search
 * functions.
 */
class ProjectPanelComponent extends React.Component {
  /**
   * Constructor.
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      path: "/",
      project: { rootId: "empty", items: {} },
      projects: []
    };
  }

  /**
   * Handle life cycle event.
   */
  componentDidMount() {
    this.props.loadIndex("/Users/dmarques/src/fm/paper"); // FIXME get this path from redux
  }

  /**
   * Get file mimetype.
   * @param {Object} f - File
   * @returns {String} mimetype
   */
  getFileItemMimetype(f) {
    return "application/octet-stream";
  }

  onProjectOpen(prj) {
    let self = this;
    if (!prj) {
      return;
    } else {
      project
        .load(prj)
        .then(p => {
          // let data = p.metadata;
          let items = p.files
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
          let tree = { rootId: prj, items };
          let projects = [{ label: path.basename(prj), value: prj }];
          self.setState({ project: tree, projects });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  onTreeItemDoubleClick(node) {
    if (node.item.hasChildren && node.item.isExpanded) {
      node.onCollapse(node.item.id);
    } else if (node.item.hasChildren) {
      node.onExpand(node.item.id);
    } else {
      console.info("publish", node);
      // pubsub.publish(EVENTS.FILE_OPEN, {name: 'name', path: '/path/to/file', node});
    }
  }

  /**
   * Handle tree item collapse.
   * @param {Event} e - Event
   */
  onTreeItemCollapse(e) {
    console.info("collapse", e);
  }

  /**
   *
   * @param {Event} e - Event
   */
  onTreeItemDrag(e) {
    console.info("drag", e);
  }

  /**
   * Handle tree item drop.
   * @param {Event} e - Event
   */
  onTreeItemDrop(e) {
    console.info("drop", e);
  }

  /**
   * Handle tree item expand.
   * @param {Event} e - Event
   */
  onTreeItemExpand(itemId) {
    console.info("expand", itemId);
    const tree = this.state.project;
    this.setState({ tree: mutateTree(tree, itemId, { isExpanded: true }) });
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    console.info('outline', this.props);
    return (
      <ProjectPanel>
        {this.renderBody()}
        {this.renderFooter()}
      </ProjectPanel>
    );
  }

  /**
   * Render body.
   * @returns {XML}
   */
  renderBody() {
    const fileControls = [
      <FilePlus key={0}/>
    ];
    return (
      <Body>
        <Group title={'Project'}>
          <Accordion title={'Files'} controls={fileControls}>
            <Tree
              onCollapse={this.onTreeItemCollapse.bind(this)}
              onExpand={this.onTreeItemExpand.bind(this)}
              renderItem={this.renderTreeItem.bind(this)}
              tree={TREE}
            />
          </Accordion>
          <Accordion title={'Tags'}>
            <Tree
              onCollapse={this.onTreeItemCollapse.bind(this)}
              onExpand={this.onTreeItemExpand.bind(this)}
              renderItem={this.renderTreeItem.bind(this)}
              tree={TREE}
            />
          </Accordion>
          <Accordion title={'Resources'}>
            This is the content of the group.
          </Accordion>
        </Group>
        <Group title={'Library'}>
          <Tree
            onCollapse={this.onTreeItemCollapse.bind(this)}
            onExpand={this.onTreeItemExpand.bind(this)}
            renderItem={this.renderTreeItem.bind(this)}
            tree={TREE}
          />
        </Group>
      </Body>
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
    return (
      <Header>
        <Select
          className="single-select"
          classNamePrefix="react-select"
          options={this.state.projects}
          placeholder="Select project"
        />
      </Header>
    );
  }

  /**
   * Render the file system tree.
   * @returns {XML}
   */
  renderTree() {

    return (
      <Tree
        onCollapse={this.onTreeItemCollapse.bind(this)}
        onExpand={this.onTreeItemExpand.bind(this)}
        renderItem={this.renderTreeItem.bind(this)}
        tree={TREE}
      />
    );
  }

  /**
   * Render a tree item.
   * @param {Object} node - Tree node
   * @returns {XML}
   */
  renderTreeItem(node) {
    return (
      <TI
        key={node.item.id}
        ref={node.provided.innerRef}
        onDoubleClick={() => this.onTreeItemDoubleClick(node)}
      >
        {this.renderTreeItemIcon(node.item)}
        {node.item.data.title}
      </TI>
    );
  }

  /**
   * Render the tree item icon.
   * @param {Object} node - Node metadata
   * @returns {XML}
   */
  renderTreeItemIcon(node) {
    if (node.hasChildren === true && node.isExpanded === true) {
      return <FolderIcon className={"icon"} size={"small"} />;
    } else if (node.hasChildren === true) {
      return <FolderFilledIcon className={"icon"} size={"small"} />;
    } else {
      return <FileIcon className={"icon"} size={"small"} />;
    }
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
  loadIndex: (fp) => dispatch(loadIndex(fp)),
  updateIndex: (fp) => dispatch(updateIndex(fp))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPanelComponent);
