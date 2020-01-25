import styled from 'styled-components';

const Editor = styled.div`
    flex-grow: 2;
    height: ${props => props.height ? `${props.height}px` : ''};
    overflow: hidden;
    width: ${props => props.width ? `${props.width}px` : ''};

    .react-codemirror2 {
        height: 100%;

        .CodeMirror {
            height: 100%;
        }
    }
`;

export {
    Editor
};
