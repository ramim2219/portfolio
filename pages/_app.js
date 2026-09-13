import Preloader from "@/src/components/Preloader";
import { ThemeProvider } from "@/src/context/ThemeContext";
import "@/styles/globals.css";
import { Fragment, useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, []);

  return (
    <ThemeProvider>
      <Fragment>
        {loader && <Preloader />}
        <Component {...pageProps} />
      </Fragment>
    </ThemeProvider>
  );
}