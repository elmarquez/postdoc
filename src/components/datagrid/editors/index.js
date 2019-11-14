import React from 'react';
import CheckBox from './checkbox';
import DateTime from './date';
import MultiSelect from './multiselect';
import Number from './number';
import Select from './select';
import Tag from './tag';
import TagGroupEditor from './tag-group';
import TextEditor from './text';
import ThreeDotMenuEditor from './three-dot-menu';

/**
 * Render the cell with the click handler.
 * @param {function} Component - Component rendering function
 * @param {function} onClick - Click handler
 * @return {function}
 */
function withClickHandler(Component, onClick) {
  return function(props) {
    return <Component {...props} onClick={(e, data) => onClick(e, data)} />;
  };
}

export {
  CheckBox,
  DateTime,
  MultiSelect,
  Number,
  Select,
  TagGroupEditor,
  TextEditor,
  ThreeDotMenuEditor,
  withClickHandler,
};
