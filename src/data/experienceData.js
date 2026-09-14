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
    id: "ifjona-ecommerce-marketplace",
    title: "Ifjona E-commerce Marketplace",
    subtitle: "Full-Stack Developer · React.js · Laravel · MySQL · Jan 2025 – Present",
    org: "Ifjona",
    period: "January 2025 – Present",
    status: "Ongoing",
    tag: "Full-Stack Project",
    description:
      "A full-stack e-commerce marketplace built with React.js, Laravel, and MySQL. Includes a dynamic admin panel, VPS deployment, WebSocket integration, AI integration, and secure payment integration — with a thesis-backed multilingual review analysis engine.",
    fullDescription:
      "Ifjona is a production e-commerce marketplace built end-to-end, from database design to deployment. The platform gives store owners a dynamic admin panel to manage products, orders, and customers, while shoppers get a fast, modern storefront. Real-time features are powered by WebSockets, AI is used to enhance parts of the shopping experience, and payments are processed through a secure, integrated gateway. A standout feature is the Review Management module — the core of my undergraduate thesis — which automatically classifies negative customer reviews across four issue categories (Product, Delivery, Monetary, Customer Service) in Bangla, English, and Banglish. The app is deployed and running live on a VPS.",
    image: "/assets/img/puc.png", // replace with ifjona logo when available
    roleInfo: [
      { label: "Duration", value: "Jan 2025 – Present" },
      { label: "Type", value: "Full-Stack Build" },
      { label: "Stack", value: "React.js · Laravel · MySQL" },
      { label: "Status", value: "Live — ifjona.com" },
    ],
    topics: [
      "React.js",
      "Laravel",
      "MySQL",
      "WebSocket",
      "FastAPI",
      "NLP",
      "Multilingual Text Classification",
      "Payment Gateway",
      "VPS Deployment",
    ],
    responsibilities: [
      "Built a dynamic, role-based admin panel for managing products, orders, and customers.",
      "Integrated WebSocket connections so inventory and order updates push instantly to both the storefront and admin panel instead of relying on polling.",
      "Added AI-assisted features to enhance product discovery and the shopping experience.",
      "Integrated a secure, end-to-end payment gateway with server-side validation, keeping sensitive payment logic off the client.",
      "Deployed and maintained the platform on a production VPS.",
      "Built a multilingual (Bangla, English, Banglish) negative-review classification engine in FastAPI — the core of my undergraduate thesis — auto-triggered on reviews rated ≤3 and sorted into four issue categories: Product, Delivery, Monetary, and Customer Service.",
    ],
    outcomes: [
      {
        title: "Live Production Marketplace",
        text: "Designed and shipped a full-stack e-commerce platform end-to-end — from database design to VPS deployment — now running live at ifjona.com.",
      },
      {
        title: "Real-Time Sync at Scale",
        text: "Replaced polling with WebSocket connections so inventory and order status update instantly across the storefront and admin dashboard for many concurrent shoppers.",
      },
      {
        title: "Thesis Feature Shipped to Production",
        text: "Integrated my undergraduate thesis — a multilingual negative-review classification engine — directly into the admin panel, giving store owners an automated, data-driven view of recurring product complaints.",
      },
      {
        title: "Secure Payment Handling",
        text: "Integrated a secure payment gateway with server-side validation, keeping checkout simple for customers while sensitive payment logic stays off the client.",
      },
    ],
    gallery: [
      {
        src: "/assets/img/my_activities/Projects/Ifjona/Ifjona/Home.pdf",
        caption: "Homepage",
      },
      {
        src: "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/Dashboard.pdf",
        caption: "Admin Dashboard Overview",
      },
      {
        src: "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/adding products.pdf",
        caption: "Product Management",
      },
      {
        src: "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/order managemnt.pdf",
        caption: "Order & Shipment Management",
      },
      {
        src: "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/Review MAnagement.pdf",
        caption: "Thesis Feature — Review Management",
      },
      {
        src: "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/coupon management.pdf",
        caption: "Coupons, Offers & Promotions",
      },
      {
        src: "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/tax report generator.pdf",
        caption: "Tax Reports & Compliance",
      },
      {
        src: "/assets/img/my_activities/Projects/Ifjona/Ifjona/shop_page.pdf",
        caption: "Customer-Facing Storefront",
      },
      {
        src: "/assets/img/my_activities/Projects/Ifjona/Ifjona/checkout.pdf",
        caption: "Secure Checkout",
      },
      {
        src: "/assets/img/my_activities/Projects/Ifjona/Ifjona/order_tracking.pdf",
        caption: "Real-Time Order Tracking",
      },
      {
        src: "/assets/img/my_activities/Projects/Ifjona/Ifjona/live chat.pdf",
        caption: "Live Chat Support",
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