import styled from 'styled-components';

const Editor = styled.div`
    flex-grow: 2;

    & > .ReactCodeMirror {
        height: 100%;

        & > .CodeMirror {
            height: 100%;
        }
    }
`;

export {
    Editor
};
