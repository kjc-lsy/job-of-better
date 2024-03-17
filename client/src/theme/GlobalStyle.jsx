import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  :root {
      --main-color : ${themes => themes.theme.colors};
      --main-bgColor : ${themes => themes.theme.bgColor};
  }
  
`;


export default GlobalStyle;