import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import {AuthContextProvider} from "./contexts/AuthContextProvider";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <AuthContextProvider>
            <App/>
        </AuthContextProvider>
    </BrowserRouter>
);
