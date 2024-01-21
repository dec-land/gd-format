"use client";

import AboutSection from "@/src/components/AboutSection";
import ActionButton from "@/src/components/ActionButton";
import { CodeBlock } from "@/src/components/CodeBlock";
import CodeBlocks from "@/src/components/CodeBlocks";
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
    if (hasFormatted) {
      toast.info(
        "This code has already been formatted, please make a change before trying again."
      );
      return;
    }

    if (loading) return;

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
        <ActionButton
          onClick={() => handleFormat()}
          loading={loading}
          text="Format"
        />
      </div>

      <div className="mt-4 text-center text-s">
        {loading
          ? "Formatting..."
          : hasFormatted
          ? "Output copied to clipboard!"
          : 'Please enter some GDScript, then click "Format"'}
      </div>

      <CodeBlocks
        inputCode={inputCode}
        outputCode={outputCode}
        loading={loading}
        onInputChange={(value) => {
          setInputCode(value);
          setHasFormatted(false);
        }}
      />

      <div className="mt-10">
        <AboutSection />
      </div>
    </div>
  );
}
