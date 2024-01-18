import { FC, useState } from "react";
import CodeMirrorMerge from "react-codemirror-merge";
import { EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

const Original = CodeMirrorMerge.Original;
const Modified = CodeMirrorMerge.Modified;

interface Props {}

export const Diff: FC<Props> = ({}) => {
  return (
    <CodeMirrorMerge className="w-screen" theme={vscodeDark}>
      <Original />
      <Modified />
    </CodeMirrorMerge>
  );
};
