import { useEffect } from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import SEO from "@/src/components/site/SEO";
import { boston } from "@/src/utils";
import { site } from "@/src/config/site";

export function PersonSchema() {
  return {
    "@context": "https://schema.org", "@type": "Person", name: site.name,
    url: site.origin, jobTitle: site.role,
    image: `${site.origin}/assets/img/home-banner-optimized.webp`,
    address: { "@type": "PostalAddress", addressLocality: "Chattogram", addressCountry: "BD" },
    sameAs: Object.values(site.socials),
    knowsAbout: ["React.js", "Next.js", "Laravel", "ASP.NET", "MySQL", "Flutter", "Full-stack development"]
  };
}

export default function OriginalRouteLayout({ children, seo = {} }) {
  useEffect(() => { boston.imgToSvg(); }, []);
  return (
    <>
      <SEO {...seo} />
      <Header />
      <main className="wrapper original-route-page" id="main-content">
        {children}
        <div className="right-effects" />
        <div className="left-effects" />
      </main>
      <Footer />
    </>
  );
}
