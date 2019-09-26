import styled from 'styled-components';

const FlexColumn = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  align-items: ${(props) => props.alignItems ? props.alignItems : 'center'};
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : 'space-between'};
  margin: ${(props) => props.margin ? props.margin : ''};
  padding: ${(props) => props.padding ? props.padding : ''};
`;


export {
  FlexColumn,
  FlexRow,
};
