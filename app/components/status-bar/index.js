import React from 'react';
import { StatusBar, Group, Item } from './styles';

/**
 * Application status bar.
 */
class StatusBarComponent extends React.Component {
  /**
   * Constructor.
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      cursor: [1, 1],
      filename: null
    };
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    return (
      <StatusBar>
        <Group>
          <Item>document/summary.md</Item>
          <Item>1:1</Item>
        </Group>
        <Group>
          <Item>LF</Item>
          <Item>UTF-8</Item>
          <Item>Markdown</Item>
          <Item>master</Item>
          <Item>Fetch</Item>
          <Item>GitHub</Item>
          <Item>Git (201)</Item>
          <Item>
            1 update <span className="ti-github" />
          </Item>
        </Group>
      </StatusBar>
    );
  }
}

export default StatusBarComponent;
