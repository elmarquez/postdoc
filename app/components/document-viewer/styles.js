import styled from 'styled-components';

const EDGE_THICKNESS = 1;
const TAB_LIST_HEIGHT = 36;

const Tab = styled.div`
    align-items: center;
    background-color: rgb(49, 49, 49);
    border-bottom: ${EDGE_THICKNESS}px solid #444;
    border-left: ${EDGE_THICKNESS}px solid #444;
    border-right: ${EDGE_THICKNESS}px solid transparent;
    border-top: 2px solid transparent;
    color: rgb(215, 215, 215);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 12px;
    justify-content: space-between;
    overflow: hidden;
    padding: 0 12px;
    white-space: nowrap;

    &.active {
        border-bottom: ${EDGE_THICKNESS}px solid transparent;
        border-left: 2px solid cornflowerblue;
    } 
    
    .icon {
      width: 16px;
    }
    .icon.status {
      width: 10px;
    }
`;

const TabList = styled.div`
    align-items: stretch;
    display: flex;
    flex-direction: row;
    height: ${TAB_LIST_HEIGHT}px;
`;

const TabListFiller = styled.div`
    background: transparent;
    border-bottom: ${EDGE_THICKNESS}px solid #444;
    border-left: ${EDGE_THICKNESS}px solid #444;
    flex-grow: 2;
`;

const TabPane = styled.div`
    align-items: stretch;
    display: flex;
    flex-direction: column;
    flex-grow: 2;

    & > div {
        flex-grow: 2;
    }
`;

const Tabs = styled.div`
    align-items: stretch;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
`;

const Viewer = styled.div`
    align-items: stretch;
    display: flex;
    flex-direction: row;
    flex-grow: 2;
`;

export {
    Tab,
    TabList,
    TabListFiller,
    TabPane,
    Tabs,
    Viewer,
};
