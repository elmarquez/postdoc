import { createGlobalStyle } from "styled-components";
import Inter from 'typeface-inter';

const GlobalStyle = createGlobalStyle`
  html, body {
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    height: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
    width: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  #root {
    align-items: stretch;
    bottom: 0;
    display: flex;
    flex-direction: column;
    left: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
  }
`;

export default GlobalStyle;
