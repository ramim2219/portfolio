import OriginalRouteLayout from "@/src/components/OriginalRouteLayout";
import Contact from "@/src/components/Contact";

export default function ContactPage() {
  return (
    <OriginalRouteLayout seo={{ title: "Contact & Hire Me", description: "Get in touch with Shafayet Ullah Ramim for full-stack web development, React, Laravel, software projects and opportunities.", path: "/contact" }}>
      <Contact />
    </OriginalRouteLayout>
  );
}
