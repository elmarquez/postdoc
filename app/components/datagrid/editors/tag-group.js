import PropTypes from 'prop-types';
import React from 'react';
import { Tag, TagGroup } from '../styles';

/**
 * Tag group renderer.
 */
class TagGroupEditor extends React.Component {
  /**
   * Render the cell.
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.value || [];
    const tags = data.map((label, key) => {
      return <Tag key={key}>{label}</Tag>;
    });
    return <TagGroup>{tags}</TagGroup>;
  }
}

TagGroupEditor.propTypes = {
  node: PropTypes.object,
  onDeleteClick: PropTypes.func
};

export default TagGroupEditor;
