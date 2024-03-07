import { createContext } from "react";

export const backgroundColors = {
  primary: "primary",
  blue: "blue",
  green: "green",
  pink: "pink",
};

export const BackgroundColorContext = createContext({
  color: backgroundColors.blue,
  changeColor: (color) => {},
});
