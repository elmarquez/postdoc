import styled from 'styled-components';
import { CONTENT_PANEL_WIDTH, TAB_PANEL_WIDTH } from '../constants';

const Body = styled.div`
  flex-grow: 2;
  overflow: scroll;
`;

/**
 * The content panel is a container for palettes. It can be displayed inline
 * with the toolbar, in which case it squeezes the view content to the side.
 * Or, it can float on top of the view content, leaving the view as it is.
 */
const ContentPanel = styled.div`
  align-items: stretch;
  background-color: rgb(242, 245, 245);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  max-width: ${CONTENT_PANEL_WIDTH}px;
  min-width: ${CONTENT_PANEL_WIDTH}px;
  overflow: auto;
  width: ${CONTENT_PANEL_WIDTH}px;

  & .floating {
    bottom: 0;
    position: fixed;
    right: ${TAB_PANEL_WIDTH}px;
    top: 0;
    z-index: 500;
  }
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: small;
  height: 32px;
  justify-content: space-between;
`;

const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid #BDC3C7;
  display: flex;
  flex-direction: row;
  font-size: small;
  height: 32px;
  justify-content: space-between;
  padding: 0 8px;
`;

export { Body, ContentPanel, Footer, Header };
