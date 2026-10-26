import OriginalRouteLayout from "@/src/components/OriginalRouteLayout";
import Skill from "@/src/components/Skill";

export default function SkillsPage() {
  return (
    <OriginalRouteLayout seo={{ title: "Technical Skills & Experience", description: "Technical skills in React.js, Next.js, Laravel, PHP, ASP.NET, MySQL and development experience of Shafayet Ullah Ramim.", path: "/skills" }}>
      <Skill mode="skills" />
    </OriginalRouteLayout>
  );
}
