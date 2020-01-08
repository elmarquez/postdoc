import Tag from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';
import React from 'react';

const AuthorsFormatter = (props) => {
  let items = [];
  if (Array.isArray(props.value)) {
    items = props.value;
  }
  const authors = items.map((item) => item.name).join(', ');
  return <span>{authors}</span>;
}

export default AuthorsFormatter;
