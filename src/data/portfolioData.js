// Central source of truth for portfolio projects.
// Used by src/components/Portfolio.js (the grid) and
// pages/projects/[id].js (the full case-study page for each project).
//
// To add a new project: add an object below with a unique `id`.
// `link` can be either a GitHub repo URL or a live site URL — it is
// automatically split into `repoUrl` / `liveUrl` at the bottom of this file.
//
// Optional extras used by the detail page (safe to leave blank/empty):
//   gallery     — array of media URLs (images, PDFs, or videos). Defaults
//                 to [image] below if omitted. The FIRST item is used as the
//                 hero; the rest feed the alternating content/media rows.
//   sections    — optional explicit list of { image, title, body } blocks for
//                 the alternating layout.
//   role        — your role on the project.
//   duration    — how long it took. Leave "" to hide it on the page.
//   challenges  — array of { challenge, solution } pairs.
//
// MEDIA SUPPORT (all can be mixed freely in `image`, `gallery`, `sections[].image`):
//   - Images  → .png .jpg .jpeg .webp .gif .svg   → <img>
//   - PDFs    → .pdf                              → <iframe> PDF viewer
//   - Videos  → .mp4 .webm .ogg .mov .m4v         → <video>
//
// NOTE ON LOCAL FILES:
//   Files inside `public/` are served from the site root ("/").
//   So `public/assets/img/x.png` must be referenced as "/assets/img/x.png".

const isGithubUrl = (url) => typeof url === "string" && url.includes("github.com");

/** Returns true when the given URL points to a PDF file. */
export const isPdf = (url) =>
  typeof url === "string" && url.toLowerCase().split("?")[0].endsWith(".pdf");

/** Returns true when the given URL points to a video file. */
export const isVideo = (url) =>
  typeof url === "string" &&
  /\.(mp4|webm|ogg|mov|m4v)$/i.test(url.split("?")[0]);

const rawPortfolioData = [
  {
    id: 1,
    title: "Ifjona E-commerce Marketplace",
    subtitle: "React.js · Laravel · MySQL",
    description:
      "A full-stack e-commerce marketplace built with React.js, Laravel, and MySQL. Includes a dynamic admin panel, VPS deployment, WebSocket integration, AI integration, and secure payment integration — with a thesis-backed multilingual review analysis engine.",
    fullDescription:
      "Ifjona is a production e-commerce marketplace built end-to-end, from database design to deployment. The platform gives store owners a dynamic admin panel to manage products, orders, and customers, while shoppers get a fast, modern storefront. Real-time features are powered by WebSockets, AI is used to enhance parts of the shopping experience, and payments are processed through a secure, integrated gateway. A standout feature is the Review Management module — the core of my undergraduate thesis — which automatically classifies negative customer reviews across four issue categories (Product, Delivery, Monetary, Customer Service) in Bangla, English, and Banglish. The app is deployed and running live on a VPS.",
    techStack: [
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
    features: [
      "Dynamic, role-based admin panel",
      "Real-time order & inventory updates via WebSocket",
      "AI-assisted shopping experience",
      "Secure end-to-end payment integration",
      "Deployed and running on a production VPS",
      "Thesis feature: automated negative-review issue detection (Bangla, English & Banglish)",
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
        challenge:
          "Handling payments securely while keeping checkout simple for customers.",
        solution:
          "Integrated a secure payment gateway with server-side validation, keeping sensitive payment logic off the client.",
      },
      {
        challenge:
          "Manually reading hundreds of customer reviews to spot recurring product problems — made worse because shoppers write in Bangla, English, or Banglish (e.g. “Product ta ekdom faltu”).",
        solution:
          "Built a multilingual review-analysis service in FastAPI that automatically triggers whenever a review's rating is ≤ 3 and classifies the complaint into one of four issue types — Product Issue, Delivery Issue, Monetary Issue, or Customer Service Issue — giving admins an instant, aggregate view of product problem areas.",
      },
    ],

    image:
      "/assets/img/my_activities/Projects/Ifjona/Ifjona/Home.pdf",

    gallery: [
      "/assets/img/my_activities/Projects/Ifjona/Ifjona/Home.pdf",
      "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/Dashboard.pdf",
      "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/adding products.pdf",
      "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/order managemnt.pdf",
      "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/Review MAnagement.pdf",
      "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/coupon management.pdf",
      "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/tax report generator.pdf",
      "/assets/img/my_activities/Projects/Ifjona/Ifjona/shop_page.pdf",
      "/assets/img/my_activities/Projects/Ifjona/Ifjona/checkout.pdf",
      "/assets/img/my_activities/Projects/Ifjona/Ifjona/order_tracking.pdf",
      "/assets/img/my_activities/Projects/Ifjona/Ifjona/live chat.pdf",
    ],

    sections: [
      {
        image:
          "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/Dashboard.pdf",
        title: "Admin Dashboard Overview",
        body: "The central control panel gives store owners a real-time snapshot of sales, orders, inventory, and customer activity — all from a single view. Built with role-based access so admins, managers, and staff only see what's relevant to them.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/adding products.pdf",
        title: "Product Management",
        body: "Add, edit, and organize products with categories, states, locations, and currency support. Inventory changes push instantly to the storefront via WebSocket, so shoppers never see stale stock.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/order managemnt.pdf",
        title: "Order & Shipment Management",
        body: "Track every order from placement to delivery. Update statuses, monitor fulfillment, and handle shipment records in real time — all backed by server-side validation.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/Review MAnagement.pdf",
        title: "⭐ Thesis Feature — Automated Negative Review Issue Detection",
        body: "This module is the heart of my undergraduate thesis, integrated directly into the Ifjona admin panel. Whenever a customer leaves a review with a rating of 3 or below, a FastAPI-powered NLP service automatically analyzes the review text and classifies the complaint into one of four issue categories — Product Issue, Delivery Issue, Monetary Issue, or Customer Service Issue. The system is multilingual, handling Bangla, English, and Banglish (mixed-script) reviews like “Product ta ekdom faltu.” This gives admins an instant, aggregated view of what's actually going wrong per product — replacing hours of manual review reading with a single, data-driven dashboard that highlights each product's most common complaint category.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/coupon management.pdf",
        title: "Coupons, Offers & Promotions",
        body: "Create discount codes, run promotional campaigns, and schedule flash sales. Every coupon is validated server-side to prevent abuse and keep pricing logic trustworthy.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/Ifjona/Admin Page Functionalities/tax report generator.pdf",
        title: "Tax Reports & Compliance",
        body: "Generate state-based tax reports and export them for accounting. Configurable tax rules keep the platform compliant across regions without manual calculations.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/Ifjona/Ifjona/shop_page.pdf",
        title: "Customer-Facing Storefront",
        body: "Shoppers browse a fast, modern storefront with search, categories, and filters — powered by React on the front end and Laravel on the back end, with AI-assisted recommendations enhancing discovery.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/Ifjona/Ifjona/checkout.pdf",
        title: "Secure Checkout",
        body: "A streamlined checkout flow with server-side payment validation. Sensitive payment logic stays off the client, keeping transactions both simple and secure.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/Ifjona/Ifjona/order_tracking.pdf",
        title: "Real-Time Order Tracking",
        body: "Customers follow their order from confirmation to delivery through a live tracking view. Status updates propagate instantly via WebSocket, so there's no need to refresh the page.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/Ifjona/Ifjona/live chat.pdf",
        title: "Live Chat Support",
        body: "Built on WebSocket connections, live chat lets customers reach support instantly while admins respond from the same dashboard — closing the loop between the storefront and back office.",
      },
    ],

    link: "https://www.ifjona.com/",
    status: "live",
  },
  {
    id: 2,
    title: "Employee Management System",
    subtitle: "Laravel · MySQL · Role-Based Access",
    description:
      "A full employee management platform built with Laravel and MySQL, owned and operated by the company admin. Covers position-based access control, employee records, attendance, hourly salary calculation with overtime/under-time adjustments, internal posts, and task tracking with deadline-based reporting.",
    fullDescription:
      "This is a complete in-house Employee Management System built for a company where the admin (the business owner) is the top-level authority. From a single admin dashboard, the owner defines positions, assigns menu-level access to each position, and manages every employee record. The system tracks daily attendance (two entries per day — check-in and check-out), calculates monthly salary on an hourly basis (with automatic overtime pay when hours exceed the target and deductions when they fall short), and provides a lightweight social layer with company posts and replies to strengthen internal communication. Admin can also assign tasks with deadlines and monitor completion through a task overview. A dedicated work-hours graph visualises each employee's contribution, giving management a clear, data-driven picture of productivity across the team.",
    techStack: [
      "Laravel",
      "MySQL",
      "Blade",
      "PHP",
      "Role-Based Access Control",
      "Chart.js",
    ],
    features: [
      "Position-based menu access control (admin defines what each role can see)",
      "Complete employee records with add/edit workflows",
      "Daily attendance with two check-ins per day (in + out)",
      "Hourly salary calculation with overtime bonus and under-time deduction",
      "Company-wide post feed with threaded replies",
      "Task assignment with deadlines and completion tracking",
      "Work-hours contribution graph per employee",
    ],
    role: "Full-Stack Developer (Solo)",
    duration: "",
    challenges: [
      {
        challenge:
          "Preventing employees from seeing admin-only features like salary calculation, position management, and other employees' records.",
        solution:
          "Built a position-based access control system where the admin defines each position and maps it to a specific set of visible menu items. Employees only see what their position grants them, enforced both in the UI and on the server side.",
      },
      {
        challenge:
          "Calculating monthly salary fairly when employees work variable hours and sometimes exceed or fall short of their target monthly hours.",
        solution:
          "Designed an hourly salary engine that compares actual logged hours against the target (e.g. 4 hrs/day × 20 days = 80 hrs). Any hours above the target are paid as overtime; any shortfall is deducted, producing an accurate month-end payout automatically.",
      },
      {
        challenge:
          "Giving management a quick, visual sense of who is contributing the most working hours without manually reading attendance tables.",
        solution:
          "Built a work-hours contribution graph that aggregates each employee's logged hours and renders them side-by-side, so productivity trends are visible at a glance.",
      },
      {
        challenge:
          "Keeping internal communication and task accountability inside the same system instead of scattered across email and messaging apps.",
        solution:
          "Added a company post feed with replies for open communication, and a task system with deadlines so admins can assign work and track completion from a single overview screen.",
      },
    ],

    image: "/assets/img/my_activities/Projects/Employee/home.png",

    gallery: [
      "/assets/img/my_activities/Projects/Employee/home.png",
      "/assets/img/my_activities/Projects/Employee/employee_positions.jpg",
      "/assets/img/my_activities/Projects/Employee/employee_list.png",
      "/assets/img/my_activities/Projects/Employee/add_employee.JPG",
      "/assets/img/my_activities/Projects/Employee/employee_attendence.JPG",
      "/assets/img/my_activities/Projects/Employee/sellary_calculation.JPG",
      "/assets/img/my_activities/Projects/Employee/create_post.png",
      "/assets/img/my_activities/Projects/Employee/create_task.JPG",
      "/assets/img/my_activities/Projects/Employee/task_overview.JPG",
      "/assets/img/my_activities/Projects/Employee/works_graph.JPG",
    ],

    sections: [
      {
        image: "/assets/img/my_activities/Projects/Employee/home.png",
        title: "Dashboard Home",
        body: "The landing view after an admin logs in. From here the owner has quick access to positions, employees, attendance, salary, posts, and tasks — the full control surface of the company in one place.",
      },
      {
        image: "/assets/img/my_activities/Projects/Employee/employee_positions.jpg",
        title: "Position-Based Access Control",
        body: "The admin defines each position in the company and maps it to a specific set of menus. Every employee inherits their visible features from their assigned position — so an accountant sees salary and reporting screens, while a field employee only sees attendance and tasks. Access is enforced on both the UI and the server, keeping sensitive data protected.",
      },
      {
        image: "/assets/img/my_activities/Projects/Employee/employee_list.png",
        title: "Employee Directory",
        body: "A consolidated list of every employee in the company with their assigned position, contact details, and status. Admins can search, filter, and open any employee record to edit details or review history.",
      },
      {
        image: "/assets/img/my_activities/Projects/Employee/add_employee.JPG",
        title: "Add & Onboard Employees",
        body: "Adding a new employee is a guided flow: fill in personal details, assign a position, and the correct access permissions are applied automatically. The new record immediately appears in the employee list and starts contributing to attendance, salary, and task workflows.",
      },
      {
        image: "/assets/img/my_activities/Projects/Employee/employee_attendence.JPG",
        title: "Daily Attendance (Two Entries Per Day)",
        body: "Each employee logs in and out twice a day — one check-in/check-out pair per shift. Every entry writes directly to the database and is timestamped, giving the admin an accurate, tamper-resistant record of who worked and when. This attendance data feeds directly into the salary calculation engine.",
      },
      {
        image: "/assets/img/my_activities/Projects/Employee/sellary_calculation.JPG",
        title: "Hourly Salary Calculation with Overtime & Deductions",
        body: "Salary is computed on an hourly basis. If an employee is contracted for 4 hours a day (roughly 80 hours a month without off-days) and actually logs 84 hours, the extra 4 hours are paid as overtime. If they log fewer hours than their target, the shortfall is deducted. This gives the admin an automatic, fair, and transparent monthly payout calculation without manual spreadsheets.",
      },
      {
        image: "/assets/img/my_activities/Projects/Employee/create_post.png",
        title: "Company Posts & Replies",
        body: "An internal social feed where any authorised employee can create posts and reply to others. This lightweight communication layer keeps announcements, questions, and updates inside the same system — strengthening the team's internal network without dragging everyone onto a third-party chat app.",
      },
      {
        image: "/assets/img/my_activities/Projects/Employee/create_task.JPG",
        title: "Task Assignment with Deadlines",
        body: "Admins can create tasks for specific employees and set a deadline for each. Deadlines are visible to both sides, giving the owner a clear tool for delegating work and holding people accountable without chasing updates over messaging.",
      },
      {
        image: "/assets/img/my_activities/Projects/Employee/task_overview.JPG",
        title: "Task Completion Overview",
        body: "A single screen that aggregates every task in the system — grouped by status, owner, and deadline. Admins can see at a glance what's in progress, what's overdue, and what's been completed, and drill into any task for details.",
      },
      {
        image: "/assets/img/my_activities/Projects/Employee/works_graph.JPG",
        title: "Work-Hours Contribution Graph",
        body: "A visual report that aggregates each employee's logged working hours and displays them side-by-side. Management can instantly spot top contributors, identify workload imbalances, and back up performance reviews with concrete data instead of guesswork.",
      },
    ],

    link: "https://github.com/ramim2219/employee-management-system",
    status: "live",
  },
  {
    id: 3,
    title: "Daraz Review Extractor",
    subtitle: "React · Express.js · Web Scraping · Thesis Tool",
    description:
      "A thesis-purpose data-collection tool that scrapes Daraz product and category reviews in one click. Built because existing Chrome scraping extensions cap at 5 reviews per page — making a 100-review dataset a 20-page manual job. Pick a scraper type (single product or category), choose a rating mode (all / specific / range), set a page range (start → end), pick your columns, and export the full dataset as CSV or Excel. Handles 100,000+ reviews in a single run.",
    fullDescription:
      "Daraz Review Extractor started as a problem I hit while preparing the dataset for my undergraduate thesis on multilingual review analysis. Off-the-shelf Chrome scraping extensions on Daraz only capture the reviews visible on a single page — about 5 at a time — so assembling a dataset of even 100 reviews meant manually walking through 20 pages, and there was no way to filter out obviously positive 4- and 5-star reviews beforehand. To fix this, I built a purpose-built scraper with a clean three-step workflow. First, the user selects a scraper type: single product or category. Second, they paste the matching URL. Third, they apply filters — a rating mode (all ratings 1–5, a specific rating, or a rating range), a page-range filter (start page → end page, so a 102-page product can be sliced down to pages 1–20), and a column selector for choosing exactly which fields to export. The Express.js backend walks every requested page of every product, extracts the matching reviews, and returns a clean dataset — handling over 100,000 reviews in a single run. Results download as CSV or Excel, ready to drop into a Jupyter notebook, a spreadsheet, or a downstream NLP pipeline. The tool is deployed live on Vercel and was the primary source of review data for my thesis work on Bangla, English, and Banglish review classification — the same engine later integrated into Ifjona's admin panel.",
    techStack: [
      "React",
      "Express.js",
      "Node.js",
      "Web Scraping",
      "REST API",
      "CSV Export",
      "Excel Export",
      "Vercel",
    ],
    features: [
      "Selectable scraper type — single product URL or full category URL",
      "Scrapes every page of every product, bypassing the 5-reviews-per-page limit of Chrome extensions",
      "Handles 100,000+ reviews in a single scraping run",
      "Rating filter with three modes: All ratings (1–5), Specific rating, or Rating range",
      "Page-range filter (start page → end page) — slice a 102-page product down to pages 1–20 for sampling or split jobs",
      "Column selector — choose exactly which fields to include in the export",
      "One-click download as CSV or Excel",
      "Category system for organising large multi-product scrapes",
      "Live deployment on Vercel",
      "Built to feed a thesis-grade multilingual review dataset (English, Bangla, Banglish)",
    ],
    role: "Full-Stack Developer (Solo)",
    duration: "",
    challenges: [
      {
        challenge:
          "Existing Chrome scraping extensions could only capture the ~5 reviews visible per Daraz page — making a dataset of 100 reviews a 20-page manual chore, and scaling to the 100,000+ reviews a thesis-class dataset actually needs completely impossible.",
        solution:
          "Built a scraper that programmatically walks every review page for a product (and every product inside a category), so a single URL produces the entire dataset — no manual pagination, no extension limits. The tool now handles 100,000+ reviews in a single run.",
      },
      {
        challenge:
          "Different thesis experiments needed different slices of data — sometimes every review, sometimes only the bad ones, sometimes a specific rating band, and sometimes just a page range to sample or resume a job.",
        solution:
          "Designed a flexible filter panel with three independent controls: a scraper type toggle (single product or category), a rating filter with three modes — All ratings (1–5), Specific rating, and Rating range — and a page-range filter using start and end page inputs. Any combination can be applied, giving precise control over exactly what enters the dataset.",
      },
      {
        challenge:
          "Scraping at scale risks timeouts, rate limits, and memory exhaustion if every review is buffered naively in memory before being written out.",
        solution:
          "Streamed review data to disk as it was collected and paginated requests rather than firing them all at once — allowing long multi-hour scraping jobs to complete reliably without the server crashing midway.",
      },
      {
        challenge:
          "Some products had over 100 pages of reviews — running a full scrape every time was wasteful when only a sample was needed, and long jobs sometimes had to be split across sessions.",
        solution:
          "Added a page-range filter with start page and end page inputs, so users can scrape any slice of a product's review history. A 102-page product can be trimmed to pages 1–20 — enabling fast sampling, incremental collection across sessions, or targeted re-scraping of a range that failed earlier.",
      },
      {
        challenge:
          "Different analyses needed different columns — sometimes just review text and rating, other times the full set including reviewer and date.",
        solution:
          "Built a column selector that lets the user choose exactly which fields to include, and a one-click export as CSV or Excel — so the output drops straight into Jupyter, Excel, or an NLP pipeline without post-processing.",
      },
      {
        challenge:
          "Daraz reviews mix English, Bangla, and Banglish (e.g. “Product ta ekdom faltu”), and the downstream classifier needed this raw multilingual text intact.",
        solution:
          "Kept the extraction layer language-agnostic — reviews are stored verbatim with no cleaning or translation — so the exported dataset can feed any downstream model, including the FastAPI review-classification engine later integrated into Ifjona.",
      },
      {
        challenge:
          "The tool needed to be usable by non-developers (thesis supervisors, collaborators) without local setup.",
        solution:
          "Deployed the full app live on Vercel so anyone can paste a URL and get a dataset in seconds — no install, no CLI, no notebook required.",
      },
    ],

    image:
      "/assets/img/my_activities/Projects/daraz_extractor/home.pdf",

    gallery: [
      "/assets/img/my_activities/Projects/daraz_extractor/home.pdf",
      "/assets/img/my_activities/Projects/daraz_extractor/single_product.pdf",
      "/assets/img/my_activities/Projects/daraz_extractor/catrgory_search.pdf",
    ],

    sections: [
      {
        image:
          "/assets/img/my_activities/Projects/daraz_extractor/home.pdf",
        title: "Built for a Thesis Dataset Problem",
        body: "This project exists because of a concrete limitation I hit while preparing data for my undergraduate thesis on multilingual review analysis. Chrome scraping extensions on Daraz only capture the ~5 reviews visible on a single page — assembling 100 reviews meant clicking through 20 pages, and there was no way to pre-filter out the obviously positive 4- and 5-star reviews. The whole tool is designed to eliminate that manual work entirely.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/daraz_extractor/single_product.pdf",
        title: "Single Product Scraping",
        body: "The user selects 'Single Product' as the scraper type, pastes the product URL, and applies filters — rating mode (All / Specific / Range), page range (start → end), and the columns to export. The Express backend walks every requested page of that product and returns the full review dataset in one shot. A product with 102 pages of reviews can be sliced down to pages 1–20 for fast sampling, or scraped end-to-end to collect 100,000+ reviews in a single run.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/daraz_extractor/catrgory_search.pdf",
        title: "Category-Wide Scraping",
        body: "The user selects 'Category' as the scraper type and pastes a category URL. The backend first enumerates every product inside that category, then walks the review pages for each one — turning an entire category's worth of customer feedback into a single structured dataset with one request. The same rating and page-range filters apply across every product, and results download as CSV or Excel, ready to drop into a notebook or feed the FastAPI review-classification engine built for Ifjona.",
      },
    ],

    link: "https://daraz-review-extractor.vercel.app/",
    repoUrl: "https://github.com/ramim2219/daraz-review-extractor",
    status: "live",
  },
  {
    id: 4,
    title: "XLSX Data Splitter",
    subtitle: "React · XLSX Parsing · Automation Tool",
    description:
      "A browser-based automation tool that splits one large Excel (.xlsx) file into many smaller files, each with a user-defined row count, and downloads them all as a single zip. Built for a thesis workflow where manually cutting a 1,000,000-row dataset into 10,000-row chunks would mean 100 copy-paste operations. Drop a file, set rows-per-file, download a zip of clean header-intact parts.",
    fullDescription:
      "XLSX Data Splitter was built to remove a specific bottleneck in my undergraduate thesis workflow: annotating large Excel datasets. When a single .xlsx file contains 100,000+ rows, opening it in Excel for manual annotation is painfully slow, and splitting it by hand — copy, paste, save, repeat — becomes a 100-step chore for a 1,000,000-row file at 10,000 rows per part. This tool does the whole job in one click. The user drags a large .xlsx file into the React app, sets the desired rows per output file, and the tool parses the workbook entirely in the browser, slices the data into equal-sized chunks, preserves the header row in every part, bundles all the resulting files into a single zip archive, and downloads it in one action. Nothing is uploaded to a server — the parsing, splitting, and zipping all happen client-side, so large sensitive datasets never leave the user's machine. It was used as the primary data-prep step for the thesis review-annotation pipeline, cutting a multi-hour manual task down to seconds.",
    techStack: [
      "React",
      "XLSX Parsing",
      "JSZip",
      "File API",
      "Client-Side Processing",
      "Netlify",
    ],
    features: [
      "Drag-and-drop or click-to-browse .xlsx upload",
      "Splits a single Excel file into N smaller files in one operation",
      "User-defined rows per output file (e.g. 10,000 rows → 100 parts for a 1M-row file)",
      "Preserves the header row in every output file so each part is immediately usable",
      "Bundles every output file into a single .zip archive",
      "One-click download of the entire zip — no per-file saving",
      "Entirely client-side — no file ever leaves the browser",
      "Live deployment on Netlify",
    ],
    role: "Full-Stack Developer (Solo)",
    duration: "",
    challenges: [
      {
        challenge:
          "Preparing a thesis dataset meant manually annotating very large Excel files — but a 100,000-row file was too slow to open and edit in Excel, and a 1,000,000-row file split into 10,000-row chunks would take roughly 100 copy-paste-save cycles to prepare.",
        solution:
          "Built a browser-based automation tool that splits a single .xlsx file into any number of smaller files in one click. The user sets the desired rows per file, and the tool produces the entire set as a single downloadable zip — a multi-hour manual task reduced to seconds.",
      },
      {
        challenge:
          "Saving each split file individually is still tedious — after the split, a user would face dozens or hundreds of 'Save As' dialogs to collect the results.",
        solution:
          "Bundled every generated file into a single .zip archive using JSZip and triggered one download at the end. The user gets all 100 parts in a single click, not 100 separate saves.",
      },
      {
        challenge:
          "Manual copy-paste splitting often loses or duplicates the header row, or misaligns the first data row of each part — corrupting the dataset silently.",
        solution:
          "Programmatically re-inserts the header row into every output file, so each part is self-contained and immediately ready for annotation or analysis with no cleanup.",
      },
      {
        challenge:
          "Splitting large files on a server would mean uploading sensitive research data to a third party — a privacy concern for thesis and organisational datasets.",
        solution:
          "Kept the entire pipeline client-side: the .xlsx file is parsed, sliced, and zipped in the browser using the File API and JSZip. Nothing is uploaded, so large datasets never leave the user's machine.",
      },
      {
        challenge:
          "Very large workbooks can exhaust browser memory if the whole file is loaded and held as a single in-memory object during slicing.",
        solution:
          "Processed the workbook's row array once, generated each output workbook sequentially, and fed each into a zip stream — keeping peak memory proportional to one part at a time rather than the full input.",
      },
    ],

    image:
      "/assets/img/my_activities/Projects/xlsx_splitter/home.png",

    gallery: [
      "/assets/img/my_activities/Projects/xlsx_splitter/home.png",
      "/assets/img/my_activities/Projects/xlsx_splitter/testing.png",
    ],

    sections: [
      {
        image:
          "/assets/img/my_activities/Projects/xlsx_splitter/home.png",
        title: "Built for a Thesis Annotation Problem",
        body: "This tool exists because of a concrete bottleneck in my undergraduate thesis workflow. Annotating a large Excel dataset — 100,000+ rows in a single .xlsx — is painfully slow in Excel, and splitting it manually into annotation-sized chunks is a hundreds-of-steps chore. The whole app is designed to make that prep step disappear. The landing screen is a single drop zone: drag a large .xlsx file in or click to browse, and the file is read directly by the browser — no upload, no server round-trip.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/xlsx_splitter/testing.png",
        title: "Live Split Test — 50 Rows Per File",
        body: "A real split run: a full .xlsx workbook is dropped in and the rows-per-file field is set to 50. The tool parses the workbook in the browser, slices the data into equal-sized chunks, and preserves the header row in every output file. All resulting parts are then bundled into a single .zip archive and downloaded in one click — turning what would otherwise be a long chain of copy-paste-save operations into a single action.",
      },
    ],

    link: "https://xlsxdatasplitter.netlify.app/",
    repoUrl: "https://github.com/ramim2219/xlsx-splitter",
    status: "live",
  },
  {
    id: 5,
    title: "Village Scenario — 3D Computer Graphics",
    subtitle: "C++ · OpenGL · Computer Graphics",
    description:
      "A 7th-semester Computer Graphics & Image Processing (CGIP) course project built from scratch in C++. Recreates an animated 3D village scene entirely through code — houses, trees, terrain, sky, and motion — using core graphics primitives, transformations, and shading, with no external image or model assets.",
    fullDescription:
      "Village Scenario was my 7th-semester project for the Computer Graphics & Image Processing course. The goal was to demonstrate mastery of the fundamentals — primitives, transformations, projections, lighting, and animation — by composing an entire 3D village scene programmatically in C++. Every element on screen (houses, trees, roads, sky, terrain) is drawn from geometric primitives; nothing is loaded from an external image or 3D model file. The scene includes moving elements and a rendered camera view, exercising translation, rotation, and scaling in real time. Working with pure C++ and no engine gave me a hands-on understanding of the graphics pipeline that higher-level tools usually hide: how vertices become triangles, how transformations compose, and how a scene is assembled from scratch. This was also one of the earliest projects where I had to justify every visual result with code rather than art assets.",
    techStack: [
      "C++",
      "OpenGL",
      "GLUT",
      "Computer Graphics",
      "Procedural Rendering",
    ],
    features: [
      "Fully procedural 3D village scene — no external image or model assets",
      "Hand-built houses, trees, terrain, and sky from geometric primitives",
      "Real-time animation of scene elements using translation, rotation, and scaling",
      "Camera view rendered with projection and depth handling",
      "Demonstrates core CGIP concepts: primitives, transformations, composition, and lighting",
      "Completed as a 7th-semester Computer Graphics & Image Processing course project",
    ],
    role: "Developer (Course Project — Solo)",
    duration: "",
    challenges: [
      {
        challenge:
          "Composing a recognisable, readable village scene using only geometric primitives — no image textures, no 3D models — while still making each object look like what it represents.",
        solution:
          "Layered primitive shapes into composite objects: a house = a cube body + a triangular prism roof + smaller cubes for windows and doors. Repeated the pattern for trees, roads, and terrain until the scene read as a coherent village.",
      },
      {
        challenge:
          "Understanding and correctly applying 2D and 3D transformations — translation, rotation, scaling — where a single mistake in the order of matrix multiplications flips or distorts entire objects.",
        solution:
          "Iteratively tested each transformation in isolation against small test scenes, then composed them into the full scene. This built the mental model of how the graphics pipeline chains transforms from model space to screen space.",
      },
      {
        challenge:
          "Animating scene elements (moving objects, changing camera view) without making the animation jerky or the framerate collapse.",
        solution:
          "Used GLUT's idle and timer callbacks to drive animation at a consistent frame rate, keeping the transformation math simple and avoiding redundant state changes between frames.",
      },
    ],

    image:
      "/assets/img/my_activities/Projects/villageScenerio/home.mp4",

    gallery: [
      "/assets/img/my_activities/Projects/villageScenerio/home.mp4",
      "/assets/img/my_activities/Projects/villageScenerio/villageScenerio.png",
    ],

    sections: [
      {
        image:
          "/assets/img/my_activities/Projects/villageScenerio/home.mp4",
        title: "Live Scene Walkthrough",
        body: "A short recording of the program running: the camera moves through the scene while animated elements (trees, houses, roads) render in real time. Every visible object on screen was composed in code from geometric primitives — no image textures, no imported 3D models — which is what makes the CGIP course project meaningfully different from loading a ready-made asset.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/villageScenerio/villageScenerio.png",
        title: "Full Scene Overview",
        body: "A wide shot of the complete village. Houses, trees, and terrain are layered from primitives with careful placement and shading so the composition reads clearly from the default camera view. The project was built to demonstrate the core Computer Graphics & Image Processing concepts — primitives, transformations, projections, and composition — in a single, self-contained C++ program.",
      },
    ],

    link: "https://github.com/ramim2219/VillageScenerio",
    status: "live",
  },
  {
    id: 6,
    title: "Automatic Hand Sanitizer Dispenser",
    subtitle: "Arduino · IR Sensor · Servo Motor · EEE 372",
    description:
      "A hardware project built for the Microprocessors & Microcontrollers Laboratory (EEE 372) course. An Arduino-driven automatic hand sanitizer that detects a hand with an IR sensor and dispenses sanitizer via a servo motor — no contact, no buttons, no manual pump.",
    fullDescription:
      "This project was built as part of the Microprocessors & Microcontrollers Laboratory course (EEE 372). The goal was to apply the microcontroller concepts from the course to a real, working embedded system — a touchless hand sanitizer dispenser. When a hand enters the detection range of an IR sensor, the Arduino reads the sensor's digital output, confirms a valid hand presence, and drives a servo motor to press the dispenser pump for a fixed interval before returning to rest. The entire circuit is assembled on a breadboard with jumper wires, and the firmware runs on an Arduino board. The project combines sensor input, microcontroller logic, and mechanical actuation into a single self-contained device that improves on the manual pump it replaces — no physical contact means better hygiene in shared spaces.",
    techStack: [
      "Arduino",
      "Embedded C",
      "IR Sensor",
      "Servo Motor",
      "Breadboard Circuit",
      "Microcontroller Programming",
    ],
    features: [
      "Touchless hand detection via IR sensor — no physical contact required",
      "Arduino microcontroller reads sensor input and controls the dispenser",
      "Servo motor actuates the sanitizer pump for a fixed dispensing interval",
      "Entire circuit built on a breadboard with jumper wires",
      "Self-contained embedded system — sensor, controller, and actuator in one",
      "Built for the Microprocessors & Microcontrollers Laboratory (EEE 372)",
    ],
    role: "Hardware & Firmware Developer (Course Project — Solo)",
    duration: "",
    challenges: [
      {
        challenge:
          "The IR sensor occasionally triggered on nearby objects (chairs, passing people) rather than only on a hand placed directly in front of the nozzle — causing the pump to dispense when no one was there.",
        solution:
          "Added a short confirmation delay in the Arduino firmware: the sensor reading must stay valid for a brief window before the servo fires, filtering out transient or peripheral triggers.",
      },
      {
        challenge:
          "The servo motor needed to press the pump with enough force and for the right duration — too little and nothing comes out, too much and it dispenses excess sanitizer or strains the motor.",
        solution:
          "Calibrated the servo's press angle and hold time empirically, then encoded both as fixed constants in the firmware so the dispense amount stays consistent every time.",
      },
      {
        challenge:
          "Wiring the sensor, Arduino, and servo together on a breadboard without loose connections or cross-talk between the power and signal lines.",
        solution:
          "Kept signal wiring short and separated from power, used a common ground across all components, and tested each subsystem in isolation (sensor alone, then servo alone) before integrating them into a single working circuit.",
      },
      {
        challenge:
          "Bridging the gap between the microcontroller theory taught in class and a physically working device — the code that looks right on paper can still fail when real-world sensor noise and motor load are involved.",
        solution:
          "Iteratively tested the firmware against the physical hardware, logging sensor readings during each run and adjusting thresholds and timing constants until the dispenser behaved reliably across many trials.",
      },
    ],

    // Grid card cover + hero image
    image:
      "/assets/img/my_activities/Projects/hand_senitiser/home.jpg",

    gallery: [
      "/assets/img/my_activities/Projects/hand_senitiser/home.jpg",
      "/assets/img/my_activities/Projects/hand_senitiser/showcase.jpg",
    ],

    sections: [
      {
        image:
          "/assets/img/my_activities/Projects/hand_senitiser/showcase.jpg",
        title: "Touchless Dispensing with Arduino",
        body: "A complete, working embedded system built for the Microprocessors & Microcontrollers Laboratory (EEE 372). When a hand enters the detection range of the IR sensor, the Arduino reads the signal and drives a servo motor to press the sanitizer pump for a calibrated interval — then returns to its resting position. The whole circuit is assembled on a breadboard using jumper wires, with the Arduino board serving as the brain of the device.",
      },
    ],

    link: null,
    status: "live",
  },
  {
    id: 7,
    title: "Amazon Wholesale Distributor Directory",
    subtitle: "React · Client-Side Data App",
    description:
      "A client project built for a business owner who needed to search, filter, and export a list of 2,437 Amazon wholesale distributors that originally existed only as a screenshot. Converted the raw data into a structured JSON dataset and built a React directory app with 15+ live filters, column visibility toggles, and CSV export — deployed live on Netlify.",
    fullDescription:
      "This project started with an unusual constraint: a client handed me a screenshot containing roughly 2,437 rows of Amazon wholesale distributor data — company names, websites, emails, phone numbers, locations, founding years, employee counts, and social links — and asked for a website that would let him find any distributor instantly. There was no spreadsheet, no CSV, no database — just an image of a table. I first transcribed the data into a structured JSON file, carefully preserving every field: SNO, industry, company, website, description, contact, email, city, state, country, timezone, founded year, employee count, revenue, Facebook, LinkedIn, Twitter, postal address, and street address. Then I built a React app around it with a fully client-side filter engine. Users can search globally across all fields, drill down with advanced filters (industry, country, state, city, timezone, contact, email, social presence, founded-year range, employee range, revenue range), toggle which columns are visible, and export the filtered result set as CSV or Excel. Because all 2,437 records load into the browser, filtering is instant — no server round-trips, no pagination lag. The app is deployed live on Netlify and is actively used by the client.",
    techStack: [
      "React",
      "JavaScript",
      "JSON Data Modeling",
      "Client-Side Filtering",
      "CSV Export",
      "Excel Export",
      "Netlify",
    ],
    features: [
      "2,437 structured distributor records loaded entirely client-side",
      "Global search across all fields (company, website, email, city, and more)",
      "15+ advanced filters — industry, country, state, city, timezone, contact, email, social, founded-year range, employee range, revenue range",
      "Multi-filter stacking — quick and advanced filters combine together",
      "Column visibility toggles so users can hide fields they don't need",
      "Instant client-side filtering — no server round-trips, no lag",
      "Pagination handling thousands of rows smoothly (98 pages of results)",
      "CSV / Excel export of the currently filtered result set",
      "Fully responsive layout for desktop and mobile",
      "Live deployment on Netlify",
    ],
    role: "Full-Stack Developer (Solo — Client Project)",
    duration: "",
    challenges: [
      {
        challenge:
          "The client's source data existed only as a screenshot — no CSV, no Excel, no database. Extracting 2,437 rows of multi-column data from a static image would normally require manual re-typing or fragile OCR that would inevitably corrupt fields like emails and website URLs.",
        solution:
          "Transcribed the data into a structured JSON file with a carefully designed schema, verifying emails, URLs, and numeric fields row by row. The JSON became the single source of truth for the app, and any future update is just a JSON edit.",
      },
      {
        challenge:
          "The client needed to search by very different criteria at different times — sometimes by industry, sometimes by location, sometimes by founding year or revenue range. A single search box wasn't enough.",
        solution:
          "Designed a two-tier filter panel: a global search box across all text fields, plus 15+ dedicated filters grouped by category (business, location, contact, financials, social, and columns). Filters stack together and combine with the global search in real time.",
      },
      {
        challenge:
          "Rendering 2,437 records in a browser table would freeze or lag if all rows were mounted into the DOM at once.",
        solution:
          "Implemented client-side pagination (roughly 25 rows per page, ~98 pages total) so only a slice is rendered at a time. All filtering still happens against the full in-memory dataset, so results stay accurate and instant — but the DOM stays light.",
      },
      {
        challenge:
          "Different users care about different columns — some want just company + email, others need the full 19-field set including revenue and social links.",
        solution:
          "Added a column visibility panel where users toggle exactly which of the 19 fields appear in the table. The selection persists while filtering and is reflected in the CSV/Excel export, so exports always match what the user sees.",
      },
      {
        challenge:
          "The client frequently needs to share filtered subsets with colleagues and partners, but copying rows out of a web table is tedious and error-prone.",
        solution:
          "Built one-click CSV / Excel export that dumps the currently filtered and column-selected result set — so the client can apply any combination of filters and instantly get a spreadsheet of exactly the rows and fields they need.",
      },
    ],

    image:
      "/assets/img/my_activities/Projects/amazon-distributors/home.pdf",

    gallery: [
      "/assets/img/my_activities/Projects/amazon-distributors/home.pdf",
      "/assets/img/my_activities/Projects/amazon-distributors/filter.jpg",
    ],

    sections: [
      {
        image:
          "/assets/img/my_activities/Projects/amazon-distributors/home.pdf",
        title: "From a Screenshot to a Live Directory",
        body: "The client handed me an image containing roughly 2,437 rows of Amazon wholesale distributor data — company names, websites, emails, contacts, locations, founding years, employee counts, revenue figures, and social links — and asked for a website that would let him find any distributor in seconds. There was no spreadsheet to start from. I transcribed the full dataset into a structured JSON file and built the entire React app around it — a clean, responsive directory that loads all 2,437 records directly in the browser.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/amazon-distributors/filter.jpg",
        title: "15+ Live Filters, One Dataset",
        body: "The filter panel is the heart of the app. A global search box scans every text field at once, while dedicated filters let the user drill down by industry, country, state, city, timezone, contact availability, email presence, social presence, founded-year range, employee range, and revenue range. Quick and advanced filters stack — every keystroke narrows the result set in real time, and the visible-columns panel lets the user toggle exactly which of the 19 fields appear in the table and in the CSV / Excel export.",
      },
    ],

    link: "https://amazon-distributor.netlify.app/",
    repoUrl: null,
    status: "live",
  },
  {
    id: 8,
    title: "CSE Helper — Daily Learning Blog",
    subtitle: "React · Express.js · MySQL",
    description:
      "A full-stack daily blog where I document my learnings, notes, and progress through Computer Science. Built with React, Express.js, and MySQL, it hosts a structured competitive programming roadmap and CSE core-course notes — Theory of Computation, OOP, and more — so every study session leaves behind a searchable, reusable reference.",
    fullDescription:
      "CSE Helper is my personal daily-learning blog — the place I write down what I learn each day so it sticks and so I can find it again later. What started as scattered notes turned into a full-stack web app built with React on the front end, Express.js on the back end, and MySQL for storage. The site is organised around two main content pillars. The first is a competitive programming roadmap: a structured, ordered path covering the topics and problem patterns I work through, from fundamentals up, so progress is visible instead of random. The second is CSE core courses — Theory of Computation, Object-Oriented Programming, and other core subjects — broken down into topic lists with course-wise notes, explanations, and examples. Because everything lives in a database rather than a static file, new posts, topics, and courses can be added without touching the code. The goal is simple: a single, well-organised source of truth for my own learning that doubles as a reference for anyone else following a similar path.",
    techStack: [
      "React",
      "Express.js",
      "Node.js",
      "MySQL",
      "REST API",
      "Full-Stack Web Development",
    ],
    features: [
      "Daily blog posts documenting learnings, notes, and progress",
      "Structured competitive programming roadmap — ordered topics and problem patterns",
      "CSE core-course notes (Theory of Computation, OOP, and more)",
      "Course-wise and topic-wise organisation for easy navigation",
      "Topic lists that break large subjects into manageable, trackable pieces",
      "MySQL-backed content — posts and topics are stored in a database, not hardcoded",
      "Full-stack architecture: React front end + Express.js REST API + MySQL",
      "Built as a personal single source of truth for daily CS learning",
    ],
    role: "Full-Stack Developer (Solo)",
    duration: "",
    challenges: [
      {
        challenge:
          "Scattered notes across notebooks, chat messages, and random text files meant past learnings were effectively lost — I could not easily revisit or search what I had studied weeks earlier.",
        solution:
          "Built a single full-stack blog where every learning is written down in a structured, database-backed format. Posts are stored in MySQL and served through an Express.js REST API, so everything is searchable and permanent instead of scattered.",
      },
      {
        challenge:
          "Competitive programming has a huge number of topics with no obvious order, making it hard to know what to study next or whether I was actually progressing.",
        solution:
          "Designed a dedicated competitive programming roadmap — an ordered, structured path of topics and problem patterns. Each topic lives as its own entry, so the roadmap doubles as a progress tracker rather than a loose list.",
      },
      {
        challenge:
          "Core CSE subjects like Theory of Computation and OOP are large and dense — reading them linearly in a textbook made it hard to isolate and revisit specific concepts.",
        solution:
          "Broke each core course into a topic list, with each topic getting its own note page and examples. This turns a monolithic subject into small, revisitable pieces that are easy to navigate and review before exams or interviews.",
      },
      {
        challenge:
          "A static site (Markdown files or hardcoded pages) would mean editing code every time I wanted to add a post or a new topic — slowing down the daily-writing habit the blog depends on.",
        solution:
          "Chose a MySQL-backed architecture with an Express.js API so new posts, courses, and topics can be added as data, not code. The React front end simply renders whatever the API returns, keeping the content layer and the UI fully separate.",
      },
    ],

    image:
      "/assets/img/my_activities/Projects/cse_helper/home.png",

    gallery: [
      "/assets/img/my_activities/Projects/cse_helper/home.png",
      "/assets/img/my_activities/Projects/cse_helper/topicList.png",
      "/assets/img/my_activities/Projects/cse_helper/course.png",
    ],

    sections: [
      {
        image:
          "/assets/img/my_activities/Projects/cse_helper/home.png",
        title: "A Daily Learning Blog, Built to Last",
        body: "CSE Helper is where I write down what I learn each day. The home view is the entry point to the blog — a clean landing surface that leads into the two content pillars: the competitive programming roadmap and the CSE core-course notes. Everything on the page is served from a MySQL database through an Express.js API and rendered by React, so new posts and topics appear without any code changes. The goal is to turn one-off study sessions into a permanent, searchable record of my CS journey.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/cse_helper/topicList.png",
        title: "Competitive Programming Roadmap & Topic Lists",
        body: "The competitive programming section is organised as a structured roadmap rather than an unordered pile of problems. Topics are broken into individual entries, each with its own notes and explanations, so the path from fundamentals upward is visible and progress is trackable. The topic list view makes it easy to jump to any specific area, revisit a concept before a contest, or see exactly what has been covered and what is still ahead.",
      },
      {
        image:
          "/assets/img/my_activities/Projects/cse_helper/course.png",
        title: "CSE Core Course Notes",
        body: "Alongside competitive programming, the site hosts notes for core CSE courses — Theory of Computation, Object-Oriented Programming, and more. Each course is broken down into topics with explanations, definitions, and examples, turning dense textbook material into small, revisitable pages. Having these notes in the same system as the blog and roadmap means everything I study lives in one place, backed by MySQL and served through the same Express.js API — ready to review before exams, interviews, or whenever a concept needs a refresher.",
      },
    ],

    link: null,
    status: "live",
  },

];

export const portfolioData = rawPortfolioData.map((project) => ({
  ...project,
  // gallery is the authoritative list of media (images / PDFs / videos).
  // Falls back to [image] so nothing breaks if a project has no gallery yet.
  gallery:
    project.gallery && project.gallery.length > 0 ? project.gallery : [project.image],
  // Explicit sections for the alternating layout. If omitted, the detail page
  // auto-builds rows from gallery + features + challenges.
  sections: project.sections && project.sections.length > 0 ? project.sections : null,
  // Respect explicit repoUrl / liveUrl when a project declares them.
  // Falls back to auto-detecting from `link` (GitHub → repoUrl, else liveUrl).
  repoUrl:
    project.repoUrl !== undefined
      ? project.repoUrl
      : isGithubUrl(project.link)
        ? project.link
        : null,
  liveUrl:
    project.liveUrl !== undefined
      ? project.liveUrl
      : isGithubUrl(project.link)
        ? null
        : project.link,
}));

export const getProjectById = (id) =>
  portfolioData.find((project) => String(project.id) === String(id));