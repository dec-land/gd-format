import React, { FC } from "react";

import Image from "next/image";
import LightDarkSwap from "./LightDarkSwap";
import Link from "next/link";

export const Navbar: FC = () => {
  return (
    <div className="navbar shadow-lg px-4 sm:px-8">
      <div className="flex-1 flex items-center">
        <Link href="/">
          <Image alt="icon" src="icon.svg" width={50} height={50} />
        </Link>
        <h1 className="text-lg font-bold mx-4">
          <Link href="/">GDScript Formatter</Link>
        </h1>

        <nav className="flex ml-auto space-x-4 pr-4">
          <h1 className="text-sm">
            <Link href="/format">GDScript Beautifier</Link>
          </h1>
          <h1 className="text-sm">
            <Link href="/lint">GDScript Linter</Link>
          </h1>
        </nav>
      </div>
      <LightDarkSwap />
    </div>
  );
};

export default Navbar;
