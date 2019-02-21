import FileIcon from '@atlaskit/icon/glyph/file';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import FolderFilledIcon from '@atlaskit/icon/glyph/folder-filled';
import Select from '@atlaskit/select';
import Tree, {TreeItem} from '@atlaskit/tree';
import {remote} from 'electron';
import fs from 'fs';
import log from 'electron-log';
import path from 'path';
import project from '../../lib/project';
import React from 'react';


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
      path: '/',
      project: {rootId:'empty', items: {}},
      projects: []
    };
  }

  /**
   * Handle life cycle event.
   */
  componentDidMount () {
    pubsub.subscribe(EVENTS.PROJECT_OPEN, this.onProjectOpen.bind(this));
  }

  /**
   * Get file mimetype.
   * @param {Object} f - File
   * @returns {String} mimetype
   */
  getFileItemMimetype (f) {
    return "application/octet-stream";
  }

  onProjectOpen (prj) {
    let self = this;
    if (!prj) {
      return;
    } else {
      project.load(prj).then(p => {
        // let data = p.metadata;
        let items = p
          .files
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
              }
            };
          })
          .reduce((m, f) => {
            m[f.id] = f;
            return m;
          }, {})
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
        let tree = {rootId: prj, items};
        let projects = [
          {label: path.basename(prj), value: prj}
        ];
        self.setState({project: tree, projects});
      })
      .catch(err => {
          console.error(err);
        });
    }
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

  /**
   * Render body.
   * @returns {XML}
   */
  renderBody () {
    return (
      <div className={'body'}>
        {this.renderTree()}
      </div>
    );
  }

  /**
   * Render header.
   * @returns {XML}
   */
  renderHeader () {
    return (
      <div className={'header'}>
        <Select
          className="single-select"
          classNamePrefix="react-select"
          options={this.state.projects}
          placeholder="Select project"/>
      </div>
    )
  }

  /**
   * Render the file system tree.
   * @returns {XML}
   */
  renderTree () {
    return (
      <Tree onCollapse={this.onTreeItemCollapse.bind(this)}
            onExpand={this.onTreeItemExpand.bind(this)}
            renderItem={this.renderTreeItem.bind(this)}
            tree={this.state.project} />
    );
  }

  /**
   * Render a tree item.
   * @param {Object} node - Tree node
   * @returns {XML}
   */
  renderTreeItem(node) {
    return (
      <div className={'treeitem'} key={node.item.id} ref={node.provided.innerRef}>
        {this.renderTreeItemIcon(node.item)}
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
    if (node.hasChildren === true && node.isExpanded === true) {
      return (<FolderIcon className={'icon'} size={'small'} />);
    } else if (node.hasChildren === true) {
      return (<FolderFilledIcon className={'icon'} size={'small'} />);
    } else {
      return (<FileIcon className={'icon'} size={'small'} />);
    }
  }
}

module.exports = ProjectPanel;
