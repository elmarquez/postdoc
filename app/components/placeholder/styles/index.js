import styled from 'styled-components';

const Placeholder = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Image = styled.div`
  margin-bottom: 8px;
  width: 24px;
`;

const Body = styled.div`
  padding: 12px 0 0 0;
  
  h1, h2, h3 {
    color: rgba(0,0,0,0.6);
  }
  
  .command {
    border: 2px solid rgba(0,0,0,0.3);
    border-radius: 3px;
    padding: 1px 3px;
  }
`;

const Title = styled.div``;

export { Image, Body, Placeholder, Title };
