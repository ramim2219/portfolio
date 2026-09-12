// Central source of truth for achievements & certifications.
// Used by:
//   - src/components/About.js (the badge grids + gallery sliders)
//   - pages/achievements/[id].js (the full detail page)
//   - pages/certifications/[id].js (the full detail page)
//
// Each entry has a unique `id`, shared `image` (used as the card
// thumbnail AND the gallery default), and optional `gallery`.
//
// NOTE ON LOCAL IMAGES:
//   Files inside `public/` are served from the site root ("/").
//   So `public/assets/img/icpc-dhaka-2024.jpg` is referenced as
//   "/assets/img/icpc-dhaka-2024.jpg" — no "public", always leading "/".

const rawAchievements = [
  {
    id: "icpc-dhaka-2024",
    type: "achievement",
    title: "ICPC Dhaka Regional 2024",
    subtitle: "International Collegiate Programming Contest",
    rank: "#213",
    rankLabel: "Ranked 213 / 307 teams",
    date: "2024",
    location: "Dhaka, Bangladesh",
    team: "PUC Team", // add real team name
    description:
      "Competed in the ICPC Dhaka Regional 2024, one of the most prestigious programming contests in Bangladesh. Our team solved multiple problems under strict time pressure against 307 teams from across the region.",
    fullDescription:
      "The International Collegiate Programming Contest (ICPC) is the oldest and most prestigious algorithmic programming contest in the world. At the Dhaka Regional 2024, our team represented Premier University, Chittagong against 307 competing teams. The contest tested data structures, algorithms, and teamwork across a 5-hour window.",
    highlights: [
      "Solved 2 algorithmic problems within the 5-hour window",
      "Ranked 213 out of 307 competing teams",
      "Represented Premier University, Chittagong",
    ],
    image: "/assets/img/icpc-dhaka-2024.jpg",
    gallery: ["/assets/img/icpc-dhaka-2024.jpg",
      "/assets/img/my_activities/icpc/icpc.jpg",
      "/assets/img/my_activities/icpc/icpc-dhaka-2024.jpeg",
    ],
    link: "",
  },
  {
    id: "duet-iupc-2023",
    type: "achievement",
    title: "DUET IUPC 2023",
    subtitle: "Inter-University Programming Contest",
    rank: "#64",
    rankLabel: "Ranked 64 / 170 teams",
    date: "2023",
    location: "DUET, Gazipur",
    description:
      "Competed in the DUET Inter-University Programming Contest 2023 and secured 64th position out of 170 teams.",
    fullDescription:
      "The DUET IUPC is an inter-university programming contest hosted by Dhaka University of Engineering & Technology. Our team placed 64th out of 170 teams, solving a solid set of algorithmic problems.",
    highlights: [
      "Ranked 64th out of 170 teams",
      "Solved 4 algorithmic problems covering graphs, DP, and math",
    ],
    image: "/assets/img/duet-iupc-2023.jpg",
    gallery: ["/assets/img/duet-iupc-2023.jpg"],
    link: "",
  },
  {
    id: "iiuc-iupc-2025",
    type: "achievement",
    title: "IIUC IUPC 2025",
    subtitle: "Inter-University Programming Contest",
    rank: "#42",
    rankLabel: "Ranked 42nd position",
    date: "2025",
    location: "IIUC, Chittagong",
    description:
      "Secured 42nd position at the IIUC Inter-University Programming Contest 2025, solving 2 problems.",
    fullDescription:
      "Hosted by International Islamic University Chittagong, the IIUC IUPC 2025 brought together strong teams from across the country. Our team placed 42nd overall.",
    highlights: [
      "Ranked 42nd position overall",
      "Consistent problem-solving under contest pressure",
    ],
    image: "/assets/img/iiuc-iupc-2025.jpg",
    gallery: ["/assets/img/iiuc-iupc-2025.jpg"],
    link: "",
  },
  {
    id: "bu-iupc-2025",
    type: "achievement",
    title: "BU IUPC 2025",
    subtitle: "Inter-University Programming Contest",
    rank: "#6",
    rankLabel: "Ranked 6th position",
    date: "2025",
    location: "University of Barishal",
    description:
      "Achieved 6th position at the BU Inter-University Programming Contest 2025 — an individual problem-solving contest where I solved 4 problems.",
    fullDescription:
      "The BU IUPC 2025 was one of my strongest performances. It was an individual problem-solving contest, and I placed 6th overall while solving 4 problems under contest pressure.",
    highlights: [
      "Ranked 6th position — top 10 finish",
      "Individual problem-solving contest",
      "Solved 4 problems",
    ],
    image: "/assets/img/bu_iupc_2025.jpg",
    gallery: ["/assets/img/bu_iupc_2025.jpg"],
    link: "",
  },
  {
    id: "puc-iupc-2024",
    type: "achievement",
    title: "PUC IUPC 2024",
    subtitle: "Inter-University Programming Contest",
    rank: "#48",
    rankLabel: "Ranked 48th position",
    date: "2024",
    location: "Premier University, Chittagong",
    description:
      "Ranked 48th at the PUC Inter-University Programming Contest 2024, held on home ground. Solved 4 problems.",
    fullDescription:
      "Hosted by Premier University, Chittagong, the PUC IUPC 2024 was a home-ground contest for our team. We placed 48th out of a competitive field.",
    highlights: [
      "Ranked 48th position",
      "Competed on home ground at PUC",
      "Solved 4 problems",
    ],
    image: "/assets/img/my_activities/puc/puc.jpg",
    gallery: ["/assets/img/my_activities/puc/puc.jpg"],
    link: "",
  },
];

const rawCertifications = [
  {
    id: "cpp-trainer",
    type: "certification",
    title: "Competitive Programming Trainer",
    subtitle: "PUC CSE Club",
    date: "Jul 2024 – Aug 2025",
    issuer: "PUC CSE Club",
    description:
      "Served as a Competitive Programming Trainer at the PUC CSE Club, mentoring junior students in data structures and algorithms.",
    fullDescription:
      "As a Competitive Programming Trainer at the PUC CSE Club, I designed and delivered training sessions on data structures, algorithms, and problem-solving strategies. I mentored junior students preparing for IUPCs and ICPC, helping them build a strong foundation in competitive programming.",
    highlights: [
      "Trained junior students in DSA & problem solving",
      "Prepared teams for IUPC and ICPC contests",
      "Designed the training curriculum and practice problem sets",
    ],
    image: "/assets/img/cpp-trainer.jpeg",
    gallery: ["/assets/img/cpp-trainer.jpeg"],
    link: "",
  },
  {
    id: "icpc",
    type: "certification",
    title: "ICPC Certificate",
    subtitle: "International Collegiate Programming Contest",
    date: "2024",
    issuer: "ICPC",
    description: "Certificate of participation in the ICPC Dhaka Regional 2024.",
    fullDescription:
      "Official certificate of participation in the International Collegiate Programming Contest (ICPC) Dhaka Regional 2024.",
    highlights: ["Official ICPC participation certificate"],
    image: "/assets/img/icpc.jpg",
    gallery: ["/assets/img/icpc.jpg"],
    link: "",
  },
  {
    id: "duet-cert",
    type: "certification",
    title: "DUET IUPC Certificate",
    subtitle: "Inter-University Programming Contest",
    date: "2023",
    issuer: "DUET",
    description: "Certificate for participation in DUET IUPC 2023.",
    fullDescription:
      "Certificate of participation in the DUET Inter-University Programming Contest 2023.",
    highlights: ["DUET IUPC 2023 participation"],
    image: "/assets/img/duet.jpg",
    gallery: ["/assets/img/duet.jpg"],
    link: "",
  },
  {
    id: "iiuc-cert",
    type: "certification",
    title: "IIUC IUPC Certificate",
    subtitle: "Inter-University Programming Contest",
    date: "2025",
    issuer: "IIUC",
    description: "Certificate for participation in IIUC IUPC 2025.",
    fullDescription:
      "Certificate of participation in the IIUC Inter-University Programming Contest 2025.",
    highlights: ["IIUC IUPC 2025 participation"],
    image: "/assets/img/iiuc.jpg",
    gallery: ["/assets/img/iiuc.jpg"],
    link: "",
  },
  {
    id: "puc-cert",
    type: "certification",
    title: "PUC IUPC Certificate",
    subtitle: "Inter-University Programming Contest",
    date: "2024",
    issuer: "Premier University, Chittagong",
    description: "Certificate for participation in PUC IUPC 2024.",
    fullDescription:
      "Certificate of participation in the PUC Inter-University Programming Contest 2024.",
    highlights: ["PUC IUPC 2024 participation"],
    image: "/assets/img/puc.jpg",
    gallery: ["/assets/img/puc.jpg"],
    link: "",
  },
  {
    id: "gfg-cert",
    type: "certification",
    title: "GeeksforGeeks Certificate",
    subtitle: "GeeksforGeeks",
    date: "",
    issuer: "GeeksforGeeks",
    description: "Certificate from GeeksforGeeks.",
    fullDescription:
      "Certificate awarded by GeeksforGeeks for coursework and problem-solving achievement.",
    highlights: ["GeeksforGeeks certification"],
    image: "/assets/img/gfg.jpg",
    gallery: ["/assets/img/gfg.jpg"],
    link: "",
  },
];

const normalize = (item) => ({
  ...item,
  gallery:
    item.gallery && item.gallery.length > 0 ? item.gallery : [item.image],
});

export const achievementsData = rawAchievements.map(normalize);
export const certificationsData = rawCertifications.map(normalize);

export const allAchievements = [...achievementsData, ...certificationsData];

export const getAchievementById = (id) =>
  allAchievements.find((item) => String(item.id) === String(id));