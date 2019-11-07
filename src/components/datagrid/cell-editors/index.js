import React from 'react';
import CheckBoxEditor from './checkbox';
import DateEditor from './date';
import MultiSelectEditor from './multiselect';
import NumericEditor from './number';
import SelectEditor from './select';
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
  CheckBoxEditor,
  DateEditor,
  MultiSelectEditor,
  NumericEditor,
  SelectEditor,
  TagGroupEditor,
  TextEditor,
  ThreeDotMenuEditor,
  withClickHandler,
};
