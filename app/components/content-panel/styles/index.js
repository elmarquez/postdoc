import styled from 'styled-components';

const Body = styled.div`
  flex-grow: 2;
  height: 100%;
`;

const ContentPanel = styled.div`
  align-items: stretch;
  background-color: rgb(250, 250, 250);
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  overflow: hidden;

  & .editor {
    align-items: stretch;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    font-size: 14px;
  }

  & > .body > .editor {
    flex-grow: 2;
    height: 100%;
  }

  & > .body > .editor > .header {
    align-items: stretch;
    display: flex;
    flex-direction: row;
  }

  & > .header {
    align-items: stretch;
    display: flex;
    flex-direction: row;
    height: 40px;
    justify-content: space-between;
    max-height: 40px;
    min-height: 40px;
  }

  & > .header > .tabs {
    align-items: stretch;
    display: flex;
    flex-direction: row;
  }

  & > .header > .tabs > .tab {
    align-items: center;
    display: flex;
    flex-direction: row;
    padding: 0 24px;
  }

  & .CodeMirror {
    height: 100%;
  }

  & .ReactCodeMirror {
    flex-grow: 2;
    height: 100%;
  }
`;

export { Body, ContentPanel };
