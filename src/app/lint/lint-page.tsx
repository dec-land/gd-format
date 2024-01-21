"use client";

import AboutSection from "@/src/components/AboutSection";
import ActionButton from "@/src/components/ActionButton";
import { CodeBlock } from "@/src/components/CodeBlock";
import CodeBlocks from "@/src/components/CodeBlocks";
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
    if (hasLinted) {
      toast.info(
        "This code has already been linted, please make a change before trying again."
      );
      return;
    }

    if (loading) return;

    if (!inputCode) {
      toast.info("Please enter some Godot 4 GDScript to lint.");
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
              "Invalid GDScript provided, please change it and try again. Note - This currently only works for Godot 4 GDScript"
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

  return (
    <div className="flex pt-10 h-100 flex-col items-center px-4 sm:px-10 pb-40 sm:pb-20">
      <div className="mt-4 flex items-center space-x-2">
        <ActionButton
          onClick={() => handleLinting()}
          loading={loading}
          text="Lint"
        />
      </div>

      <div className="mt-4 text-center text-s">
        {loading
          ? "Linting..."
          : 'Please enter some Godot 4 GDScript, then click "Lint"'}
      </div>

      <CodeBlocks
        inputCode={inputCode}
        outputCode={output?.problems.join("\n") ?? ""}
        loading={loading}
        errors={output?.hasIssues ? output : undefined}
        showOutputClearAndOpenFromFile={false}
        showOutputDownloadAndClear={false}
        onInputChange={(value) => {
          setInputCode(value);
          setHasLinted(false);
        }}
      />

      <div className="mt-10">
        <AboutSection />
      </div>
    </div>
  );
}
