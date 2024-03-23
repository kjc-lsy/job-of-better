import React, {createContext, useState} from "react";
import GlobalStyle from "../theme/GlobalStyle";
import {ThemeProvider} from "styled-components";

export const backgroundColors = {
    primary: "primary",
    green: "green",
    pink: "pink",
};
export const primaryValue = {
    colors: "#0906ff",
    bgColor: "linear-gradient(0deg, #3358f4 0%, #0906ff 100%)"
}
export const pinkValue = {
    colors: "#e44cc4",
    bgColor: "linear-gradient(0deg, #f3a4b5 0%, #e44cc4 80% 100%)"
}
export const greenValue = {
    colors: "#00f2c3",
    bgColor: "linear-gradient(0deg, #0098f0 0%, #00f2c3 100%)"
}

export const BackgroundColorContext = createContext({
    color: backgroundColors.primary,
    changeColor: (color) => {
    },
});

export default function BackgroundColorWrapper(props) {
    const [color, setColor] = useState(backgroundColors.primary);

    function changeColor(color) {
        setColor(color);
        console.log(color);
    }

    let theme = color === "primary" ? primaryValue : color === "pink" ? pinkValue : greenValue;

    /*const localThemeMode = window.localStorage.getItem("back-color");
    const [themeMode, setThemeMode] = useState(localThemeMode);

    useEffect (() => {
      theme = window.localStorage.getItem("back-color");
    }, [theme]);*/

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <BackgroundColorContext.Provider value={{color: color, changeColor: changeColor}}>
                {props.children}
            </BackgroundColorContext.Provider>
        </ThemeProvider>

    )

    /*return (
      <BackgroundColorContext.Provider
        value={{ color: color, changeColor: changeColor }}
      >
        {props.children}
      </BackgroundColorContext.Provider>
    );*/

}


