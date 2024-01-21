import { FC } from "react";
import { CodeBlock } from "@/src/components/CodeBlock";
import Image from "next/image";
import { Extension } from "@codemirror/state";

interface CodeBlocksProps {
  inputCode: string;
  outputCode: string;
  loading: boolean;
  showOutputDownloadAndClear?: boolean;
  showOutputClearAndOpenFromFile?: boolean;
  outputEditable?: boolean;
  outputExtensions?: Extension[];
  inputExtensions?: Extension[];
  onInputChange: (value: string) => void;
  errors?: {
    numberOfProblems: number;
    problems: string[];
  };
}

const CodeBlocks: FC<CodeBlocksProps> = ({
  inputCode,
  outputCode,
  loading,
  outputExtensions,
  inputExtensions,
  outputEditable = false,
  onInputChange,
  showOutputClearAndOpenFromFile = false,
  showOutputDownloadAndClear,
  errors,
}) => {
  return (
    <div className="mt-4 flex w-full lg:px-20 max-w-[1800px] flex-col justify-between sm:flex-row sm:space-x-10">
      <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
        <div className="text-center text-xl font-bold">Input</div>

        <CodeBlock
          code={inputCode}
          isLoading={loading}
          editable={!loading}
          extensions={inputExtensions}
          onChange={onInputChange}
        />
      </div>

      <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
        <div className="flex flex-row h-full w-full justify-center gap-4">
          <div className="text-center text-xl font-bold">Output</div>
          {errors && (
            <div className="flex items-center justify-center gap-2">
              <Image src="/warning.png" alt="Warning" width={25} height={25} />
              <span className="text-sm font-medium text-red-500">
                {errors.numberOfProblems} problems
              </span>
            </div>
          )}
        </div>
        <CodeBlock
          editable={outputEditable}
          showDownloadAndClear={showOutputDownloadAndClear}
          showClearAndOpenFromFile={showOutputClearAndOpenFromFile}
          isLoading={loading}
          code={outputCode}
          extensions={outputExtensions}
        />
      </div>
    </div>
  );
};

export default CodeBlocks;
