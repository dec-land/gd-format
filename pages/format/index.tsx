"use client";

import { CodeBlock } from "@/components/CodeBlock";
import { BackendError } from "@/types/BackendError";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Metadata } from "next";
import { Adsense } from "@ctrl/react-adsense";

export const metadata: Metadata = {
  title: "GDScript Formatter",
  description: "Prettify your GDScript.",
};

const MAX_CODE_LENGTH = 1000000;

export default function Home() {
  const [inputCode, setInputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasFormatted, setHasFormatted] = useState<boolean>(false);
  const router = useRouter();

  const handleFormat = async () => {
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
    setOutputCode("");

    const controller = new AbortController();

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

  return (
    <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
      <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
        <div className="text-4xl font-bold text-center">GDScript Formatter</div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <button
          className="w-[140px] rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700 disabled:bg-gray-700"
          onClick={() => handleFormat()}
          disabled={loading || !inputCode || hasFormatted}
        >
          {loading ? "Formatting..." : "Format"}
        </button>
      </div>
      <div className="mt-4 text-center text-xs">
        {loading
          ? "Formatting..."
          : hasFormatted
          ? "Output copied to clipboard!"
          : 'Enter some code and click "Format"'}
      </div>

      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9568267309357674"
        crossOrigin="anonymous"
      >
      </script>

      <ins
        className="adsbygoogle"
        style={{display: 'block'}}
        data-ad-client="ca-pub-9568267309357674"
        data-ad-slot="4126867094"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      <div className="mt-4 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
        <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
          <div className="text-center text-xl font-bold">Input</div>

          <CodeBlock
            code={inputCode}
            editable={!loading}
            onChange={(value) => {
              setInputCode(value);
              setHasFormatted(false);
            }}
          />
        </div>
        <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
          <div className="text-center text-xl font-bold">Output</div>
          <CodeBlock code={outputCode} />
        </div>
      </div>
      <Adsense
        client="ca-pub-9568267309357674"
        slot="4126867094"
        format="auto"
        responsive="true"
      />
      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-center">Other tools</div>
      </div>
      <div className="mt-6 flex items-center space-x-10">
        <button
          className="w-[140px] cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600 active:bg-blue-700"
          onClick={() => router.push("/lint")}
          disabled={loading}
        >
          Linter
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
  );
}
