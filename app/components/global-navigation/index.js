import React from 'react';
import { Link } from 'react-router-dom';

import { Circle } from 'styled-icons/boxicons-regular/Circle';
import { Figma } from 'styled-icons/boxicons-logos/Figma';
import { Folder } from 'styled-icons/boxicons-regular/Folder';
import { HelpCircle } from 'styled-icons/boxicons-regular/HelpCircle';
import { Hexagon } from 'styled-icons/feather/Hexagon';
import { PlusCircle } from 'styled-icons/boxicons-regular/PlusCircle';
import { Slider } from 'styled-icons/boxicons-regular/Slider';
import { Bacteria, Owl5 } from '../branding';
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
        <Link to="/library">
          <Folder className="icon" />
        </Link>
        <Link to="/projects">
          <Hexagon className="icon" />
        </Link>
        <Link to="/projects">
          <Hexagon className="icon" />
        </Link>
        <Link to="/projects">
          <Hexagon className="icon" />
        </Link>
        <PlusCircle className="icon" />
      </Body>
    );
  }

  renderFooter() {
    return (
      <Footer>
        <Link to="/settings">
          <Slider className="icon" />
        </Link>
      </Footer>
    );
  }

  renderHeader() {
    return (
      <Header>
        <Link to="/home">
          <img className="icon" src={Owl5} />
        </Link>
      </Header>
    );
  }
}

export default GlobalNavigationBarComponent;
