import React, { FC } from "react";

import Image from "next/image";
import LightDarkSwap from "./LightDarkSwap";
import Link from "next/link";

export const Navbar: FC = () => {
  return (
    <div className="navbar flex flex-col sm:flex-row shadow-lg px-4 sm:px-8">
      <div className="flex items-center">
        <Link className="min-w-[40px]" href="/">
          <Image alt="icon" src="/icon.svg" width={50} height={50} />
        </Link>
        <h1 className="text-lg font-bold mx-4">
          <Link href="/">GDScript Formatter</Link>
        </h1>
        <div className="sm:hidden">
          <LightDarkSwap />
        </div>
      </div>

      <nav className="flex flex-col sm:flex-row sm:ml-auto space-y-2 sm:space-y-0 sm:space-x-4 items-center sm:pr-4 text-center sm:text-left">
        <h1 className="text-sm">
          <Link href="/format">GDScript Beautifier</Link>
        </h1>
        <h1 className="text-sm">
          <Link href="/lint">GDScript Linter</Link>
        </h1>
        <h1 className="text-sm">
          <Link href="/convert">GDScript/C# Converter</Link>
        </h1>
        <h1 className="text-sm">
          <Link href="/about">About</Link>
        </h1>
      </nav>

      <div className="hidden sm:block">
        <LightDarkSwap />
      </div>
    </div>
  );
};

export default Navbar;
