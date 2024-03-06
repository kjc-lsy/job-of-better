import {createContext} from "react";
import styled from 'styled-components';

export const themes = {
    dark: "",
    light: "white-content",
};

export const ThemeContext = createContext({
    theme: themes.dark,
    changeTheme: () => {},
});
