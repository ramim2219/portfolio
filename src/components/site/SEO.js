import Head from "next/head";
import { site } from "@/src/config/site";

export const absoluteUrl = (path = "/") => new URL(path, site.origin).toString();
const safeJson = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");
export default function SEO({ title, description, path = "/", image, type = "website", schemas = [], noindex = false }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.role}`;
  const desc = String(description || site.description).slice(0, 240);
  const url = absoluteUrl(path);
  const picture = absoluteUrl(image || site.image);
  const crumbs = path.split("/").filter(Boolean);
  const breadcrumbs = crumbs.length ? {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.origin + "/" },
      ...crumbs.map((part, i) => ({ "@type": "ListItem", position: i + 2,
        name: i === crumbs.length - 1 && title ? title : part.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        item: absoluteUrl("/" + crumbs.slice(0, i + 1).join("/")) }))]
  } : null;
  const structured = [
    { "@context": "https://schema.org", "@type": "WebPage", name: fullTitle, description: desc, url, isPartOf: { "@type": "WebSite", name: site.name, url: site.origin } },
    ...(breadcrumbs ? [breadcrumbs] : []),
    ...schemas,
  ];
  return <Head>
    <title key="title">{fullTitle}</title>
    <meta name="description" content={desc} key="description" />
    <link rel="canonical" href={url} key="canonical" />
    <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} key="robots"/>
    <meta property="og:site_name" content={site.name} key="ogsite" />
    <meta property="og:type" content={type} key="ogtype" />
    <meta property="og:title" content={fullTitle} key="ogtitle" />
    <meta property="og:description" content={desc} key="ogdesc" />
    <meta property="og:url" content={url} key="ogurl" />
    <meta property="og:image" content={picture} key="ogimage" />
    <meta property="og:image:alt" content={`${site.name} portfolio preview`} key="ogalt" />
    <meta name="twitter:card" content="summary_large_image" key="twittercard" />
    <meta name="twitter:title" content={fullTitle} key="twittertitle" />
    <meta name="twitter:description" content={desc} key="twitterdesc" />
    <meta name="twitter:image" content={picture} key="twitterimage" />
    <script key="ldjson" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(structured.length === 1 ? structured[0] : structured) }} />
  </Head>;
}
