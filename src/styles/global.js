import { createGlobalStyle } from "styled-components";
// eslint-disable-next-line
import Inter from 'typeface-inter';


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body {
    color: rgb(23, 43, 77);
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
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    
    > .switch-wrapper {
      bottom: 0;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      
      > div {
        align-items: stretch;
        bottom: 0;
        display: flex;
        flex-direction: row;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;        
      }
    }
  }
  
  .ag-theme-balham .ag-root {
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
    border: none !important;
    color: rgb(23, 43, 77);
  }
  
  .font-size-s {
    font-size: small;
  }

  .font-size-xs {
    font-size: x-small;
  }
  
  .margin-bottom-l {
    margin-bottom: 32px;
  }

  .margin-bottom-m {
    margin-bottom: 24px;
  }

  .margin-bottom-s {
    margin-bottom: 16px;
  }

  .margin-bottom-xs {
    margin-bottom: 8px;
  }
  
  .margin-top-l {
    margin-top: 32px;
  }

  .margin-top-m {
    margin-top: 24px;
  }

  .margin-top-s {
    margin-top: 16px;
  }

  .margin-top-xs {
    margin-top: 8px;
  }

  .max-width-480 {
    max-width: 480px;
  }
  .max-width-640 {
    max-width: 640px;
  }
  .max-width-800 {
    max-width: 800px;
  }
  .max-width-1024 {
    max-width: 1024px;
  }
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Opera and Firefox */
  }
  .padding-xs {
    padding: 4px;
  }
  .padding-s {
    padding: 8px;
  }
  .padding-m {
    padding: 16px;
  }
  .padding-l {
    padding: 24px;
  }
  .scrollable {
    overflow: auto;
  }
`;

export default GlobalStyle;
