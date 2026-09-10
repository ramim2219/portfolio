// Central source of truth for work experience entries.
// Used by the Experience strip in About.js and the full case-study
// page at pages/experience/[id].js.
//
// To add a new role: add an object below with a unique `id`.

export const experienceData = [
  {
    id: "software-developer-trainee",
    title: "Software Developer Trainee",
    subtitle: "Premier University, Chittagong · Dec 2025 – Present",
    org: "Premier University, Chittagong",
    period: "Dec 2025 – Present",
    status: "Current",
    tag: "Current Role",
    description:
      "Working as a Software Developer Trainee at Premier University, Chittagong — building full-stack web applications, contributing to production codebases, and collaborating with senior developers on real-world projects.",
    fullDescription:
      "As a Software Developer Trainee at Premier University, Chittagong, I work alongside senior developers on production web applications, from feature development to debugging and deployment. I contribute to both frontend and backend code, participate in code reviews, and follow agile workflows while continuing to sharpen my fundamentals in data structures, algorithms, and system design.",
    image: "/assets/img/puc.png",
    roleInfo: [
      { label: "Duration", value: "Ongoing" },
      { label: "Type", value: "Traineeship" },
      { label: "Location", value: "Chittagong, BD" },
      { label: "Mode", value: "On-site" },
    ],
    topics: [
      "React.js", "Next.js", "Laravel", "Node.js",
      "MySQL", "REST API", "Git", "Agile",
      "Code Review", "Debugging", "Deployment",
    ],
    responsibilities: [
      "Contributing to full-stack web application features across frontend and backend.",
      "Writing clean, maintainable code in React.js, Laravel, and MySQL.",
      "Participating in code reviews and following team coding standards.",
      "Debugging production issues and collaborating with senior developers to ship fixes.",
      "Attending daily standups and following agile development workflows.",
      "Continuously improving problem-solving skills through regular algorithmic practice.",
    ],
    outcomes: [
      {
        title: "Real-World Production Experience",
        text: "Working on live applications used by real users, learning how professional software is built, tested, and deployed.",
      },
      {
        title: "Full-Stack Growth",
        text: "Getting hands-on experience across the stack — from building React UIs to writing Laravel APIs and working with relational databases.",
      },
      {
        title: "Engineering Discipline",
        text: "Learning to write maintainable code, review peers' work, and follow structured development processes.",
      },
    ],
  },
];

export const getExperienceById = (id) =>
  experienceData.find((role) => String(role.id) === String(id));