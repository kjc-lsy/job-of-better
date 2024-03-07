import React, {useEffect, useState} from "react";
import {createContext} from "react";
import GlobalStyle from "../theme/GlobalStyle";
import {green, pink, primary} from "../theme/theme";
import {ThemeProvider} from "styled-components";
/*import {
  BackgroundColorContext,
  backgroundColors,
} from "contexts/BackgroundColorContext";*/


export const backgroundColors = {
    primary: "primary",
    //blue: "blue",
    green: "green",
    pink: "pink",
};
export const primaryValue = {
    colors: "#0906ff"
}
export const pinkValue = {
    colors: "#e44cc4"
}
export const greenValue = {
    colors: "#00f2c3"
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


