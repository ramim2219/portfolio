// Central source of truth for leadership roles.
// Used by the Leadership strip in About.js and the full case-study
// page at pages/leadership/[id].js.
//
// To add a new role: add an object below with a unique `id`.

export const leadershipData = [
  {
    id: "competitive-programming-trainer",
    title: "Competitive Programming Trainer",
    subtitle: "PUC CSE Club · Jul 2024 – Aug 2025",
    org: "PUC CSE Club",
    period: "Jul 2024 – Aug 2025",
    status: "Completed",
    tag: "Leadership Role",
    description:
      "Trained junior students of the PUC CSE Club in competitive programming — from their first line of C++ to representing the university at regional IUPC and ICPC contests.",
    fullDescription:
      "As the Competitive Programming Trainer at PUC CSE Club, I designed and ran a structured training program that took students from programming basics to contest-level problem solving. I built the syllabus myself, curated practice problems, ran live solving sessions, and mentored teams preparing for inter-university contests.",
    image: "/assets/img/cpp-trainer.jpeg",
    // Info sidebar
    roleInfo: [
      { label: "Duration", value: "14 months" },
      { label: "Sessions", value: "60+ training classes" },
      { label: "Mentees", value: "40+ students" },
      { label: "Contests Prep", value: "5+ IUPC teams" },
    ],
    // Topics / tech-style tags
    topics: [
      "C++", "STL", "Time Complexity", "Arrays", "Strings",
      "Sorting", "Binary Search", "Two Pointers", "Greedy",
      "Recursion", "Graph Theory", "Dynamic Programming",
      "Number Theory", "Codeforces", "CodeChef",
    ],
    // Key responsibilities
    responsibilities: [
      "Designed and delivered weekly competitive programming sessions for junior students of PUC CSE Club.",
      "Introduced beginners to core problem-solving topics: arrays, strings, sorting, searching, and basic graph theory.",
      "Guided students through live problem-solving sessions on Codeforces, CodeChef, and other judges.",
      "Prepared practice problem sets and editorial write-ups to help students learn from their mistakes.",
      "Mentored students one-on-one before regional IUPC and ICPC contests.",
    ],
    // Impact & outcomes
    outcomes: [
      {
        title: "Beginner to Contest-Ready",
        text: "Took students from writing their first loop to confidently competing in regional-level programming contests.",
      },
      {
        title: "Team Formation for IUPC",
        text: "Helped form and prepare multiple teams that went on to represent PUC in IUPC and ICPC regional events.",
      },
      {
        title: "Culture of Problem Solving",
        text: "Built a consistent practice culture within the club — students regularly solve problems together outside of classes.",
      },
    ],
  },
];

export const getLeadershipById = (id) =>
  leadershipData.find((role) => String(role.id) === String(id));