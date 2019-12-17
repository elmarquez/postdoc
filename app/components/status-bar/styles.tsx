import styled from 'styled-components';

const Group = styled.div`
  display: flex;
  padding: 8px;
`;

const Item = styled.div`
  display: flex;
  padding-right: 8px;

  &:last-child {
    padding-right: 0;
  }
`;

const StatusBar = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  font-size: x-small;
  height: 24px;
  justify-content: space-between;
  max-height: 24px;
  min-height: 24px;
`;

export { StatusBar, Group, Item };
