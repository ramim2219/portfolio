import Link from "next/link";
import OriginalRouteLayout from "@/src/components/OriginalRouteLayout";
import SectionTitle from "@/src/components/SectionTitle";
import { achievementsData, certificationsData } from "@/src/data/achievementsData";

export default function AchievementsPage() {
  return <OriginalRouteLayout seo={{ title: "Achievements & Certifications", description: "Programming contest achievements and certifications of Shafayet Ullah Ramim.", path: "/achievements" }}>
    <section className="section about-section bg-gray" id="about"><div className="container">
      <SectionTitle heading="Achievements & Certifications" subHeading="My Achievements" text="Competitive programming, awards and certificates." />
      <div className="row g-4">
        {[...achievementsData, ...certificationsData].map(item => <div key={item.id} className="col-lg-4 col-md-6">
          <div className="achievement-card" style={{height:"100%"}}>
            {item.image && <Link href={`/achievements/${item.id}`}><img src={item.image} alt={item.title} loading="lazy" decoding="async" style={{width:"100%",aspectRatio:"16/9",objectFit:"cover",borderRadius:10,marginBottom:16}} /></Link>}
            <h3 style={{fontSize:18}}>{item.title}</h3><p>{item.subtitle || item.rank || "Certificate and achievement details"}</p>
            <Link className="learn-more-btn" href={`/achievements/${item.id}`}>View Details →</Link>
          </div>
        </div>)}
      </div>
    </div></section>
  </OriginalRouteLayout>;
}
