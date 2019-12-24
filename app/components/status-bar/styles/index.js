import styled from 'styled-components';

const Group = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 8px;
`;

const Item = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-right: 8px;

  &:last-child {
    padding-right: 0;
  }
`;

const StatusBar = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: nowrap;
  font-size: x-small;
  justify-content: space-between;
`;

export { StatusBar, Group, Item };
