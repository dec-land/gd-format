"use client";

import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useEffect, useState } from "react";

const DEFAULT_THEME = "dark";

export const LightDarkSwap: FC = () => {
  // use theme from local storage if available or set light theme

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || DEFAULT_THEME;
    }
    return DEFAULT_THEME;
  });

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      // add custom data-theme attribute to html tag required to update theme using DaisyUI
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);
  // update state on toggle
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button className="btn btn-circle btn-ghost">
      <label className="swap swap-rotate w-12 h-12">
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={theme === "light" ? false : true}
        />

        <FontAwesomeIcon icon={faSun} size="lg" className="swap-on" />
        <FontAwesomeIcon icon={faMoon} size="lg" className="swap-off" />
      </label>
    </button>
  );
};

export default LightDarkSwap;
