// pages/research.jsx
import { Fragment, useEffect } from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ResearchDetail from "@/src/components/ResearchDetail";
import { boston } from "@/src/utils";

export default function ResearchPage() {
  useEffect(() => {
    // Do NOT call boston.scrollToActiveNav() here.
    // That helper is designed for the one-page home layout and will strip
    // the "active" class that Header.jsx adds based on router.pathname.
    boston.imgToSvg();
  }, []);

  return (
    <Fragment>
      <Header />
      <main className="wrapper" style={{ paddingTop: "90px" }}>
        <ResearchDetail />
      </main>
      <Footer />
    </Fragment>
  );
}