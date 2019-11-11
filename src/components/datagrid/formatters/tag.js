import Tag from "@atlaskit/tag";
import TagGroup from "@atlaskit/tag-group";
import React from "react";

class TagFormatter extends React.Component {
  render() {
    const { value } = this.props;
    let items = [];
    if (Array.isArray(value)) {
      items = value;
    }
    const tags = items.map((t, key) => <Tag text={t} key={key} />);
    return (
      <TagGroup>{tags}</TagGroup>
    )
  }
}

export default TagFormatter;
