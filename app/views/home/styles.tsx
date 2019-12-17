import styled from 'styled-components';
import COLOURS from '../../constants/colours';

const Card = styled.div`
  background-color: white;
  border-radius: 4px;
  margin-bottom: 8px;
  padding: 8px 16px;
`;

const Home = styled.div`
  background-colour: ${COLOURS.BACKGROUND_LIGHT_GRAY};
  flex-grow: 2;
  overflow: scroll;
  padding: 32px;
`;

export { Card, Home };
