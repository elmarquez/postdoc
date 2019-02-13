import {remote} from 'electron';
import fs from 'fs';
import path from 'path';
import React from 'react';
import Tree, {TreeItem} from '@atlaskit/tree';
import utils from "../../lib/utils";

const {EVENTS, pubsub} = remote.getGlobal('pubsub');

/**
 * Project explorer. Provides file and entity exploration views, search
 * functions.
 */
class ProjectPanel extends React.Component {
  /**
   * Constructor.
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      projects: [],
      items: []
    };
  }

  /**
   * Handle life cycle event.
   */
  componentDidMount () {
    console.log(pubsub);
    pubsub.subscribe(EVENTS.PROJECT_OPEN, function (a,b) {
      console.log(a,b)
    });
    this.updateFileSystemTree();
  }

  /**
   * Get file mimetype.
   * @param {Object} f - File
   * @returns {String} mimetype
   */
  getFileItemMimetype (f) {
    return "application/octet-stream";
  }

  /**
   * Handle tree item collapse.
   * @param {Event} e - Event
   */
  onTreeItemCollapse (e) {}

  /**
   *
   * @param {Event} e - Event
   */
  onTreeItemDrag (e) {}

  /**
   * Handle tree item drop.
   * @param {Event} e - Event
   */
  onTreeItemDrop (e) {}

  /**
   * Handle tree item expand.
   * @param {Event} e - Event
   */
  onTreeItemExpand (e) {}

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    return (
      <div className={'project panel'}>
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }

  renderBody () {
    return (
      <div className={'body'}>
        {this.renderTree()}
      </div>
    );
  }

  renderHeader () {
    if (this.state.project) {
      return (
        <div className={'header'}>
          <span className={'project name'}>{this.state.project.name}</span>
          <span className={'ti-angle-down'}></span>
        </div>
      )
    } else {
      return (
        <div className={'header'}>
          <span className={'project name'}>&nbsp;</span>
          <span className={'ti-angle-down'}></span>
        </div>
      )
    }
  }

  /**
   * Render the file system tree.
   * @returns {XML}
   */
  renderTree() {
    let tree = {rootId:this.state.project ? this.state.project.path : 'empty', items:this.state.items};
    return (
      <Tree renderItem={this.renderTreeItem.bind(this)} tree={tree}/>
    );
  }

  /**
   * Render a tree item.
   * @param {Object} node - Tree node
   * @returns {XML}
   */
  renderTreeItem(node) {
    return (
      <div key={node.item.id} ref={node.provided.innerRef}>
        {this.renderTreeItemIcon(node.item.data)}
        {node.item.data.title}
      </div>
    );
  }

  /**
   * Render the tree item icon.
   * @param {Object} node - Node metadata
   * @returns {XML}
   */
  renderTreeItemIcon(node) {
    return (
      <span className={"ti-file"}> </span>
    );
  }

  /**
   * Update file system tree. The current implementation loads the tree in
   * full.
   */
  updateFileSystemTree () {
    let self = this;
    let files = [];
    if (this.state.project) {
      // TODO check to see that the path exists
      files = fs
        .readdirSync(this.state.project.path, {encoding: 'utf8', withFileTypes: true})
        .map(f => {
          let p = path.join(self.state.project.path, f)
          let s = fs.statSync(p);
          return {
            hidden: f.length > 0 ? f[0] === '.' : false,
            mimetype: this.getFileItemMimetype(),
            path: p,
            name: f,
            dir: s.isDirectory()
          };
        })
        .map(f => {
          return {
            children: [],
            data: f,
            hasChildren: f.dir,
            id: f.path,
            isChildrenLoading: false,
            isExpanded: false
          };
        });
    }
    // return file system tree
    this.setState({items: files});
  }
}

module.exports = ProjectPanel;
