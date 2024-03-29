"use client";

import AboutSection from "@/src/components/AboutSection";
import { CodeBlock } from "@/src/components/CodeBlock";
import { ConversionSelect } from "@/src/components/ConversionSelect";
import { VersionSelect } from "@/src/components/VersionSelect";
import { BackendError } from "@/types/BackendError";
import { Version, Conversion } from "@/types/Conversion";
import { csharp } from "@replit/codemirror-lang-csharp";
import { gdscript } from "@gdquest/codemirror-gdscript";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import CodeBlocks from "@/src/components/CodeBlocks";
import ActionButton from "@/src/components/ActionButton";

const MAX_CODE_LENGTH = 10000;

export default function ConvertPage() {
  const [inputCode, setInputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasConverted, setHasConverted] = useState<boolean>(false);
  const [version, setVersion] = useState<Version>("4");
  const [conversion, setConversion] = useState<Conversion>("gdscript-c#");
  const [rateLimitTimer, setRateLimitTimer] = useState<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  const handleConvert = async () => {
    if (hasConverted) {
      toast.info(
        "This code has already been converted, please make a change before trying again."
      );
      return;
    }

    if (rateLimitTimer) {
      toast.info("Please wait 2 seconds before you can convert again");
      return;
    }

    if (loading || rateLimitTimer) return;
    const language = conversion === "c#-gdscript" ? "C#" : "GDScript";
    if (!inputCode) {
      toast.info(`Please enter some ${language} to convert.`);
      return;
    }

    if (inputCode.length > MAX_CODE_LENGTH) {
      toast.error(
        `Please enter ${language} less than ${MAX_CODE_LENGTH} characters. You are currently at ${inputCode.length} characters.`
      );
      return;
    }

    setLoading(true);
    setOutputCode("");

    const controller = new AbortController();

    const endpoint =
      conversion === "c#-gdscript"
        ? "convert/csharp-gdscript"
        : "convert/gdscript-csharp";

    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/${endpoint}`,
        inputCode,
        {
          params: {
            version,
          },
          signal: controller.signal,
          headers: {
            Accept: "text/plain",
            "Content-Type": "text/plain",
          },
        }
      )
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (isAxiosError<BackendError>(error) && error.response) {
          if (error.response.status === 422) {
            toast.error(
              "Invalid GDScript provided, please change it and try again."
            );
            return;
          }
        }
        toast.error("Something went wrong, please try again.");
        return;
      });

    if (!response?.data) {
      setLoading(false);
      return;
    }

    setRateLimitTimer(
      setTimeout(() => {
        setRateLimitTimer(undefined);
      }, 2000)
    );

    toast.success("Code successfully converted! :)");

    setOutputCode(response.data);
    setLoading(false);
    setHasConverted(true);
  };

  const helpText = loading
    ? "Converting..."
    : 'Please enter some GDScript, select the Godot version you are using, select which language you want to convert from/to, then click "Convert"';

  const extensions = conversion === "gdscript-c#" ? [gdscript()] : [csharp()];

  // Extract shared components
  return (
    <div className="flex pt-10 h-100 flex-col items-center px-4 sm:px-10 pb-40 sm:pb-20">
      <div className="mt-4 flex items-center space-x-6">
        <VersionSelect
          version={version}
          disabled={loading}
          onChange={(value) => setVersion(value)}
        />

        <ActionButton
          onClick={() => handleConvert()}
          loading={loading}
          text="Convert"
        />
      </div>

      <div className="mt-4 flex items-center">
        <ConversionSelect
          disabled={loading}
          conversion={conversion}
          onChange={(value) => setConversion(value)}
        />
      </div>

      <div className="mt-4 text-center text-s">{helpText}</div>

      <CodeBlocks
        inputCode={inputCode}
        outputCode={outputCode}
        loading={loading}
        inputExtensions={extensions}
        outputExtensions={extensions}
        onInputChange={(value) => {
          setInputCode(value);
          setHasConverted(false);
        }}
      />

      <div className="mt-10">
        <AboutSection />
      </div>
    </div>
  );
}
