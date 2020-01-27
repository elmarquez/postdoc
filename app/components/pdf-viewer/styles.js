import styled from 'styled-components';

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 4px 8px;
`;

const Footer = styled.div`
  height: 36px;
`;

const Viewer = styled.div`
  align-items: stretch;
  background-color: rgb(49, 49, 49);
  color: rgb(215, 215, 215);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  .document {
    flex-grow: 2;
    overflow: auto;
  }
`;

export { Controls, Footer, Viewer };
