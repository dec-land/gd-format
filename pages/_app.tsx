import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from '@vercel/analytics/react';
import { Footer }from '../components/Footer'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <main className={inter.className}>
      <ToastContainer autoClose={2000} />
      <Component {...pageProps} />        
      <SpeedInsights/>
      <Analytics/>
      <Footer/>
    </main>
  );
}

export default App;
