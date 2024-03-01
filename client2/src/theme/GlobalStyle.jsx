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
      --background : ${themes => themes.theme.colors.colorBg};
      --main : ${themes => themes.theme.colors.colorMain};
      --main-font : ${themes => themes.theme.colors.colorMainFont};
      --sky-blue : ${themes => themes.theme.colors.colorSkyBlue};
      --blue : ${themes => themes.theme.colors.colorBlue};
      --disabled : ${themes => themes.theme.colors.colorDisabled};
      --gray : ${themes => themes.theme.colors.colorGray};
      --dark-gray : ${themes => themes.theme.colors.colorDarkGray};
      --white : ${themes => themes.theme.colors.colorWhite};
      --red : ${themes => themes.theme.colors.colorRed};
      --di-red : ${themes => themes.theme.colors.colorDiRed};
      --shadow : ${themes => themes.theme.colors.colorShadow};
      --dark-shadow : ${themes => themes.theme.colors.colorDarkShadow};
  }
  
`;


export default GlobalStyle;