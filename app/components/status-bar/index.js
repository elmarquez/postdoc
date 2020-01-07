/* eslint react/no-unused-state:0 */
import React from 'react';
import { DownloadCloud } from 'styled-icons/remix-fill/DownloadCloud';
import { GitCommit } from 'styled-icons/remix-line/GitCommit';
import { Group, Item, Separator, StatusBar } from './styles';

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
          <Separator />
          <Item>master</Item>
          <Item>Fetch</Item>
          <Item>GitHub</Item>
          <Item>
            <GitCommit style={{marginRight: 4, width:18}} />
            <span>Git (2)</span>
          </Item>
          <Separator />
          <Item>
            <DownloadCloud style={{marginRight: 4, width:12}}/>
            <a>1 update <span className="ti-github" /></a>
          </Item>
        </Group>
      </StatusBar>
    );
  }
}

export default StatusBarComponent;
