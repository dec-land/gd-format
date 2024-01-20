"use client";

import AboutSection from "@/src/components/AboutSection";
import { CodeBlock } from "@/src/components/CodeBlock";
import { BackendError } from "@/types/BackendError";
import axios, { isAxiosError } from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const MAX_CODE_LENGTH = 1000000;

export default function LintPage() {
  const [inputCode, setInputCode] = useState<string>("");
  const [output, setOutput] = useState<Response | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasLinted, setHasLinted] = useState<boolean>(false);

  type Response = {
    numberOfProblems: number;
    problems: string[];
    hasIssues: boolean;
  };

  const handleLinting = async () => {
    if (loading || hasLinted) return;

    if (!inputCode) {
      toast.info("Please enter some GDScript to lint.");
      return;
    }

    if (inputCode.length > MAX_CODE_LENGTH) {
      toast.error(
        `Please enter GDScript less than ${MAX_CODE_LENGTH} characters. You are currently at ${inputCode.length} characters.`
      );
      return;
    }

    setLoading(true);
    setOutput(undefined);

    const controller = new AbortController();

    // TODO - move to nextjs server commands
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/lint/gd-script`,
        inputCode,
        {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
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

    if (response.data.hasIssues) {
      toast.success(`Issues found: ${response.data.numberOfProblems}`);
    } else {
      toast.success(`No issues found`);
    }

    setOutput(response.data);
    setHasLinted(true);
    setLoading(false);
  };

  // TODO - extract shared lint/format stuff to components
  return (
    <div className="flex pt-10 h-100 flex-col items-center px-4 sm:px-10 pb-40 sm:pb-20">
      <div className="mt-4 flex items-center space-x-2">
        <button
          className="btn w-[150px] btn-primary font-bold btn-lg"
          onClick={() => handleLinting()}
        >
          {loading ? <span className="loading loading-spinner"></span> : "Lint"}
        </button>
      </div>

      <div className="mt-4 text-center text-s">
        {loading
          ? "Linting..."
          : 'Please enter some GDScript, then click "Lint"'}
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
              setHasLinted(false);
            }}
          />
        </div>
        <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
          <div className="flex flex-row h-full w-full justify-center gap-4">
            <div className="text-center text-xl font-bold">Output</div>
            {output?.hasIssues && (
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="/warning.png" // Replace with your icon path
                  alt="Warning"
                  width={25}
                  height={25}
                />
                <span className="text-sm font-medium text-red-500">
                  {output.numberOfProblems} problems
                </span>
              </div>
            )}
          </div>
          <CodeBlock
            editable={false}
            showDownloadAndClear={false}
            isLoading={loading}
            showClearAndOpenFromFile={false}
            code={output?.problems.join("\n") ?? ""}
            extensions={[]}
          />
        </div>
      </div>

      <AboutSection />
    </div>
  );
}
