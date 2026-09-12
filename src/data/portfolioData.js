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
//                 The FIRST image is used as the hero; the rest feed the
//                 alternating content/image rows.
//   sections    — optional explicit list of { image, title, body } blocks for
//                 the alternating layout. If omitted, the detail page falls
//                 back to pairing `features` + `challenges` with gallery images.
//   role        — your role on the project, e.g. "Full-Stack Developer (Solo)"
//   duration    — how long it took, e.g. "6 weeks". Leave "" to hide it on the page.
//   challenges  — array of { challenge, solution } pairs for the "Challenges &
//                 Solutions" section.
//
// NOTE ON LOCAL IMAGES:
//   Files inside the `public/` folder are served from the site root ("/").
//   So a file saved at `public/assets/img/ifjona.png` must be referenced as
//   "/assets/img/ifjona.png" — do NOT include "public" in the path, and always
//   start with "/" so it also works on nested routes like "/projects/1".

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
    // Cover image used by the portfolio grid card.
    image: "/assets/img/ifjona.png",
    // Full gallery for the detail page. First = hero, rest = alternating rows.
    // ⚠️ Replace the placeholder paths below with real screenshots.
    gallery: [
      "/assets/img/ifjona.png",
      "/assets/img/ifjona.png", // ← replace with /assets/img/ifjona-admin.png
      "/assets/img/ifjona.png", // ← replace with /assets/img/ifjona-checkout.png
    ],
    // Explicit content/image pairs for the alternating layout.
    // Each row uses its OWN image URL, so the layout shows different images.
    sections: [
      {
        image: "/assets/img/ifjona.png",
        title: "Modern Storefront",
        body: "Ifjona is a production e-commerce marketplace built end-to-end, from database design to deployment. The platform gives store owners a dynamic admin panel to manage products, orders, and customers, while shoppers get a fast, modern storefront.",
      },
      {
        image: "/assets/img/ifjona.png", // ← replace with ifjona-admin.png
        title: "Dynamic Admin Panel",
        body: "Store owners manage products, orders, and customers through a role-based admin panel. Inventory changes push instantly to the storefront via WebSocket, so shoppers never see stale stock.",
      },
      {
        image: "/assets/img/ifjona.png", // ← replace with ifjona-checkout.png
        title: "Secure Checkout",
        body: "Payments are processed through an integrated gateway with server-side validation. Sensitive payment logic stays off the client, keeping checkout both simple and secure.",
      },
    ],
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
    image: "/assets/img/project-2.jpg",
    gallery: [
      "/assets/img/project-2.jpg",
      "/assets/img/project-2.jpg", // ← replace with project-2-dashboard.png
      "/assets/img/project-2.jpg", // ← replace with project-2-reports.png
    ],
    sections: [
      {
        image: "/assets/img/project-2.jpg",
        title: "Centralized Employee Records",
        body: "An internal-tools style application built with Laravel and MySQL to help organizations track employee development. It centralizes performance data, growth plans, and development records so managers can review progress and plan next steps.",
      },
      {
        image: "/assets/img/project-2.jpg", // ← replace with project-2-dashboard.png
        title: "Performance Dashboard",
        body: "Managers get a single dashboard showing each employee's growth trajectory, recent reviews, and upcoming development milestones — replacing scattered spreadsheets with one structured view.",
      },
      {
        image: "/assets/img/project-2.jpg", // ← replace with project-2-reports.png
        title: "Role-Based Access",
        body: "Role-based access control ensures managers and employees only see what's relevant to them, keeping sensitive HR records protected without slowing down everyday workflows.",
      },
    ],
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
    gallery: [
      "https://raw.githubusercontent.com/ramim2219/CSE_HELPER/refs/heads/main/home.png",
      "https://raw.githubusercontent.com/ramim2219/CSE_HELPER/refs/heads/main/home.png", // ← replace with resources.png
      "https://raw.githubusercontent.com/ramim2219/CSE_HELPER/refs/heads/main/home.png", // ← replace with course.png
    ],
    sections: [
      {
        image: "https://raw.githubusercontent.com/ramim2219/CSE_HELPER/refs/heads/main/home.png",
        title: "Home & Navigation",
        body: "CSE Helper is a resource hub built for Computer Science students, combining a React front end styled with Tailwind CSS and a MySQL-backed data layer.",
      },
      {
        image: "https://raw.githubusercontent.com/ramim2219/CSE_HELPER/refs/heads/main/home.png",
        title: "Searchable Resources",
        body: "A categorized, searchable resource structure lets students jump straight to the materials they need — course notes, references, and tools — without scrolling through folders.",
      },
      {
        image: "https://raw.githubusercontent.com/ramim2219/CSE_HELPER/refs/heads/main/home.png",
        title: "Course Organization",
        body: "Course materials are grouped by semester and subject, backed by MySQL so content can be managed and updated without touching the front end.",
      },
    ],
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
    gallery: [
      "https://raw.githubusercontent.com/ramim2219/house_price_prediction/refs/heads/main/three.png",
      "https://raw.githubusercontent.com/ramim2219/house_price_prediction/refs/heads/main/three.png", // ← replace with form.png
      "https://raw.githubusercontent.com/ramim2219/house_price_prediction/refs/heads/main/three.png", // ← replace with result.png
    ],
    sections: [
      {
        image: "https://raw.githubusercontent.com/ramim2219/house_price_prediction/refs/heads/main/three.png",
        title: "Prediction Home",
        body: "This project pairs a trained regression model with a Django web front end so users can enter property details and instantly get a predicted market price.",
      },
      {
        image: "https://raw.githubusercontent.com/ramim2219/house_price_prediction/refs/heads/main/three.png",
        title: "Property Input Form",
        body: "Users enter location, size, and amenities through a simple form. The Django backend handles preprocessing and feeds the values into the trained regression model.",
      },
      {
        image: "https://raw.githubusercontent.com/ramim2219/house_price_prediction/refs/heads/main/three.png",
        title: "Instant Prediction",
        body: "The model returns a predicted price in real time, along with a breakdown of the input features, giving users a clear sense of what drove the estimate.",
      },
    ],
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
    gallery: [
      "https://raw.githubusercontent.com/ramim2219/DiabetesRiskPrediction/main/home_d.png",
      "https://raw.githubusercontent.com/ramim2219/DiabetesRiskPrediction/main/home_d.png", // ← replace with form_d.png
      "https://raw.githubusercontent.com/ramim2219/DiabetesRiskPrediction/main/home_d.png", // ← replace with result_d.png
    ],
    sections: [
      {
        image: "https://raw.githubusercontent.com/ramim2219/DiabetesRiskPrediction/main/home_d.png",
        title: "Risk Assessment Home",
        body: "A health-focused machine learning application that estimates a person's risk of diabetes based on inputs such as glucose level, BMI, and age.",
      },
      {
        image: "https://raw.githubusercontent.com/ramim2219/DiabetesRiskPrediction/main/home_d.png",
        title: "Health Data Input",
        body: "A simple form collects the key health metrics the model needs. The Django backend validates the inputs and serves a prediction in real time.",
      },
      {
        image: "https://raw.githubusercontent.com/ramim2219/DiabetesRiskPrediction/main/home_d.png",
        title: "Clear Result Screen",
        body: "The result screen presents the risk score clearly and calmly, with the input values summarized alongside so users understand exactly what drove the estimate.",
      },
    ],
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
    gallery: [
      "https://raw.githubusercontent.com/ramim2219/VillageScenerio/main/villageScenerio.png",
      "https://raw.githubusercontent.com/ramim2219/VillageScenerio/main/villageScenerio.png", // ← replace with scene2.png
      "https://raw.githubusercontent.com/ramim2219/VillageScenerio/main/villageScenerio.png", // ← replace with scene3.png
    ],
    sections: [
      {
        image: "https://raw.githubusercontent.com/ramim2219/VillageScenerio/main/villageScenerio.png",
        title: "Full Scene Overview",
        body: "Built for a Computer Graphics & Image Processing course, this project recreates a full village scene entirely through code.",
      },
      {
        image: "https://raw.githubusercontent.com/ramim2219/VillageScenerio/main/villageScenerio.png",
        title: "Procedural Houses & Trees",
        body: "Houses, trees, and terrain are composed from geometric primitives and transformations, with no external image assets — everything is drawn at runtime.",
      },
      {
        image: "https://raw.githubusercontent.com/ramim2219/VillageScenerio/main/villageScenerio.png",
        title: "CGIP Concepts Applied",
        body: "Translation, rotation, and scaling are used to position and animate scene elements, demonstrating the core CGIP concepts covered in the course.",
      },
    ],
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
      "https://raw.githubusercontent.com/ramim2219/movie_finder/refs/heads/main/screencapture-easymoviefinder321-netlify-app-2024-10-13-00_20_59.png", // ← replace with search.png
      "https://raw.githubusercontent.com/ramim2219/movie_finder/refs/heads/main/screencapture-easymoviefinder321-netlify-app-2024-10-13-00_20_59.png", // ← replace with details.png
    ],
    sections: [
      {
        image:
          "https://raw.githubusercontent.com/ramim2219/movie_finder/refs/heads/main/screencapture-easymoviefinder321-netlify-app-2024-10-13-00_20_59.png",
        title: "Live Search",
        body: "Movie Finder lets users search a live movie database and browse rich details — posters, ratings, and summaries — for each result.",
      },
      {
        image:
          "https://raw.githubusercontent.com/ramim2219/movie_finder/refs/heads/main/screencapture-easymoviefinder321-netlify-app-2024-10-13-00_20_59.png",
        title: "Rich Movie Details",
        body: "Each result surfaces posters, ratings, release dates, and short summaries in a clean, scannable layout that keeps browsing fast.",
      },
      {
        image:
          "https://raw.githubusercontent.com/ramim2219/movie_finder/refs/heads/main/screencapture-easymoviefinder321-netlify-app-2024-10-13-00_20_59.png",
        title: "Responsive Single-Page App",
        body: "Built entirely in React as a single-page app, the layout adapts cleanly from desktop to mobile so search and browsing feel the same everywhere.",
      },
    ],
    link: "https://github.com/ramim2219/movie_finder",
    status: "live",
  },
];

export const portfolioData = rawPortfolioData.map((project) => ({
  ...project,
  // gallery is now the authoritative list of images for the detail page.
  // Falls back to [image] so nothing breaks if a project has no gallery yet.
  gallery:
    project.gallery && project.gallery.length > 0 ? project.gallery : [project.image],
  // Explicit sections for the alternating layout. If omitted, the detail page
  // auto-builds rows from gallery + features + challenges.
  sections: project.sections && project.sections.length > 0 ? project.sections : null,
  repoUrl: isGithubUrl(project.link) ? project.link : null,
  liveUrl: isGithubUrl(project.link) ? null : project.link,
}));

export const getProjectById = (id) =>
  portfolioData.find((project) => String(project.id) === String(id));