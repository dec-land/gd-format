import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";
import { ThemeProvider } from "../context/theme";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://gdscriptformatter.com"),
  title: "GDScript Formatter",
  description: "Prettify your GDScript code and more",
  icons: "/favicon.ico",
  robots: "index, follow",

  keywords:
    "gdscript formatter, gdscriptformatter, gdscript linter, godot formatter, gdscript to c# converter",
  authors: { name: "Declan Fitzpatrick" },

  openGraph: {
    siteName: "GDScript Formatter",
    title: "GDScript Formatter",
    description: "Prettify your GDScript code and more",
    type: "website",
    url: "https://gdscriptformatter.com",
  },
  twitter: {
    title: "GDScript Formatter",
    description: "Prettify your GDScript code and more",
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="lazyOnload"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className}`}>
        <ToastContainer autoClose={2000} />
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
