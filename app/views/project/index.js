import React from 'react';
import ContentPanel from '../../components/content-panel';

class ProjectContainer extends React.Component {
  onUpdateIndex() {}

  render() {
    return <ContentPanel onUpdateIndex={() => this.onUpdateIndex()} />;
  }
}

export default ProjectContainer;
