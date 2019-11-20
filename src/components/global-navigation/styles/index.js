import styled from 'styled-components';
import COLOURS from '../../../constants/colours';

const Body = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  justify-content: center;
  padding: 16px 0;
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  height: 124px;
  justify-content: flex-end;
  max-height: 124px;
  min-height: 124px;
  padding: 16px 0;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  height: 64px;
  max-height: 64px;
  min-height: 64px;
  padding: 16px 0;
`;

const NavigationBar = styled.div`
  align-items: stretch;
  background-color: rgba(18, 13, 99, 0.2);
  border-right: rgba(0,0,0,0.4);
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 64px;
  min-width: 64px;
  width: 64px;
  
  a {
    outline: none;
  }
  .icon {
    fill: rgba(255,255,255,0.5);
    margin-bottom: 8px;
    width: 32px;
  }
`;

export {
  Body,
  Footer,
  Header,
  NavigationBar
};
