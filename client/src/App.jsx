import {Navigate, Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import UserLayout from "./layouts/User";
import React, {useEffect, useState} from "react";

import {ThemeProvider} from "styled-components";
import {primary, green,pink} from "./theme/theme";
import GlobalStyle from "./theme/GlobalStyle";
import {BackgroundColorContext} from "./contexts/BackgroundColorContext";
import {ThemeModeButton} from "./theme/Button";

const App = () => {

    const localThemeMode = window.localStorage.getItem("back-color" || "primary");
    const [themeMode, setThemeMode] = useState(localThemeMode);

    let theme = themeMode === "primary" ? primary : themeMode === "pink" ? pink : green ;

    useEffect (() => {
        theme = window.localStorage.getItem("back-color");
    }, []);

    /*const toggleTheme = () => {
        if (themeMode === "lightTheme") {
            setThemeMode("darkTheme");
            window.localStorage.setItem("theme", "darkTheme");
        } else {
            setThemeMode("lightTheme");
            window.localStorage.setItem("theme", "lightTheme");
        }
    };*/

    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                {/*<ThemeModeButton toggleTheme={toggleTheme} themeMode={themeMode}/>*/}
                <Routes>
                    <Route path="/admin/*" element={<AdminLayout/>}/>
                    <Route path="/auth/*" element={<AuthLayout/>}/>
                    <Route path="/user/*" element={<UserLayout/>}/>
                    <Route path="*" element={<Navigate to="/auth/login" replace/>}/>
                </Routes>
            </ThemeProvider>
        </>
    )
}

export default App