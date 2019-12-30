import styled from 'styled-components';

const EDGE_THICKNESS = 1;
const TAB_LIST_HEIGHT = 36;

const TabListFiller = styled.div`
    background: transparent;
    border-bottom: ${EDGE_THICKNESS}px solid #444;
    border-left: ${EDGE_THICKNESS}px solid #444;
    flex-grow: 2;
`;

const Tab = styled.div`
    align-items: center;
    border-bottom: ${EDGE_THICKNESS}px solid #444;
    border-left: ${EDGE_THICKNESS}px solid #444;
    border-right: ${EDGE_THICKNESS}px solid transparent;
    border-top: 2px solid transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 16px;

    &.active {
        border-bottom: ${EDGE_THICKNESS}px solid transparent;
        border-top: 2px solid cornflowerblue;
    } 
`;

const TabList = styled.div`
    align-items: stretch;
    display: flex;
    flex-direction: row;
    height: ${TAB_LIST_HEIGHT}px;
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

export {
    Tab,
    TabList,
    TabListFiller,
    TabPane,
    Tabs
};
