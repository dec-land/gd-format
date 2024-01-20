"use client";

import React, { FC } from "react";
import { useTheme } from "../context/theme";
import githubDark from "../assets/github-dark.svg";
import githubWhite from "../assets/github-white.svg";
import Image from "next/image";
import { faSun, faMoon, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer: FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className="footer fixed inset-x-0 bottom-0 footer-center p-4 bg-base-200 text-base-content">
      <div className="flex w-full items-center justify-between">
        <aside className="text-center" style={{ flexBasis: "100%" }}>
          <p>What to put here? ʕ •ᴥ•ʔ | Created by Declan Fitzpatrick</p>
        </aside>
        <nav className="flex flex-row space-x-2">
          <a href="https://github.com/dec-land/gd-format" className="ml-auto">
            {isDark ? (
              <Image
                priority
                src={githubWhite}
                height={25}
                width={25}
                alt="Github button"
              />
            ) : (
              <Image
                priority
                height={25}
                width={25}
                src={githubDark}
                alt="Github button"
              />
            )}
          </a>
          <a href="mailto:declanfitzpatrick95@gmail.com" className="ml-auto">
            <FontAwesomeIcon icon={faEnvelope} size="xl" />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
