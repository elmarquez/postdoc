import styled from 'styled-components';
import COLOURS from '../../../constants/colours';

const Body = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  justify-content: flex-center;
  padding: 16px 0;
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  justify-content: flex-end;
  padding: 16px 0;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  padding: 16px 0;
`;

const NavigationBar = styled.div`
  align-items: stretch;
  background-color: ${COLOURS.BACKGROUND};
  border-right: 1px solid #CCC;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48px;
  
  a {
    outline: none;
  }
  .icon {
    fill: red;
    margin-bottom: 8px;
    width: 22px;
  }
`;

export {
  Body,
  Footer,
  Header,
  NavigationBar
};
