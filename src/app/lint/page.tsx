import { Metadata } from "next";
import LintPage from "./lint-page";

export const metadata: Metadata = {
  title: "GDScript Linter",
  description: "Lint your GDScript code using the gdtoolkit linter.",
};

export default async function Page() {
  return <LintPage />;
}
