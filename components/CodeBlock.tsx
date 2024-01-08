import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { gdscript } from "@gdquest/codemirror-gdscript";
import { FC, useEffect, useState } from "react";

interface Props {
  code: string;
  editable?: boolean;
  extensions?: Extension[];
  onChange?: (value: string) => void;
}

export const CodeBlock: FC<Props> = ({
  code,
  editable = false,
  extensions,
  onChange = () => {},
}) => {
  const [copyText, setCopyText] = useState<string>("Copy");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText("Copy");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copyText]);

  return (
    <div className="relative">
      <button
        className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText("Copied!");
        }}
      >
        {copyText}
      </button>

      <CodeMirror
        editable={editable}
        value={code}
        height="500px"
        extensions={extensions ?? [gdscript()]}
        theme={vscodeDark}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};
