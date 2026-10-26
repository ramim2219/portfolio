import OriginalRouteLayout from "@/src/components/OriginalRouteLayout";
import Education from "@/src/components/Education";

export default function EducationPage() {
  return (
    <OriginalRouteLayout seo={{ title: "Education", description: "Education and academic background of Shafayet Ullah Ramim, software developer and computer science engineer.", path: "/education" }}>
      <Education />
    </OriginalRouteLayout>
  );
}
