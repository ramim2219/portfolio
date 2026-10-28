import Head from "next/head";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Home from "@/src/components/Home";
import Portfolio from "@/src/components/Portfolio";
import Skill from "@/src/components/Skill";
import Research from "@/src/components/Research";   // ⭐ NEW
import Testimonial from "@/src/components/Testimonial";
import About from '@/src/components/About';
import ImageView from "@/src/components/popup/ImageView";
import { boston } from "@/src/utils";
import { Fragment, useEffect } from "react";
import Education from "@/src/components/Education";
import SEO from "@/src/components/site/SEO";
import { PersonSchema } from "@/src/components/OriginalRouteLayout"; 

const Index = () => {
  useEffect(() => {
    boston.imgToSvg();
  }, []);

  return (
    <Fragment>
      <Head><link rel="preload" as="image" href="/assets/img/home-banner-optimized.webp" /></Head>
      <SEO schemas={[PersonSchema()]} />
      <ImageView />
      {/* End */}

      {/* Header */}
      <Header />
      {/* End Header */}

      {/* Main */}
      <main className="wrapper">
        {/* Home Section */}
        <Home />
        {/* End Home Section */}

        {/* About Section */}
        <About />
        {/* End About Section */}

        {/* Education Section */}
        <Education />
        {/* End Education Section */}

        {/* Skill Section */}
        <Skill />
        {/* End Skill Section */}

        {/* Research Section */}
        <Research />
        {/* End Research Section */}

        {/* Work Section */}
        <Portfolio />
        {/* End Work Section */}

        {/* Services Section */}
        {/* <Services /> */}
        {/* End Services Section */}

        {/* testimonial Section */}
        <Testimonial />
        {/* End testimonial Section */}

        {/* Contact Section */}
        <Contact />
        {/* End Contact Section */}

        {/* Effect */}
        <div className="right-effects" />
        <div className="left-effects" />
        {/* End Effect */}
      </main>
      {/* Main */}

      {/* Footer */}
      <Footer />
      {/* End Footer */}

    </Fragment>
  );
};

export default Index;