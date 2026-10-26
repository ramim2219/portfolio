import OriginalRouteLayout from "@/src/components/OriginalRouteLayout";
import Portfolio from "@/src/components/Portfolio";

export default function ProjectsPage() {
  return (
    <OriginalRouteLayout seo={{ title: "Projects & Case Studies", description: "Professional projects, e-commerce applications, web development tools and case studies built by Shafayet Ullah Ramim.", path: "/projects" }}>
      <Portfolio />
    </OriginalRouteLayout>
  );
}
