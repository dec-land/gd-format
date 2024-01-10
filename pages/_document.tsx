import { Metadata } from "next";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { useEffect } from "react";


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

  useEffect(() => {
    var ads = document.getElementsByClassName('adsbygoogle').length;
    for (var i = 0; i < ads; i++) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);

  return (
    <Html lang="en">
      <Head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9568267309357674"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
