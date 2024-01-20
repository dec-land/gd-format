import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GDScript Formatter | Privacy Policy",
  description: "GDScript Privacy Policy",
};

export default async function Page() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-20 pb-40 sm:pb-20">
      <div className="flex mt-10 max-w-[1400px] flex-col text-center justify-center">
        <div className="mt-4 text-center">
          <div className="divider divider-primary text-4xl font-bold mb-10">
            Privacy Policy
          </div>

          <p>
            Welcome to GDScript Formatter! This Privacy Policy outlines how we
            handle user data and information on our website. Please read this
            policy carefully to understand our practices regarding your data.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">GDScript Beautifier</h2>
          <p>
            Our GDScript Formatter page provides functionality for formatting
            GDScript code using the open-source package called{" "}
            <Link
              href="https://github.com/Scony/godot-gdscript-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "skyblue" }}
              className="font-bold"
            >
              gdtoolkit
            </Link>
            . The code you submit for formatting is securely sent to our backend
            server for processing, and no data is stored on our servers.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">GDScript Linter</h2>
          <p>
            Similarly, our GDScript linting page utilizes the{" "}
            <Link
              href="https://github.com/Scony/godot-gdscript-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "skyblue" }}
              className="font-bold"
            >
              gdtoolkit
            </Link>{" "}
            package for linting purposes. The code you submit for linting is
            securely sent to our backend server for processing, and no data is
            stored on our servers.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            GDScript/C# Converter
          </h2>
          <p>
            Our GDScript/C# conversion page leverages Chat GPT for transforming
            GDScript code into C# or vice versa. The code you submit for
            conversion is securely sent to our backend server for processing,
            and no data is stored on our servers.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Advertising</h2>
          <p>
            Please refer to{" "}
            <Link
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "skyblue" }}
              className="font-bold"
            >
              Google&apos;s privacy policy
            </Link>{" "}
            for more information on how they handle user data.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Data Storage</h2>
          <p>
            GDScript Formatter does not store any user data or information. All
            processing, including formatting, linting, and conversion, occurs
            securely on our backend server, and no data is retained.
          </p>

          <p className="mt-8">
            If you have any questions or concerns about the Privacy Policy,
            please{" "}
            <Link
              href="mailto:declanfitzpatrick95@gmail.com"
              style={{ color: "skyblue" }}
              className="font-bold"
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
