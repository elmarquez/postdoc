import React from 'react';
import {Link} from 'react-router-dom';
import { Body, Footer, Header, NavigationBar } from './styles';

import { Circle } from 'styled-icons/boxicons-regular/Circle';
import { Figma } from 'styled-icons/boxicons-logos/Figma';
import { Folder } from 'styled-icons/boxicons-regular/Folder';
import { HelpCircle } from 'styled-icons/boxicons-regular/HelpCircle';
import { PlusCircle } from 'styled-icons/boxicons-regular/PlusCircle';
import { Slider } from 'styled-icons/boxicons-regular/Slider';

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
        <Link to={'/library'}>
          <Folder className={'icon'} />
        </Link>
        <Link to={'/projects'}>
          <Circle className={'icon'} />
        </Link>
        <Link to={'/projects'}>
          <Circle className={'icon'} />
        </Link>
        <Link to={'/projects'}>
          <Circle className={'icon'} />
        </Link>
        <PlusCircle className={'icon'} />
      </Body>
    );
  }

  renderFooter() {
    return (
      <Footer>
        <Link to={'/settings'}>
          <Slider className={'icon'} />
        </Link>
        <Link to={'/help'}>
          <HelpCircle className={'icon'} />
        </Link>
      </Footer>
    );
  }

  renderHeader() {
    return (
      <Header>
        <Link to={'/home'}>
          <Figma className={'icon'} />
        </Link>
      </Header>

    );
  }
}

export default GlobalNavigationBarComponent;
