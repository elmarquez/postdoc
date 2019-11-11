import Button from '@atlaskit/button';
import React from 'react';
import PropTypes from 'prop-types';
import { MoreHorizontal } from 'styled-icons/feather';
import { ThreeDotMenu } from '../styles';

/**
 * Custom cell renderer for three dot menu.
 * @param {Object} props - Component properties
 * @return {JSX.Element}
 */
function ThreeDotMenuRenderer(props) {
  const { node } = props;
  const onClick = (e) => {
    if (props.hasOwnProperty('onClick')) {
      props.onClick(e, node.data);
    }
  };
  return (
    <ThreeDotMenu height={`${node.rowHeight}px`} onClick={(e) => onClick(e)}>
      <MoreHorizontal />
    </ThreeDotMenu>
  );
}

ThreeDotMenuRenderer.propTypes = {
  colDef: PropTypes.object,
  editable: PropTypes.bool,
  node: PropTypes.object,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default ThreeDotMenuRenderer;
