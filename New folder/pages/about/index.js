import OriginalRouteLayout from "@/src/components/OriginalRouteLayout";
import About from "@/src/components/About";

export default function AboutPage() {
  return (
    <OriginalRouteLayout seo={{ title: "About Me", description: "Learn about Shafayet Ullah Ramim, software developer based in Chattogram. Explore technical skills, achievements and professional background.", path: "/about" }}>
      <About />
    </OriginalRouteLayout>
  );
}
