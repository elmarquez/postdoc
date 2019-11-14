import FileIcon from "@atlaskit/icon/glyph/file";
import FolderIcon from "@atlaskit/icon/glyph/folder";
import FolderFilledIcon from "@atlaskit/icon/glyph/folder-filled";
import Tree, { mutateTree, moveItemOnTree, TreeItem } from "@atlaskit/tree";
import React from 'react';
import { connect } from 'react-redux';
import {FilePlus} from 'styled-icons/boxicons-solid/FilePlus';
import {PrimitiveDot} from "styled-icons/octicons/PrimitiveDot/PrimitiveDot";

import Accordion from '../../components/accordion';
import ContentPanel from '../../components/content-panel';
import EdgePanel from '../../components/edge-panel';
import GitPanel from '../../components/git-panel';
import { FlexRow } from '../../components/layout';
import { Collection, Group, Panel as OutlinePanel } from '../../components/outline-panel';
import PropertiesPanel from '../../components/properties-panel';
import ToolsPanel from '../../components/tools-panel';
import { loadApplicationState } from "../../store/actions/application";
import { writeIndex } from "../../store/actions/library";


/**
 * Library view. A library is a collection of research resources owned by a
 * single user. Users are allowed one library instance.
 *
 * Notes, bibliographies, documents,
 * Each document has an associated bibliographic entry.
 */
class LibraryContainer extends React.Component {
  onClick(e) {
    console.info('on click', e);
  }

  onDocumentSelected(doc) {
    console.info('document selected', doc);
  }

  /**
   * Handle library file record change.
   * @param {Number} index - Index of file in library files collection
   * @param {Object} data - Change event
   */
  onFileUpdated(index, data) {
    console.info('file updated', index, data);
    // const library = this.props.library;
    // this.props.writeIndex(this.props.app.library, {});
  }

  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    const fileControls = [
      <FilePlus key={0}/>
    ];
    const fileTypes = [
      {icon: <FilePlus/>, label: 'PDF', onClick: (e) => this.onClick(e)},
      {icon: <FilePlus/>, label: 'Image', onClick: (e) => this.onClick(e)},
      {icon: <FilePlus/>, label: 'JSON', onClick: (e) => this.onClick(e)},
      {icon: <FilePlus/>, label: 'Text', onClick: (e) => this.onClick(e)},
    ];
    const tags = [
      {icon: <PrimitiveDot/>, label: 'PDF', onClick: (e) => this.onClick(e)},
      {icon: <PrimitiveDot/>, label: 'Image', onClick: (e) => this.onClick(e)},
      {icon: <PrimitiveDot/>, label: 'JSON', onClick: (e) => this.onClick(e)},
      {icon: <PrimitiveDot/>, label: 'Text', onClick: (e) => this.onClick(e)},
    ];
    const dates = [
      {icon: <PrimitiveDot/>, label: '2019', onClick: (e) => this.onClick(e)},
      {icon: <PrimitiveDot/>, label: '2018', onClick: (e) => this.onClick(e)},
      {icon: <PrimitiveDot/>, label: '2017', onClick: (e) => this.onClick(e)},
      {icon: <PrimitiveDot/>, label: '2016', onClick: (e) => this.onClick(e)},
    ];
    const panels = [
      {title: "Properies", panel: (<PropertiesPanel />) },
      {title: "Tools", panel: (<ToolsPanel />) },
      {title: "Git", panel: (<GitPanel />) },
    ];
    return (
      <FlexRow alignItems={'stretch'} flexGrow={2}>
        <OutlinePanel>
          <Group title={'Files'}>
            <Collection title={'File Types'} items={fileTypes} />
            <Collection title={'Tags'} items={tags} className={'tags'} />
            <Collection title={'Date'} items={dates} />
          </Group>
          <Group title={'Resources'}>
            <Collection title={'Resources'} items={tags}>
              <Accordion title={'Notes'}>
                This is the content of the group.
              </Accordion>
            </Collection>
          </Group>
        </OutlinePanel>
        <ContentPanel
          {...this.props.library}
          onDocumentSelected={(e) => this.onDocumentSelected(e)}
          onFileUpdated={(index, data) => this.onFileUpdated(index, data)}
        />
        <EdgePanel panels={panels} />
      </FlexRow>
    );
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
  writeIndex: (fp, data) => dispatch(writeIndex(fp, data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryContainer);
