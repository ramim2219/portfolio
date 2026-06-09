import SectionTitle from "./SectionTitle";
import { useMemo, useState, useEffect } from "react";

const portfolioData = [
  {
    id: 1,
    title: "Ifjona E-commerce Marketplace",
    subtitle: "Full-Stack E-commerce Platform",
    description:
      "A full-stack e-commerce marketplace built with React.js, Laravel, and MySQL. Includes a dynamic admin panel, VPS deployment, WebSocket integration, AI integration, and secure payment integration.",
    image: "assets/img/ifjona.png",
    github: "https://www.ifjona.com/",
    status: "live", // live | in_progress
  },
  {
    id: 2,
    title: "Employee Development Systems",
    subtitle: "Laravel ,Mysql",
    image: "assets/img/project-2.jpg",
    github: "https://github.com/ramim2219/employee-management-system",
    status: "live", // ✅ show working badge
  },
  {
    id: 3,
    title: "CSE Helper",
    subtitle: "React , Tailwind CSS , Mysql",
    image: "https://raw.githubusercontent.com/ramim2219/CSE_HELPER/refs/heads/main/home.png",
    github: "https://github.com/ramim2219/CSE_HELPER",
    status: "live", // ✅ show working badge
  },
  {
    id: 4,
    title: "House Price Prediction",
    subtitle: "Built a house price prediction model using Django, Python, HTML, and CSS.",
    image: "https://raw.githubusercontent.com/ramim2219/house_price_prediction/refs/heads/main/three.png",
    github: "https://github.com/ramim2219/house_price_prediction?tab=readme-ov-file",
    status: "live", // ✅ show working badge
  },
  {
    id: 5,
    title: "Diabetes Risk Prediction",
    subtitle: "Developed a diabetes risk prediction system using Django, Python, HTML, and CSS.",
    image: "https://raw.githubusercontent.com/ramim2219/DiabetesRiskPrediction/main/home_d.png",
    github: "https://github.com/ramim2219/DiabetesRiskPrediction?tab=readme-ov-file",
    status: "live", // ✅ show working badge
  },
  {
    id: 6,
    title: "Village Scenerio",
    subtitle: "A CGIP course project that recreates a village scene through artistic coding to demonstrate computer graphics concepts.",
    image: "https://raw.githubusercontent.com/ramim2219/VillageScenerio/main/villageScenerio.png",
    github: "https://github.com/ramim2219/VillageScenerio",
    status: "live", // ✅ show working badge
  },
  {
    id: 7,
    title: "Movie Finder",
    subtitle: "A React-based app that lets users search for movies and view details using API integration.",
    image: "https://raw.githubusercontent.com/ramim2219/movie_finder/refs/heads/main/screencapture-easymoviefinder321-netlify-app-2024-10-13-00_20_59.png",
    github: "https://github.com/ramim2219/movie_finder",
    status: "live", // ✅ show working badge
  },
  // add more projects here (pagination will auto work)
];

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [preview, setPreview] = useState(null); // { src, title } | null

  const perPage = 6;
  const totalPages = Math.ceil(portfolioData.length / perPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return portfolioData.slice(start, start + perPage);
  }, [currentPage]);

  const goTo = (p) => setCurrentPage(Math.max(1, Math.min(totalPages, p)));

  const openGithub = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openPreview = (src, title) => {
    setPreview({ src, title });
    document.body.style.overflow = "hidden"; // lock scroll
  };

  const closePreview = () => {
    setPreview(null);
    document.body.style.overflow = ""; // unlock scroll
  };

  // ESC to close preview
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closePreview();
    };
    if (preview) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [preview]);

  return (
    <section id="work" className="section work-section">
      <div className="container">
        <SectionTitle heading={"Latest Projects"} subHeading={"Portfolio"} />

        <div className="row g-4">
          {currentItems.map((portfolio) => {
            const isWip = portfolio.status === "in_progress";

            return (
              <div className="col-sm-6 col-lg-4" key={portfolio.id}>
                {/* Whole card clickable => GitHub */}
                <div
                  className="portfolio-box portfolio-clickable"
                  role="button"
                  tabIndex={0}
                  onClick={() => openGithub(portfolio.github)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") openGithub(portfolio.github);
                  }}
                >
                  <div className="portfolio-img">
                    {/* ✅ WIP badge (top-left) */}
                    {isWip && (
                      <div className="portfolio-badge" title="Work in progress">
                        <span className="dot" />
                        In Progress
                      </div>
                    )}

                    {/* Image click => open preview (stop bubbling so card won't open github) */}
                    <button
                      type="button"
                      className="portfolio-img-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openPreview(portfolio.image, portfolio.title);
                      }}
                      aria-label={`Preview ${portfolio.title}`}
                    >
                      <img src={portfolio.image} alt={portfolio.title} />
                    </button>
                  </div>

                  <div className="portfolio-info">
                    <div className="portfolio-text">
                      <h6>{portfolio.title}</h6>
                      <span>{portfolio.subtitle}</span>

                      {/* ✅ subtle WIP helper text */}
                      {isWip && (
                        <small className="portfolio-wip-note">
                          Work is running… updates coming soon
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="latest-projects">
                    {/* ✅ Professional Live Link button */}
                    <a
                      href={portfolio.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`portfolio-linkbtn ${isWip ? "is-wip" : ""}`}
                      title={isWip ? "Open preview" : "Open live link"}
                    >
                      {isWip ? (
                        <>
                          <i className="fas fa-flask me-1" />
                          Preview
                        </>
                      ) : (
                        <>
                          <i className="fas fa-arrow-up-right-from-square me-1" />
                          Live Link
                        </>
                      )}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => goTo(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left" />
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <li
                  key={n}
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => goTo(n)}>
                    {n}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => goTo(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <i className="fas fa-chevron-right" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* FULLSCREEN PREVIEW (Lightbox) */}
      {preview && (
        <div
          className="portfolio-preview-overlay"
          role="dialog"
          aria-modal="true"
          onClick={closePreview}
        >
          <div
            className="portfolio-preview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="portfolio-preview-close"
              onClick={closePreview}
              aria-label="Close preview"
              title="Close"
            >
              ✕
            </button>

            <img src={preview.src} alt={preview.title || "Preview"} />
            {preview.title && (
              <p className="portfolio-preview-caption">{preview.title}</p>
            )}
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .col-sm-6.col-lg-4 {
          display: flex;
        }
        .portfolio-clickable {
          cursor: pointer;
        }
        .portfolio-box {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        /* ✅ Make all images same height */
        .portfolio-img {
          width: 100%;
          height: 220px;
          overflow: hidden;
          border-radius: 12px;
          position: relative; /* needed for badge */
        }

        .portfolio-img-btn {
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: zoom-in;
          display: block;
        }

        /* ✅ Crop from TOP */
        .portfolio-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
        }

        .portfolio-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .portfolio-text {
          flex-grow: 1;
        }

        .portfolio-text span {
          display: inline-block;
          opacity: 0.8;
        }

        .portfolio-wip-note {
          display: block;
          margin-top: 6px;
          font-size: 12px;
          opacity: 0.75;
        }

        /* ✅ WIP badge */
        .portfolio-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: #111;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(6px);
        }

        .portfolio-badge .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ffb020;
          box-shadow: 0 0 0 3px rgba(255, 176, 32, 0.18);
        }

        /* ✅ NEW BUTTON DESIGN (same class, same structure) */
        /* ✅ FIXED BUTTON DESIGN (no text vanish + proper spacing) */
        .portfolio-linkbtn {
          position: relative;
          isolation: isolate; /* ✅ ensures z-index layering works correctly */

          display: inline-flex;
          align-items: center;
          gap: 10px;

          padding: 10px 16px;
          margin-top: 12px;       /* ✅ creates space from card border/content */
          margin-bottom: 6px;     /* ✅ space from bottom border */
          width: fit-content;     /* ✅ prevents stretching */
          
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.3px;
          text-transform: uppercase;

          text-decoration: none;
          white-space: nowrap;

          border-radius: 0;
          border: 2px solid #111;
          color: #111;
          background: transparent;

          overflow: hidden;
          transition: color 0.25s ease, border-color 0.25s ease;
        }

        /* ✅ hover fill stays BEHIND text/icon */
        .portfolio-linkbtn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #111;
          transform: translateX(-101%);
          transition: transform 0.35s ease;
          z-index: -1; /* ✅ behind content */
        }

        .portfolio-linkbtn:hover::before {
          transform: translateX(0);
        }

        .portfolio-linkbtn:hover {
          color: #fff;
        }

        /* icon animation */
        .portfolio-linkbtn i {
          transition: transform 0.25s ease;
        }

        .portfolio-linkbtn:hover i {
          transform: translateX(4px);
        }

        /* ✅ WIP / Preview style */
        .portfolio-linkbtn.is-wip {
          border-color: #ff9800;
          color: #ff9800;
        }

        .portfolio-linkbtn.is-wip::before {
          background: #ff9800;
        }

        .portfolio-linkbtn.is-wip:hover {
          color: #111;
        }

        .latest-projects{
          margin-top: auto;
          padding-left : 5px;
        }

        /* =========================
          BLACK PAGINATION
          ========================= */
        .pagination .page-link {
          color: #000;
          background-color: #fff;
          border: 1px solid #000;
          transition: all 0.2s ease;
        }

        .pagination .page-link:hover {
          background-color: #000;
          color: #fff;
        }

        .pagination .page-item.active .page-link {
          background-color: #000;
          border-color: #000;
          color: #fff;
        }

        .pagination .page-item.disabled .page-link {
          color: #999;
          border-color: #ccc;
          background-color: #fff;
          cursor: not-allowed;
        }

        /* =========================
          PREVIEW (LIGHTBOX)
          ========================= */
        .portfolio-preview-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          padding-top: 80px; /* clears fixed header */
          z-index: 9999;
          overflow: hidden; /* no scroll outside modal */
        }

        .portfolio-preview-modal {
          position: relative;
          max-width: min(900px, 95vw);
          max-height: calc(90vh - 80px);
          background: #0b0b0b;
          border-radius: 14px;
          padding: 14px;
          overflow-y: auto; /* scroll only inside modal */
          overflow-x: hidden;
        }

        .portfolio-preview-modal img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 10px;
        }

        .portfolio-preview-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          cursor: pointer;
          font-size: 18px;
          line-height: 36px;
        }

        .portfolio-preview-close:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .portfolio-preview-caption {
          margin: 10px 2px 0;
          color: #eaeaea;
          font-size: 14px;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;