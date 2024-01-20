import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FC } from "react";

const AboutSection: FC = () => {
  return (
    <div>
      <div className="mt-10 text-center">
        <div className="text-2xl font-bold">About</div>
        <p className="text-base mt-2">
          Welcome to GDScript Formatter, your go-to tool for formatting and
          linting GDScript, a language commonly used in Godot game development.
          This website utilizes the capabilities of{" "}
          <a
            href="https://github.com/Scony/godot-gdscript-toolkit"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "skyblue" }}
            className="font-bold"
          >
            gdtoolkit
          </a>
          , a powerful open-source library for working with GDScript.
        </p>

        <p className="text-base mt-4">
          AI, specifically{" "}
          <a
            href="https://chat.openai.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "skyblue" }}
            className="font-bold"
          >
            ChatGPT 3.5
          </a>
          {", "}
          is used for the GDScript to C# and C# to GDScript conversions. The
          conversion feature helps streamline your Godot game development
          workflow.
        </p>

        <p className="text-base mt-4">
          This website is completely open source, and we encourage anyone
          interested to contribute. The source code is available on{" "}
          <a
            href="https://github.com/dec-land/gd-format"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "skyblue" }}
            className="font-bold"
          >
            GitHub
          </a>
          .
        </p>

        <p className="text-sm text-red-500 mt-4">
          Please note that while the conversion tool is mostly accurate,
          it&apos;s advisable to review and test the results for your specific
          use case.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
