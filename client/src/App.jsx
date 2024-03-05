import {Navigate, Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import UserLayout from "./layouts/User";
import React, {useState} from "react";

import {ThemeProvider} from "styled-components";
import {lightTheme, darkTheme} from "./theme/theme";
import GlobalStyle from "./theme/GlobalStyle";
import {ThemeModeButton} from "./theme/Button";

const App = () => {

    const localThemeMode = window.localStorage.getItem("theme" || "lightTheme");
    const [themeMode, setThemeMode] = useState(localThemeMode);

    const theme = themeMode === "lightTheme" ? lightTheme : darkTheme;

    const toggleTheme = () => {
        if (themeMode === "lightTheme") {
            setThemeMode("darkTheme");
            window.localStorage.setItem("theme", "darkTheme");
        } else {
            setThemeMode("lightTheme");
            window.localStorage.setItem("theme", "lightTheme");
        }
    };

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