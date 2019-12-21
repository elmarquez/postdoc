import React from 'react';

import { Circle } from 'styled-icons/boxicons-regular/Circle';
import { Figma } from 'styled-icons/boxicons-logos/Figma';
import { Folder } from 'styled-icons/boxicons-regular/Folder';
import { HelpCircle } from 'styled-icons/boxicons-regular/HelpCircle';
import { Hexagon } from 'styled-icons/feather/Hexagon';
import { PlusCircle } from 'styled-icons/boxicons-regular/PlusCircle';
import { Slider } from 'styled-icons/boxicons-regular/Slider';
import { Bacteria } from '../branding';
import { Body, Footer, Header, NavigationBar } from './styles';

/**
 * Global navigation bar.
 */
class GlobalNavigationBarComponent extends React.Component {
  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    return (
      <NavigationBar>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </NavigationBar>
    );
  }

  renderBody() {
    return (
      <Body>
        <div to="/library">
          <Folder className="icon" />
        </div>
        <div to="/projects">
          <Hexagon className="icon" />
        </div>
        <div to="/projects">
          <Hexagon className="icon" />
        </div>
        <div to="/projects">
          <Hexagon className="icon" />
        </div>
        <PlusCircle className="icon" />
      </Body>
    );
  }

  renderFooter() {
    return (
      <Footer>
        <div to="/settings">
          <Slider className="icon" />
        </div>
      </Footer>
    );
  }

  renderHeader() {
    return (
      <Header>
        <div to="/home">
          <img className="icon" src={Bacteria} />
        </div>
      </Header>
    );
  }
}

export default GlobalNavigationBarComponent;
