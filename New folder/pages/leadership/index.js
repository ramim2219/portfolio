import Link from "next/link";
import OriginalRouteLayout from "@/src/components/OriginalRouteLayout";
import SectionTitle from "@/src/components/SectionTitle";
import { leadershipData } from "@/src/data/leadershipData";

export default function LeadershipPage() {
  return <OriginalRouteLayout seo={{ title: "Leadership & Mentoring", description: "Leadership, competitive programming training and mentoring experience of Shafayet Ullah Ramim.", path: "/leadership" }}>
    <section className="section about-section bg-gray" id="about"><div className="container">
      <SectionTitle heading="Leadership" subHeading="Leadership & Mentoring" text="My leadership roles, training and mentoring contributions." />
      <div className="row g-4">
        {leadershipData.map(item => <div key={item.id} className="col-lg-6 col-md-6"><div className="achievement-card" style={{height:"100%"}}>
          {item.image && <Link href={`/leadership/${item.id}`}><img src={item.image} alt={item.title} loading="lazy" decoding="async" style={{width:"100%",height:200,objectFit:"contain",marginBottom:16}} /></Link>}
          <h3 style={{fontSize:20}}>{item.title}</h3><p>{item.description}</p>
          <Link className="learn-more-btn" href={`/leadership/${item.id}`}>View Details →</Link>
        </div></div>)}
      </div>
    </div></section>
  </OriginalRouteLayout>;
}
