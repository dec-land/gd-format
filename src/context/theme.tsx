"use client";

import { FC, createContext, useContext, useState } from "react";

const DEFAULT_THEME = "dark";

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  updateTheme: (newTheme: string) => {},
});

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /**
   * Using react hooks, set the default state
   */
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || DEFAULT_THEME;
    }
    return DEFAULT_THEME;
  });

  /**
   * Declare the update state method that will handle the state values
   */
  const updateTheme = (theme: string) => {
    setTheme(theme);
  };

  /**
   * Context wrapper that will provider the state values to all its children nodes
   */
  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
