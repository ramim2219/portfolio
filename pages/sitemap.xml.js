import { portfolioData } from "@/src/data/portfolioData";
import { experienceData } from "@/src/data/experienceData";
import { allAchievements } from "@/src/data/achievementsData";
import { leadershipData } from "@/src/data/leadershipData";
import { site } from "@/src/config/site";

const routes = ["/", "/projects", "/experience", "/about", "/skills", "/education", "/research", "/research/thesis", "/achievements", "/leadership", "/contact"];
const xmlEscape = (str) => str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
export function getServerSideProps({res}) {
  const urls = [
    ...routes,
    ...portfolioData.map(x => `/projects/${x.id}`),
    ...experienceData.map(x => `/experience/${x.id}`),
    ...allAchievements.map(x => `/achievements/${x.id}`),
    ...leadershipData.map(x => `/leadership/${x.id}`)
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(route => `<url><loc>${xmlEscape(site.origin + route)}</loc></url>`).join("\n")}\n</urlset>`;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(sitemap); res.end();
  return {props:{}};
}
export default function Sitemap() { return null; }
