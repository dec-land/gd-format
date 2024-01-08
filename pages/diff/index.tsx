"use client";

import { CodeBlock } from "@/components/CodeBlock";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";

const MAX_CODE_LENGTH = 1000000;

export default function Home() {
  const [inputCode, setInputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasFormatted, setHasFormatted] = useState<boolean>(false);

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

    const response = await (async () => {
      try {
        return await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/format/gd-script`,
          inputCode,
          {
            signal: controller.signal,
            headers: {
              Accept: "text/plain",
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

    toast.success("Code successfully formatted! :)");

    setOutputCode(response.data);
    setLoading(false);
    setHasFormatted(true);
    copyToClipboard(response.data);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return <>TODO</>;
}
