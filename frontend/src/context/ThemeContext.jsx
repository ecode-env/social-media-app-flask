import { createContext, useState, useEffect } from "react";


export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme")
      || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });

  // apply and persist
  useEffect(() => {
    document.documentElement.classList.remove("light-theme", "dark-theme");
    document.documentElement.classList.add(`${theme}-theme`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
