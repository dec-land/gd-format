'use client'

import { CodeBlock } from '@/components/CodeBlock';
import Head from 'next/head';
import { useState } from 'react';

const MAX_CODE_LENGTH = 1000000;

export default function Home() {
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasFormatted, setHasFormatted] = useState<boolean>(false);

  const handleFormat = async () => {
    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    if (inputCode.length > MAX_CODE_LENGTH) {
      alert(
        `Please enter code less than ${MAX_CODE_LENGTH} characters. You are currently at ${inputCode.length} characters.`,
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();

    const response = await (() => {
      try {
        return fetch('https://gd-format-backend-black-breeze-3291.fly.dev/v1/format/gd-script', {
          method: 'POST',
          signal: controller.signal,
          body: inputCode,
          mode: 'no-cors',
          headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain'
          },
        })
     } catch (error) {
        console.log('here');
        setLoading(false)
     }
    })()

    if (!response) {
      console.debug('HERE');
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const data = response.body;

    if (!data) {
      console.debug('here2')
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      code += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasFormatted(true);
    copyToClipboard(code);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
};

  return (
    <>
      <Head>
        <title>GDScript Formatter</title>
        <meta
          name="description"
          content="Prettify your GDScript code"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
        <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
          <div className="text-4xl font-bold">GDScript formatter</div>
        </div>

        <div className="mt-2 flex items-center space-x-2">
          <button
            className="w-[140px] cursor-pointer rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700"
            onClick={() => handleFormat()}
            disabled={loading}
          >
            {loading ? 'Formatting...' : 'Format'}
          </button>
        </div>

        <div className="mt-2 text-center text-xs">
          {loading
            ? 'Formatting...'
            : hasFormatted
            ? 'Output copied to clipboard!'
            : 'Enter some code and click "Format"'}
        </div>

        <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
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
      </div>
    </>
  );
}
