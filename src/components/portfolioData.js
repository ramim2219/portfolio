// Central source of truth for portfolio projects.
// Used by src/components/Portfolio.js (the grid) and
// pages/projects/[id].js (the full case-study page for each project).
//
// To add a new project: add an object below with a unique `id`.
// `link` can be either a GitHub repo URL or a live site URL — it is
// automatically split into `repoUrl` / `liveUrl` at the bottom of this file.
//
// Optional extras used by the detail page (safe to leave blank/empty):
//   gallery     — array of screenshot URLs. Defaults to [image] below if omitted.
//   role        — your role on the project, e.g. "Full-Stack Developer (Solo)"
//   duration    — how long it took, e.g. "6 weeks". Leave "" to hide it on the page.
//   challenges  — array of { challenge, solution } pairs for the "Challenges &
//                 Solutions" section. These were drafted from the tech/features
//                 you already listed — edit them to match what actually happened.

const isGithubUrl = (url) => typeof url === "string" && url.includes("github.com");

const rawPortfolioData = [
  {
    id: 1,
    title: "Ifjona E-commerce Marketplace",
    subtitle: "React.js · Laravel · MySQL",
    description:
      "A full-stack e-commerce marketplace built with React.js, Laravel, and MySQL. Includes a dynamic admin panel, VPS deployment, WebSocket integration, AI integration, and secure payment integration.",
    fullDescription:
      "Ifjona is a production e-commerce marketplace built end-to-end, from database design to deployment. The platform gives store owners a dynamic admin panel to manage products, orders, and customers, while shoppers get a fast, modern storefront. Real-time features are powered by WebSockets, AI is used to enhance parts of the shopping experience, and payments are processed through a secure, integrated gateway. The app is deployed and running live on a VPS.",
    techStack: ["React.js", "Laravel", "MySQL", "WebSocket", "AI Integration", "Payment Gateway", "VPS Deployment"],
    features: [
      "Dynamic, role-based admin panel",
      "Real-time order & inventory updates via WebSocket",
      "AI-assisted shopping experience",
      "Secure end-to-end payment integration",
      "Deployed and running on a production VPS",
    ],
    role: "Full-Stack Developer",
    duration: "",
    challenges: [
      {
        challenge:
          "Keeping order status, inventory, and the admin dashboard in sync in real time across many concurrent shoppers.",
        solution:
          "Integrated WebSocket connections so inventory and order updates push instantly to both the storefront and admin panel instead of relying on polling.",
      },
      {
        challenge: "Handling payments securely while keeping checkout simple for customers.",
        solution:
          "Integrated a secure payment gateway with server-side validation, keeping sensitive payment logic off the client.",
      },
    ],
    image: "assets/img/ifjona.png",
    gallery: ["assets/img/ifjona.png"],
    link: "https://www.ifjona.com/",
    status: "live",
  },
  {
    id: 2,
    title: "Employee Development Systems",
    subtitle: "Laravel · MySQL",
    description:
      "A Laravel and MySQL-based system for tracking and managing employee growth, performance, and development within an organization.",
    fullDescription:
      "An internal-tools style application built with Laravel and MySQL to help organizations track employee development. It centralizes performance data, growth plans, and development records so managers can review progress and plan next steps, replacing scattered spreadsheets with a single structured system.",
    techStack: ["Laravel", "MySQL", "PHP", "Blade"],
    features: [
      "Structured employee records & development plans",
      "Centralized performance tracking",
      "Role-based access for managers and staff",
      "Relational MySQL schema for reporting",
    ],
    role: "Full-Stack Developer (Solo)",
    duration: "",
    challenges: [
      {
        challenge: "Replacing scattered spreadsheets with a single reliable source of truth for employee growth data.",
        solution:
          "Designed a normalized MySQL schema and Laravel Eloquent models so performance history and development plans live in one place.",
      },
      {
        challenge: "Giving managers and staff different levels of access to sensitive records.",
        solution: "Implemented role-based access control so managers and employees only see what's relevant to them.",
      },
    ],
    image: "assets/img/project-2.jpg",
    gallery: ["assets/img/project-2.jpg"],
    link: "https://github.com/ramim2219/employee-management-system",
    status: "live",
  },
  {
    id: 3,
    title: "CSE Helper",
    subtitle: "React · Tailwind CSS · MySQL",
    description:
      "A student-focused web application built with React, Tailwind CSS, and MySQL to help CSE students organize resources and coursework.",
    fullDescription:
      "CSE Helper is a resource hub built for Computer Science students, combining a React front end styled with Tailwind CSS and a MySQL-backed data layer. It brings together course materials, references, and tools that students commonly need in one organized place, with a clean, responsive interface.",
    techStack: ["React", "Tailwind CSS", "MySQL", "REST API"],
    features: [
      "Organized, searchable study resources",
      "Responsive, mobile-friendly interface",
      "MySQL-backed content management",
      "Fast client-side navigation with React",
    ],
    role: "Full-Stack Developer (Solo)",
    duration: "",
    challenges: [
      {
        challenge: "Keeping a growing library of study resources easy to browse and search.",
        solution: "Built a searchable, categorized resource structure backed by MySQL and a fast React front end.",
      },
      {
        challenge: "Making the app usable across devices for students on the go.",
        solution: "Styled the interface with Tailwind CSS for a fully responsive, mobile-first layout.",
      },
    ],
    image: "https://raw.githubusercontent.com/ramim2219/CSE_HELPER/refs/heads/main/home.png",
    gallery: ["https://raw.githubusercontent.com/ramim2219/CSE_HELPER/refs/heads/main/home.png"],
    link: "https://github.com/ramim2219/CSE_HELPER",
    status: "live",
  },
  {
    id: 4,
    title: "House Price Prediction",
    subtitle: "Django · Python · Machine Learning",
    description:
      "A machine learning web app built with Django, Python, HTML, and CSS that predicts house prices from key property features.",
    fullDescription:
      "This project pairs a trained regression model with a Django web front end so users can enter property details — like location, size, and amenities — and instantly get a predicted market price. It demonstrates a complete ML workflow: data preprocessing, model training, and serving predictions through a live web interface.",
    techStack: ["Django", "Python", "scikit-learn", "HTML", "CSS"],
    features: [
      "Trained regression model for price prediction",
      "Simple form-based input for property details",
      "Django backend serving real-time predictions",
      "Clean, minimal HTML/CSS interface",
    ],
    role: "ML Developer (Solo)",
    duration: "",
    challenges: [
      {
        challenge: "Turning a trained ML model into something non-technical users could actually use.",
        solution:
          "Wrapped the model in a Django web app with a simple form so users get instant predictions without touching code.",
      },
      {
        challenge: "Ensuring the model generalized well instead of overfitting to the training data.",
        solution: "Applied preprocessing and feature selection before training to improve prediction reliability.",
      },
    ],
    image: "https://raw.githubusercontent.com/ramim2219/house_price_prediction/refs/heads/main/three.png",
    gallery: ["https://raw.githubusercontent.com/ramim2219/house_price_prediction/refs/heads/main/three.png"],
    link: "https://github.com/ramim2219/house_price_prediction?tab=readme-ov-file",
    status: "live",
  },
  {
    id: 5,
    title: "Diabetes Risk Prediction",
    subtitle: "Django · Python · Machine Learning",
    description:
      "A diabetes risk prediction system built with Django, Python, HTML, and CSS using a trained classification model.",
    fullDescription:
      "A health-focused machine learning application that estimates a person's risk of diabetes based on inputs such as glucose level, BMI, and age. The trained classification model is served through a Django backend, with a simple web form so users can get an instant risk assessment.",
    techStack: ["Django", "Python", "scikit-learn", "HTML", "CSS"],
    features: [
      "Trained classification model for risk scoring",
      "Straightforward health-data input form",
      "Instant, server-side prediction via Django",
      "Lightweight, accessible interface",
    ],
    role: "ML Developer (Solo)",
    duration: "",
    challenges: [
      {
        challenge: "Presenting a health-risk prediction in a way that's clear and not alarming.",
        solution: "Designed a simple input form and straightforward result screen focused on clarity over complexity.",
      },
      {
        challenge: "Serving model predictions quickly through a web interface.",
        solution: "Served the trained classification model directly through Django for near-instant results.",
      },
    ],
    image: "https://raw.githubusercontent.com/ramim2219/DiabetesRiskPrediction/main/home_d.png",
    gallery: ["https://raw.githubusercontent.com/ramim2219/DiabetesRiskPrediction/main/home_d.png"],
    link: "https://github.com/ramim2219/DiabetesRiskPrediction?tab=readme-ov-file",
    status: "live",
  },
  {
    id: 6,
    title: "Village Scenario",
    subtitle: "Computer Graphics · C++",
    description:
      "A CGIP (Computer Graphics & Image Processing) course project that recreates a village scene through artistic coding.",
    fullDescription:
      "Built for a Computer Graphics & Image Processing course, this project recreates a full village scene entirely through code — houses, trees, and landscape elements are drawn and animated using core computer graphics concepts like primitives, transformations, and composition, without any external asset files.",
    techStack: ["C++", "OpenGL", "Computer Graphics"],
    features: [
      "Hand-coded scene composed of graphics primitives",
      "Demonstrates core CGIP transformation concepts",
      "No external image assets — fully procedural",
    ],
    role: "Developer (Course Project)",
    duration: "",
    challenges: [
      {
        challenge: "Recreating a realistic scene using only graphics primitives, with no external image assets.",
        solution:
          "Composed the scene from geometric shapes and transformations, layering primitives to build houses, trees, and terrain.",
      },
      {
        challenge: "Understanding and applying core CGIP transformation concepts correctly.",
        solution: "Iteratively tested translation, rotation, and scaling logic against the course requirements.",
      },
    ],
    image: "https://raw.githubusercontent.com/ramim2219/VillageScenerio/main/villageScenerio.png",
    gallery: ["https://raw.githubusercontent.com/ramim2219/VillageScenerio/main/villageScenerio.png"],
    link: "https://github.com/ramim2219/VillageScenerio",
    status: "live",
  },
  {
    id: 7,
    title: "Movie Finder",
    subtitle: "React · REST API",
    description:
      "A React-based app that lets users search for movies and view details using API integration.",
    fullDescription:
      "Movie Finder lets users search a live movie database and browse rich details — posters, ratings, and summaries — for each result. Built in React, it consumes a third-party movie API and focuses on fast, responsive search with a clean results layout.",
    techStack: ["React", "REST API", "CSS"],
    features: [
      "Live search against a movie API",
      "Detailed results with posters & ratings",
      "Responsive, single-page React app",
    ],
    role: "Frontend Developer (Solo)",
    duration: "",
    challenges: [
      {
        challenge: "Returning fast, relevant results as users type.",
        solution:
          "Connected directly to a movie API and optimized the request/render cycle for a responsive live-search experience.",
      },
      {
        challenge: "Displaying rich details for each result without cluttering the UI.",
        solution: "Designed a clean results layout that surfaces posters, ratings, and summaries at a glance.",
      },
    ],
    image:
      "https://raw.githubusercontent.com/ramim2219/movie_finder/refs/heads/main/screencapture-easymoviefinder321-netlify-app-2024-10-13-00_20_59.png",
    gallery: [
      "https://raw.githubusercontent.com/ramim2219/movie_finder/refs/heads/main/screencapture-easymoviefinder321-netlify-app-2024-10-13-00_20_59.png",
    ],
    link: "https://github.com/ramim2219/movie_finder",
    status: "live",
  },
];

export const portfolioData = rawPortfolioData.map((project) => ({
  ...project,
  gallery: project.gallery && project.gallery.length > 0 ? project.gallery : [project.image],
  repoUrl: isGithubUrl(project.link) ? project.link : null,
  liveUrl: isGithubUrl(project.link) ? null : project.link,
}));

export const getProjectById = (id) =>
  portfolioData.find((project) => String(project.id) === String(id));