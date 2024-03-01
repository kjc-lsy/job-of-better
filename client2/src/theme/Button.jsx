import React from "react";
import { ThemeModeWrapper } from "./styled";

export const ThemeModeButton = ({ toggleTheme, themeMode }) => {
    return (
        <ThemeModeWrapper onClick={toggleTheme}>
            {themeMode === "lightTheme" ? "🌝" : "🌚"}
        </ThemeModeWrapper>
    );
};

