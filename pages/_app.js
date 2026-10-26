import dynamic from "next/dynamic";
import { ThemeProvider } from "@/src/context/ThemeContext";
import "@/styles/globals.css";

// Avoid server-rendering the browser-dependent assistant. Same original widget and design.
const Chatbot = dynamic(() => import("@/src/components/Chatbot"), { ssr: false });

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Chatbot />
    </ThemeProvider>
  );
}
