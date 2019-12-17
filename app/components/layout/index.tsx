import styled from 'styled-components';

const FlexColumn = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  flex-grow: ${(props:any) => (props.flexGrow ? props.flexGrow : 1)};
`;

const FlexRow = styled.div`
  align-items: ${(props:any) => (props.alignItems ? props.alignItems : 'center')};
  display: flex;
  flex-direction: row;
  flex-grow: ${props => (props.flexGrow ? props.flexGrow : 1)};
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'space-between'};
  margin: ${props => (props.margin ? props.margin : '')};
  padding: ${props => (props.padding ? props.padding : '')};
`;

export { FlexColumn, FlexRow };
