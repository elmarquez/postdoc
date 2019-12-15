import styled from 'styled-components';
import COLOURS from '../../constants/colours';

const View = styled.div`
  align-items: stretch;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;

const Workspace = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-grow: 2;
  overflow: hidden;
`;

export { View, Workspace };
