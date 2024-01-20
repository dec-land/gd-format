"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  page?: boolean;
}

const AboutSection: FC<Props> = ({ page }) => {
  return (
    <div className="text-center">
      <div
        className={`divider divider-primary ${
          page ? "text-4xl mb-10" : "text-2xl mb-8"
        } font-bold`}
      >
        About
      </div>

      <p className={`text-base`}>
        Welcome to GDScript Formatter, your go-to tool for formatting and
        linting GDScript, a language commonly used in Godot game development.
        This website utilizes the capabilities of{" "}
        <Link
          href="https://github.com/Scony/godot-gdscript-toolkit"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "skyblue" }}
          className="font-bold"
        >
          gdtoolkit
        </Link>
        , a powerful open-source library for working with GDScript.
      </p>

      <p className={`text-base ${page ? "mt-6" : "mt-4"}`}>
        AI, specifically{" "}
        <Link
          href="https://chat.openai.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "skyblue" }}
          className="font-bold"
        >
          ChatGPT 3.5
        </Link>
        {", "}
        is used for the GDScript to C# and C# to GDScript conversions. The
        conversion feature helps streamline your Godot game development
        workflow.
      </p>

      <p className={`text-base ${page ? "mt-6" : "mt-4"}`}>
        This website is completely open source, and we encourage anyone
        interested to contribute. The source code is available on{" "}
        <Link
          href="https://github.com/dec-land/gd-format"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "skyblue" }}
          className="font-bold"
        >
          GitHub
        </Link>
        .
      </p>

      <p className={`text-sm text-red-500 ${page ? "mt-6" : "mt-4"}`}>
        Please note that while the conversion tool is mostly accurate, it&apos;s
        advisable to review and test the results for your specific use case.
      </p>

      <div className="flex justify-center mt-8">
        <Link href="https://www.buymeacoffee.com/lemoncrap">
          <Image
            alt="Donate button"
            width={250}
            height={50}
            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=lemoncrap&button_colour=478cbf&font_colour=ffffff&font_family=Poppins&outline_colour=ffffff&coffee_colour=FFDD00"
          />
        </Link>
      </div>
    </div>
  );
};

export default AboutSection;
