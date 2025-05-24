import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    loadThemeStyles(theme);
  }, []);

  const loadThemeStyles = (themeName) => {
    const themeLink = document.getElementById('theme-style');
    if (themeLink) {
      themeLink.remove();
    }

    const link = document.createElement('link');
    link.id = 'theme-style';
    link.rel = 'stylesheet';
    link.href = `/src/themes/${themeName}.css`;
    document.head.appendChild(link);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    loadThemeStyles(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};