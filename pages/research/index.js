import OriginalRouteLayout from "@/src/components/OriginalRouteLayout";
import Research from "@/src/components/Research";

export default function ResearchPage() {
  return (
    <OriginalRouteLayout seo={{ title: "Research & Publications", description: "Research in multilingual complaint classification, NLP, Bangla and Banglish review analysis and machine learning.", path: "/research" }}>
      <Research />
    </OriginalRouteLayout>
  );
}
