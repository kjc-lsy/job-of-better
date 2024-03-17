
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContextProvider";

import "assets/scss/black-dashboard-react.scss";
/*import "assets/demo/demo.css";*/
import "assets/plugins/nucleo/css/nucleo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./contexts/ThemeWrapper";
import BackgroundColorWrapper from "./contexts/BackgroundColorWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <AuthContextProvider>
          <App/>
        </AuthContextProvider>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
