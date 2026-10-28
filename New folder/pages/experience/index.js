import OriginalRouteLayout from "@/src/components/OriginalRouteLayout";
import Skill from "@/src/components/Skill";

export default function ExperiencePage() {
  return (
    <OriginalRouteLayout seo={{ title: "Experience & Skills", description: "Explore professional software development experience, React.js, Laravel, ASP.NET, full-stack development and software projects by Shafayet Ullah Ramim.", path: "/experience" }}>
      <Skill mode="experience" />
    </OriginalRouteLayout>
  );
}
