import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/NavBar";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Footer } from "@/components/Footer";
import { Adsense } from "@ctrl/react-adsense";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <main className={inter.className}>
      <ToastContainer autoClose={2000} />
      <Navbar />
      <Component {...pageProps} />
      <Adsense
        client="ca-pub-9568267309357674"
        slot="4126867094"
        format="auto"
        responsive="true"
      />
      <Footer />
      <SpeedInsights />
      <Analytics />
    </main>
  );
}

export default App;
