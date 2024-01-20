import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { gdscript } from "@gdquest/codemirror-gdscript";
import { FC, useCallback, useEffect } from "react";
import {
  faSave,
  faFolderOpen,
  faTrashCan,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { useDropzone } from "react-dropzone";

interface Props {
  code: string;
  editable?: boolean;
  showClearAndOpenFromFile?: boolean;
  extensions?: Extension[];
  showDownloadAndClear?: boolean;
  isLoading?: boolean;
  onChange?: (value: string) => void;
}

export const CodeBlock: FC<Props> = ({
  code,
  extensions,
  editable = true,
  isLoading,
  showClearAndOpenFromFile = true,
  showDownloadAndClear = true,
  onChange = () => {},
}) => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length && acceptedFiles[0]) return;
      const file = acceptedFiles[0];
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const content = fileReader.result;
        if (!content) return;
        onChange(content.toString());
      };

      fileReader.readAsText(file);
    },
    accept: {
      "text/plain": [".gd"],
    },
  });

  const handleCopy = async () => {
    if (!code.length) {
      toast.error("Nothing to copy");
      return;
    }
    await navigator.clipboard.writeText(code);
    toast.success("Code successfully copied to clipboard");
  };

  const handleClear = async () => {
    onChange("");
  };

  const handleDownload = async () => {
    if (!code.length) {
      toast.error("Nothing to download");
      return;
    }
    const blob = new Blob([code]);
    saveAs(blob, "GDScriptFormatter.gd");
    toast.success("File successfully downloaded");
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      <div className="flex items-center bg-primary justify-end h-8">
        {showClearAndOpenFromFile && (
          <div className="tooltip mr-4" data-tip="Open from file">
            <button onClick={open} disabled={isLoading}>
              <FontAwesomeIcon icon={faFolderOpen} size="lg" />
            </button>
          </div>
        )}
        {showDownloadAndClear && (
          <div className="tooltip mr-4" data-tip="Download">
            <button onClick={handleDownload} disabled={isLoading}>
              <FontAwesomeIcon icon={faSave} size="lg" />
            </button>
          </div>
        )}
        {showDownloadAndClear && (
          <div className="tooltip mr-4" data-tip="Copy to clipboard">
            <button onClick={handleCopy} disabled={isLoading}>
              <FontAwesomeIcon icon={faCopy} size="lg" />
            </button>
          </div>
        )}
        {showClearAndOpenFromFile && (
          <div className="tooltip mr-4" data-tip="Clear">
            <button onClick={handleClear} disabled={isLoading}>
              <FontAwesomeIcon icon={faTrashCan} size="lg" />
            </button>
          </div>
        )}
      </div>

      <CodeMirror
        editable={editable}
        value={code}
        height="500px"
        readOnly={!editable}
        extensions={extensions ?? [gdscript()]}
        theme={vscodeDark}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};
