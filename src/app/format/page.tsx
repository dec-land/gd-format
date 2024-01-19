import { Metadata } from "next";
import FormatPage from "./format-page";

export const metadata: Metadata = {
  title: "GDScript Formatter",
  description: "Prettify your GDScript code using the gdtoolkit formatter.",
};

export default async function Page() {
  return <FormatPage />;
}
