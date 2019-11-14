import styled from 'styled-components';
import COLOURS from '../../../constants/colours';

const Home = styled.div`
  background-color: ${COLOURS.BACKGROUND};
  color: white;
  flex-grow: 2;
  overflow: scroll;
  padding: 32px;
  
  h2 {
    color: white;
  }
`;

export {
  Home
};
