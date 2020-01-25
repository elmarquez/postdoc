import styled from 'styled-components';

const FlexColumn = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  flex-grow: ${p => (p.flexGrow ? p.flexGrow : 1)};
  overflow: ${p => (p.overflow ? p.overflow : 'hidden')};
  width: ${p => (p.width ? `${p.width}px` : '')};
`;

const FlexRow = styled.div`
  align-items: ${p => (p.alignItems ? p.alignItems : 'center')};
  display: flex;
  flex-direction: row;
  flex-grow: ${p => (p.flexGrow ? p.flexGrow : 1)};
  justify-content: ${p => p.justifyContent ? p.justifyContent : 'space-between'};
  margin: ${p => (p.margin ? p.margin : '')};
  overflow: ${p => (p.overflow ? p.overflow : 'hidden')};
  padding: ${p => (p.padding ? p.padding : '')};
`;

export { FlexColumn, FlexRow };
