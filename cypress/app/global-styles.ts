import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme";

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  html,body {
      height: 100%;
  }

  body {
      background-color: ${({ theme }) => theme.bg};
  }

  a:link {
      text-decoration: none;
  }

  a:visited {
      text-decoration: none;
  }

  a:hover {
      text-decoration: none;
  }

  a:active {
      text-decoration: none;
  }

  * {
    -webkit-tap-highlight-color: transparent !important;
  }
`;

export default GlobalStyles;
