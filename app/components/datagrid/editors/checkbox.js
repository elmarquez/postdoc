import React from 'react';
import PropTypes from 'prop-types';

/**
 * Custom cell renderer for rendering checkboxes for boolean type values
 * on the grid
 * @return {JSX.Element}
 */
export default function CheckBoxRenderer({ editable, colDef, node, value }) {
  const onCheckBoxChange = () => {
    if (editable) {
      node.setDataValue(colDef.field, !value);
    }
  };

  return <input type="checkbox" checked={value} onChange={onCheckBoxChange} />;
}

CheckBoxRenderer.propTypes = {
  editable: PropTypes.bool,
  colDef: PropTypes.object,
  node: PropTypes.object,
  value: PropTypes.bool
};
