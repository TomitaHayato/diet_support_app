import { useState } from "react";
import { ThemeContext } from "./ThemeContext";


export function ThemeContextProvider(props) {
  const {children} = props;
  const [theme, setTheme] = useState("dark");

  return(
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

