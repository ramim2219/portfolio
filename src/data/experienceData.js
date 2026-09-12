// src/data/experienceData.js
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
      "Front-end developer on a 6-member team (5 frontend · 1 SQA) building admin-facing panels with React.js against APIs delivered by the senior engineering team. Shipped 50+ production reports and 9+ management panels now in active university use.",
    fullDescription:
      "As a Software Developer Trainee at Premier University, Chittagong, I work on the university's internal admin systems — the platform used by teachers, admins, accountants, and office staff for day-to-day academic and administrative operations. I sit on a 6-person team (5 frontend developers and 1 SQA engineer) and report to a senior engineering lead who designs the backend APIs. My work spans building management panels in React.js, designing production-grade PDF reports, and — in two cases — building the backend APIs myself in ASP.NET after being entrusted to own those modules end-to-end.",
    image: "/assets/img/puc.png",
    roleInfo: [
      { label: "Duration", value: "Ongoing" },
      { label: "Type", value: "Traineeship" },
      { label: "Team", value: "6 members (5 FE · 1 SQA)" },
      { label: "Location", value: "Chittagong, BD" },
    ],
    topics: [
      "React.js",
      "ASP.NET",
      "REST API",
      "MySQL",
      "PDF Generation",
      "Admin Panels",
      "Report Design",
      "Git",
      "Agile",
      "Code Review",
    ],
    responsibilities: [
      "Menu Management Panel — allows admins to add menus, submenus, and control role-based access, including assigning menus to specific users and roles.",
      "Designed 50+ production reports for teachers, admins, and accountants — including Grade Sheets, Attendance Sheets, and Form Sale Reports — with in-browser PDF export.",
      "ID Card Panel — bulk ID card generation and download for students based on session, department, and batch.",
      "Tabulation Panel — tabulation reports for regular, residual, and retake students, with per-semester and per-course breakdowns.",
      "Stores Management Panel — designed the UI and built the backend API in ASP.NET end-to-end.",
      "Supplier Management Panel — designed the UI and built the backend API in ASP.NET end-to-end.",
      "GT Bill Panel — internal billing and reconciliation interface for the accounts section.",
      "Course Evaluation Report Panel — faculty-wise and course-wise evaluation reporting for academic review.",
      "Credit Transfer Panel — student credit-transfer processing and full history tracking.",
      "Collaborated daily with the senior API team, participated in code reviews, and followed an agile workflow.",
    ],
    outcomes: [
      {
        title: "50+ Reports Now in Active University Use",
        text: "Designed and shipped more than 50 PDF reports covering academics, examinations, accounts, and student services — every one currently in production use across the university.",
      },
      {
        title: "End-to-End Ownership of Two Modules",
        text: "After demonstrating reliability on the front-end work, I was entrusted with building the backend APIs for the Stores and Supplier panels in ASP.NET — full ownership from database to UI.",
      },
      {
        title: "Real Production Impact at Scale",
        text: "Every panel I built serves real university staff — teachers, admins, accountants, and office personnel — rather than demo users. This is production code, not a training exercise.",
      },
      {
        title: "Team-Based Engineering Discipline",
        text: "Learned to work within a structured 6-person team with clear role separation, daily coordination with the API owner, and code review standards.",
      },
    ],
  },
  {
    id: "ifjona-remote-developer",
    title: "Remote Full-Stack Developer (Contract)",
    subtitle: "IFJONA — US-based E-commerce Client · 2024 – Present",
    org: "IFJONA (US-based client)",
    period: "2024 – Present",
    status: "Ongoing",
    tag: "Remote Contract",
    description:
      "Maintained a live production e-commerce platform for an international client — handling orders, payments, and post-deployment feature work across a Laravel + MySQL stack.",
    fullDescription:
      "Engaged remotely by a United States-based client to manage the day-to-day operational and administrative upkeep of a live e-commerce platform. This is a production system serving international customers, which meant every change had to be tested carefully and shipped without breaking live traffic. My work covered order administration, payment gateway configuration, delivery tracking, and feature delivery on the React + Laravel stack.",
    image: "/assets/img/puc.png", // replace with ifjona logo when available
    roleInfo: [
      { label: "Duration", value: "Ongoing" },
      { label: "Type", value: "Remote Contract" },
      { label: "Client", value: "US-based e-commerce" },
      { label: "Mode", value: "Remote" },
    ],
    topics: [
      "React.js",
      "Laravel",
      "MySQL",
      "Stripe",
      "PayPal",
      "Cash on Delivery",
      "VPS Deployment",
      "REST API",
    ],
    responsibilities: [
      "Handled multi-country and multi-currency order administration across the platform.",
      "Configured and maintained payment gateways — Stripe, PayPal, and Cash on Delivery.",
      "Delivered post-deployment features and long-term production support on a VPS-hosted Laravel + MySQL stack.",
      "Built and shipped React.js front-end interfaces backed by Laravel REST APIs.",
      "Maintained accurate, deadline-driven documentation for feature updates and support tickets.",
    ],
    outcomes: [
      {
        title: "Live Production Support",
        text: "Directly responsible for keeping a revenue-generating e-commerce platform healthy — orders, payments, and customer-facing flows all under my watch.",
      },
      {
        title: "International Payment Handling",
        text: "Integrated and maintained multiple payment gateways across currencies, ensuring reliable checkout for customers in different regions.",
      },
    ],
  },
];

export const getExperienceById = (id) =>
  experienceData.find((role) => String(role.id) === String(id));