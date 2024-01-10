import { Metadata } from "next";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata: Metadata = {
  title: "GDScript Formatter",
  description: "Prettify your GDScript code and more",
  icons: "/favicon.svg",

  keywords: "gdscript, godot, formatter, tools, linter",
  authors: { name: "Declan Fitzpatrick" },

  openGraph: {
    title: "GDScript Formatter",
    description: "Prettify your GDScript code and more",
    type: "website",
    url: "https://www.gdscriptformatter.com",
  },
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9568267309357674"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <SpeedInsights/>
        <Analytics/>
      </body>
    </Html>
  );
}
