"use client";

import AboutSection from "@/src/components/AboutSection";
import { CodeBlock } from "@/src/components/CodeBlock";
import { BackendError } from "@/types/BackendError";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const MAX_CODE_LENGTH = 1000000;

export default function FormatPage() {
  const [inputCode, setInputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasFormatted, setHasFormatted] = useState<boolean>(false);

  const handleFormat = async () => {
    if (loading || hasFormatted) return;

    if (!inputCode) {
      toast.info("Please enter some GDScript to format.");
      return;
    }

    if (inputCode.length > MAX_CODE_LENGTH) {
      toast.error(
        `Please enter GDScript less than ${MAX_CODE_LENGTH} characters. You are currently at ${inputCode.length} characters.`
      );
      return;
    }

    setLoading(true);
    setOutputCode("");

    const controller = new AbortController();

    // TODO - move to next js server commands
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/format/gd-script`,
        inputCode,
        {
          signal: controller.signal,
          headers: {
            Accept: "text/plain",
            "Content-Type": "text/plain",
          },
        }
      )
      .catch((error) => {
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

    toast.success("Code successfully formatted! :)");

    setOutputCode(response.data);
    setLoading(false);
    setHasFormatted(true);
    copyToClipboard(response.data);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  // Extract shared components
  return (
    <div className="flex pt-10 h-100 flex-col items-center px-4 sm:px-10 pb-40 sm:pb-20">
      <div className="mt-4 flex items-center space-x-2">
        <button
          className="btn w-[150px] btn-primary font-bold btn-lg"
          onClick={() => handleFormat()}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Format"
          )}
        </button>
      </div>

      <div className="mt-4 text-center text-s">
        {loading
          ? "Formatting..."
          : hasFormatted
          ? "Output copied to clipboard!"
          : 'Please enter some GDScript, then click "Format"'}
      </div>

      <div className="mt-4 flex w-full lg:px-20 max-w-[1800px] flex-col justify-between sm:flex-row sm:space-x-10">
        <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
          <div className="text-center text-xl font-bold">Input</div>

          <CodeBlock
            code={inputCode}
            isLoading={loading}
            editable={!loading}
            onChange={(value) => {
              setInputCode(value);
              setHasFormatted(false);
            }}
          />
        </div>

        <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
          <div className="text-center text-xl font-bold">Output</div>
          <CodeBlock
            code={outputCode}
            editable={false}
            isLoading={loading}
            showClearAndOpenFromFile={false}
          />
        </div>
      </div>

      <AboutSection />
    </div>
  );
}
