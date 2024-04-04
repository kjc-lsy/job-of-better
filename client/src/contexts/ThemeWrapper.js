/*import { ThemeContext, themes } from "contexts/ThemeWrapper";*/
import React, {createContext, useEffect, useState} from "react";
import GlobalStyle from "../theme/GlobalStyle";
import {ThemeProvider} from "styled-components";

export const themes = {
    dark: "",
    light: "white-content",
};
export const darkValue = {
    fontColor: "rgba(255,255,255,0.9)",
    labelColor: "rgba(255,255,255,0.6)",
    backTitleColor: "rgba(245, 246, 250, 0.1411764)",
    backColor: "#1e1e2f",
    border: "rgba(255,255,255,0.1)"
}

export const lightValue = {
    fontColor: "#000000",
    labelColor: "#344675",
    backTitleColor: "#f5f6fa",
    backColor: "#f5f6fa",
    border: "rgba(29, 37, 59, 0.2)"
}

export const ThemeContext = createContext({
    theme: themes.light,
    changeTheme: () => {
    },
});

export default function ThemeContextWrapper(props) {
    const [theme, setTheme] = useState(themes.light);

    useEffect(() => {
        switch (theme) {
            case themes.light:
                document.body.classList.add("white-content");
                break;
            case themes.dark:
            default:
                document.body.classList.remove("white-content");
                break;
        }
    }, [theme]);

    const themeColor = theme === themes.light ? lightValue : darkValue;

    function changeTheme(theme) {
        setTheme(theme);
    }

    return (
        <ThemeProvider theme={themeColor}>
            <GlobalStyle/>
            <ThemeContext.Provider value={{theme: theme, changeTheme: changeTheme}}>
                {props.children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
}