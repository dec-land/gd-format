"use client";

import { CodeBlock } from "@/components/CodeBlock";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const MAX_CODE_LENGTH = 1000000;

export default function Home() {
  const [inputCode, setInputCode] = useState<string>("");
  const [output, setOutput] = useState<Response | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasLinted, setHasLinted] = useState<boolean>(false);
  const router = useRouter();

  type Response = {
    numberOfProblemsparsed: number;
    problems: string[];
  };

  const handleLinting = async () => {
    if (!inputCode) {
      alert("Please enter some code.");
      return;
    }

    if (inputCode.length > MAX_CODE_LENGTH) {
      alert(
        `Please enter code less than ${MAX_CODE_LENGTH} characters. You are currently at ${inputCode.length} characters.`
      );
      return;
    }

    setLoading(true);
    setOutput(undefined);

    const controller = new AbortController();

    const response = await (async () => {
      try {
        return await axios.post<Response>(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/lint/gd-script`,
          inputCode,
          {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
              "Content-Type": "text/plain",
            },
          }
        );
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong, please try again.");
        return;
      }
    })();

    if (!response?.data) {
      setLoading(false);
      toast.error("Something went wrong, please try again.");
      return;
    }

    toast.success("Code successfully linted! :)");

    setOutput(response.data);
    setLoading(false);
    setHasLinted(true);
  };

  return (
    <>
      <Head>
        <title>GDScript Linter</title>
        <meta name="description" content="Prettify your GDScript code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
        <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
          <div className="text-4xl font-bold text-center">GDScript Linter</div>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <button
            className="w-[140px] rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700 disabled:bg-gray-700"
            onClick={() => handleLinting()}
            disabled={loading || !inputCode || hasLinted}
          >
            {loading ? "Linting..." : "Lint"}
          </button>
        </div>

        <div className="mt-4 text-center text-xs">
          {loading
            ? "Linting..."
            : hasLinted
            ? "Output copied to clipboard!"
            : 'Enter some code and click "Lint"'}
        </div>

        <div className="mt-4 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">Input</div>

            <CodeBlock
              code={inputCode}
              editable={!loading}
              onChange={(value) => {
                setInputCode(value);
                setHasLinted(false);
              }}
            />
          </div>
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">Output</div>
            <CodeBlock
              code={output?.problems.join("\n") ?? ""}
              extensions={[]}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-center">Other tools</div>
        </div>

        <div className="mt-6 flex items-center space-x-10">
          <button
            className="w-[140px] cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600 active:bg-blue-700"
            onClick={() => router.push("/format")}
            disabled={loading}
          >
            Formatter
          </button>
          <button
            className="w-[140px] cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600 active:bg-blue-700"
            onClick={() => router.push("/diff")}
            disabled={loading}
          >
            Diff Checker
          </button>
        </div>
      </div>
    </>
  );
}
