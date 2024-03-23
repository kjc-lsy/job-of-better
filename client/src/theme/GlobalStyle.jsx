import {createGlobalStyle} from "styled-components";

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
      --bg-color : ${themes => themes.theme.backColor};
      --bg-title-color : ${themes => themes.theme.backTitleColor};
      --font-color : ${themes => themes.theme.fontColor};
      --label-color : ${themes => themes.theme.labelColor};
      --border-color: ${themes => themes.theme.border};
  }
  
`;


export default GlobalStyle;