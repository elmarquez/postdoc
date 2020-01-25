import styled from 'styled-components';

const Group = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  padding: 8px;
`;

const Item = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  padding: 0 4px;
  text-overflow: ellipsis;
  white-space: nowrap;

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
  height: 36px;
  justify-content: space-between;
  max-height: 36px;
  padding: 0 4px;
`;

export { Group, Item, Separator, StatusBar };
