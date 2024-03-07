import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "contexts/ThemeContext";

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

  function changeTheme(theme) {
    setTheme(theme);
  }

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
