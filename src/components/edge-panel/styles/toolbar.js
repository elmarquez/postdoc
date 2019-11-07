import styled from 'styled-components';
import { TAB_PANEL_WIDTH } from '../constants';

const Body = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Tab = styled.div`
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  font-size: small;
  justify-content: center;
  line-height: 30px;
  padding: 12px 0;
  text-orientation: mixed;
  writing-mode: vertical-rl;

  user-select: none;
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */

  &.selected {
    background-color: rgba(0, 0, 0, 0.05);
    //background-color: rgba(230, 230, 230);
    //border-left: 2px solid navy;
  }

  & > .icon {
    margin-bottom: 4px;

    & > span {
      transform: rotate(90deg);
    }
  }
`;

const Tabs = styled.div`
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Toolbar = styled.div`
  align-items: stretch;
  background-color: rgba(0, 0, 0, 0.05);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: ${TAB_PANEL_WIDTH}px;
  min-width: ${TAB_PANEL_WIDTH}px;
  width: ${TAB_PANEL_WIDTH}px;
`;

export { Body, Footer, Header, Tab, Tabs, Toolbar };
