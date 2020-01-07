import styled from 'styled-components';

const Group = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 8px;
`;

const Item = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 0 4px;

  &:last-child {
    padding-right: 0;
  }
`;

const Separator = styled.div`
  border-left: 1px solid rgba(0,0,0,0.1);
  border-right: 1px solid rgba(255,255,255,0.1);
  height: 100%;
  margin: 0 8px;
  width: 2px;
`;

const StatusBar = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: nowrap;
  font-size: 12px;
  justify-content: space-between;
  padding: 0 4px;
`;

export { Group, Item, Separator, StatusBar };
