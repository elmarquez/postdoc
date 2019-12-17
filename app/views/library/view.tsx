import * as React from 'react';
import { connect } from 'react-redux';
import { FilePlus } from 'styled-icons/boxicons-solid/FilePlus';
import { PrimitiveDot } from 'styled-icons/octicons/PrimitiveDot/PrimitiveDot';

import Accordion from '../../components/accordion';
import ContentPanel from '../../components/content-panel';
import EdgePanel from '../../components/edge-panel';
import GitPanel from '../../components/git-panel';
import { FlexRow } from '../../components/layout';
import {
  Collection,
  Group,
  Panel as OutlinePanel
} from '../../components/outline-panel';
import PropertiesPanel from '../../components/properties-panel';
import ToolsPanel from '../../components/tools-panel';
import { loadIndex, writeIndex } from '../../store/actions/library';

export interface LibraryProps {
  app: {
    data: any,
    error: Boolean,
    isPending: Boolean
  },
  library: {
    data: any,
    error: Boolean,
    isPending: Boolean
  },
  loadIndex: Function,
  profile: {
    data: any,
    error: Boolean,
    isPending: Boolean
  },
  project: {
    data: any,
    error: Boolean,
    isPending: Boolean
  },
  writeIndex: Function
};

type LibraryState = {
  isLibraryDefined: false
};

/**
 * Library view. A library is a collection of research resources owned by a
 * single user. Users are allowed one library instance.
 *
 * Notes, bibliographies, documents,
 * Each document has an associated bibliographic entry.
 */
class LibraryContainer extends React.Component<LibraryProps, LibraryState> {

  /**
   * Handle component lifecycle event.
   */
  componentDidMount() {
    const profile = this.props.profile;
    if (profile.data && profile.data.library !== null) {
      this.props.loadIndex(profile.data.library);
    }
  }

  /**
   * Handle component lifecycle event.
   * @param {Object} prev - Previous component properties
   */
  componentDidUpdate(prevProps) {
    // console.info('component did update', prev, next);
  }

  /**
   * Handle filter click.
   * @param {Event} e - Event
   * @param {object} node - Data
   */
  onClick(e, node) {
    console.info('on click', e, node);
  }

  /**
   * Handle document selection.
   * @param {Object} doc - Document
   */
  onDocumentSelected(doc) {
    console.info('document selected', doc);
  }

  /**
   * Handle library file record change.
   * @param {Number} index - Index of file in library files collection
   * @param {Object} data - Change event
   */
  onFileUpdated(index, data) {
    const library = this.props.library;
    const files = [].concat(library.data.files);
    files[index] = data;
    const nextstate = Object.assign({}, library.data, { files });
    this.props.writeIndex(this.props.profile.data.library, nextstate); // TODO move indexing into write option
  }

  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    if (
      this.props.profile &&
      this.props.profile.data &&
      this.props.profile.data.library !== null
    ) {
      return this.renderFileCollectionView();
    } else {
      return this.renderPlaceholder();
    }
  }

  /**
   * Render the file collection view.
   * @returns {JSX.Element}
   */
  renderFileCollectionView() {
    const { mimetypes, tags, years } = this.props.library.data;
    // const { files, mimetypes, tags, years } = this.props.library.data;
    // const fileControls = [<FilePlus key={0} />];
    const fileItems = mimetypes.map(t => {
      return { icon: <FilePlus />, label: t, onClick: e => this.onClick(e, t) };
    });
    const tagItems = tags.map(t => {
      return {
        icon: <PrimitiveDot />,
        label: t,
        onClick: e => this.onClick(e, t)
      };
    });
    const yearItems = years.map(d => {
      return {
        icon: <PrimitiveDot />,
        label: d,
        onClick: e => this.onClick(e, d)
      };
    });
    const panels = [
      { title: 'Properies', panel: <PropertiesPanel /> },
      { title: 'Tools', panel: <ToolsPanel /> },
      { title: 'Git', panel: <GitPanel /> }
    ];
    return (
      <FlexRow alignItems={'stretch'} flexGrow={2}>
        <OutlinePanel>
          <Group title={'Files'}>
            <Collection title={'Types'} items={fileItems} />
            <Collection title={'Tags'} items={tagItems} className={'tags'} />
            <Collection title={'Date'} items={yearItems} />
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
          onDocumentSelected={e => this.onDocumentSelected(e)}
          onFileUpdated={(index, data) => this.onFileUpdated(index, data)}
        />
        <EdgePanel panels={panels} />
      </FlexRow>
    );
  }

  /**
   * Render the placeholder.
   * @return {JSX.Element}
   */
  renderPlaceholder() {
    return (
      <div>
        Library placeholder should provide some kind of directory selection
        dialog
      </div>
    );
  }
}

/**
 * 
 * @param state 
 */
const mapStateToProps = (state) => {
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
  writeIndex: () => dispatch(writeIndex())
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer);
