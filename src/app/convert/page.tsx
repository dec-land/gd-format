import { Metadata } from "next";
import ConvertPage from "./convert-page";

export const metadata: Metadata = {
  title: "GDScript/C# Converter",
  description:
    "Convert your GDScript to C# or your C# to GDScript using AI (ChatGPT 3.5)",
};

export default async function Page() {
  return <ConvertPage />;
}
