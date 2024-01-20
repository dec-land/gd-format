import AboutSection from "@/src/components/AboutSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDScript Formatter | About",
  description: "About GDScript Formatter",
};

export default async function Page() {
  return (
    <div className="flex flex-col items-center  px-4 sm:px-20 pb-40 sm:pb-20">
      <div className="flex mt-10 max-w-[1400px] flex-col text-center justify-center">
        <AboutSection page={true} />
      </div>
    </div>
  );
}
