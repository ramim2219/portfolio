'use client';

import SectionTitle from "./SectionTitle";
import { portfolioData, isPdf, isVideo } from "../data/portfolioData";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Portfolio = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 6;
  const totalPages = Math.ceil(portfolioData.length / perPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return portfolioData.slice(start, start + perPage);
  }, [currentPage]);

  const goTo = (p) => setCurrentPage(Math.max(1, Math.min(totalPages, p)));

  // Clicking anywhere on a card (including the image) takes the visitor
  // to the full case-study page for that project.
  const viewDetails = (id) => {
    router.push(`/projects/${id}`);
  };

  return (
    <section id="work" className="section work-section bg-gray">
      <div className="container">
        <SectionTitle
          heading={"Latest Projects"}
          subHeading={"Portfolio"}
          text={"Click any project to read the full case study — tech stack, key features, and links."}
        />

        <div className="row g-4">
          {currentItems.map((portfolio, index) => {
            const isWip = portfolio.status === "in_progress";
            const coverIsPdf = isPdf(portfolio.image);
            const coverIsVideo = isVideo(portfolio.image);

            return (
              <div className="col-sm-6 col-lg-4" key={portfolio.id}>
                {/* Whole card clickable => project detail page */}
                <motion.div
                  className="portfolio-box portfolio-clickable"
                  role="button"
                  tabIndex={0}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -8 }}
                  transition={{
                    opacity: { duration: 0.5, delay: (index % perPage) * 0.08 },
                    y: { type: "spring", stiffness: 260, damping: 22 },
                  }}
                  onClick={() => viewDetails(portfolio.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") viewDetails(portfolio.id);
                  }}
                >
                  <div className="portfolio-img">
                    {/* WIP badge (top-left) */}
                    {isWip && (
                      <div className="portfolio-badge" title="Work in progress">
                        <span className="dot" />
                        In Progress
                      </div>
                    )}

                    {/* Image / PDF / Video preview inside the card */}
                    {coverIsVideo ? (
                      <video
                        className="portfolio-video"
                        src={portfolio.image}
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="metadata"
                      />
                    ) : coverIsPdf ? (
                      <iframe
                        className="portfolio-pdf"
                        src={`${portfolio.image}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        title={portfolio.title}
                        loading="lazy"
                      />
                    ) : (
                      <img src={portfolio.image} alt={portfolio.title} />
                    )}

                    {/* Hover affordance hinting the card is clickable */}
                    <div className="portfolio-hover-hint">
                      <span>View Case Study</span>
                    </div>
                  </div>

                  <div className="portfolio-info">
                    <div className="portfolio-text">
                      <h6>{portfolio.title}</h6>
                      <span>{portfolio.subtitle}</span>

                      {isWip && (
                        <small className="portfolio-wip-note">
                          Work is running… updates coming soon
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="latest-projects">
                    {portfolio.link && (
                      <a
                        href={portfolio.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`portfolio-linkbtn ${isWip ? "is-wip" : ""}`}
                        title={portfolio.repoUrl ? "Open source code" : "Open live site"}
                      >
                        {isWip ? (
                          <>
                            <i className="fas fa-flask me-1" />
                            Preview
                          </>
                        ) : portfolio.repoUrl ? (
                          <>
                            <i className="fab fa-github me-1" />
                            Source Code
                          </>
                        ) : (
                          <>
                            <i className="fas fa-arrow-up-right-from-square me-1" />
                            Live Site
                          </>
                        )}
                      </a>
                    )}
                  </div>
                </motion.div>
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

        /* Fixed-height image area, never shrinks */
        .portfolio-img {
          width: 100%;
          height: 220px;
          overflow: hidden;
          border-radius: 12px;
          position: relative;
          flex-shrink: 0;
        }

        /* Crop from TOP */
        .portfolio-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
          transition: transform 0.5s ease;
        }

        /* PDF preview inside card (non-interactive so card click still works) */
        .portfolio-pdf {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
          background: #fff;
          pointer-events: none;
        }

        /* Video preview inside card (non-interactive so card click still works) */
        .portfolio-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
          background: #000;
          pointer-events: none;
        }

        .portfolio-clickable:hover .portfolio-img img {
          transform: scale(1.06);
        }

        /* Hover affordance signalling the card opens a case study */
        .portfolio-hover-hint {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 14px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent 55%);
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
          z-index: 1;
        }

        .portfolio-hover-hint span {
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 6px 14px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 999px;
          backdrop-filter: blur(4px);
        }

        .portfolio-clickable:hover .portfolio-hover-hint,
        .portfolio-clickable:focus-visible .portfolio-hover-hint {
          opacity: 1;
        }

        /* Info area grows to fill available space between image & button */
        .portfolio-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
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

        /* WIP badge */
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

        .portfolio-linkbtn {
          position: relative;
          isolation: isolate;

          display: inline-flex;
          align-items: center;
          gap: 10px;

          padding: 10px 16px;
          margin-top: 12px;
          margin-bottom: 6px;
          width: fit-content;

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

        .portfolio-linkbtn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #111;
          transform: translateX(-101%);
          transition: transform 0.35s ease;
          z-index: -1;
        }

        .portfolio-linkbtn:hover::before {
          transform: translateX(0);
        }

        .portfolio-linkbtn:hover {
          color: #fff;
        }

        .portfolio-linkbtn i {
          transition: transform 0.25s ease;
        }

        .portfolio-linkbtn:hover i {
          transform: translateX(4px);
        }

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

        /* Button container always pinned to bottom of the card */
        .latest-projects {
          margin-top: auto;
          padding-left: 5px;
          flex-shrink: 0;
        }

        /* PAGINATION */
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
        /* ============================================================
          DARK MODE — this card renders its own background/colors via
          the template stylesheet, so it needs explicit overrides here
          rather than relying on globals.css alone.
        ============================================================ */

        :global([data-theme="dark"] .portfolio-box) {
          background: var(--card-bg);
          border: 1px solid var(--border);
        }

        :global([data-theme="dark"] .portfolio-info h6) {
          color: var(--text);
        }

        :global([data-theme="dark"] .portfolio-text span) {
          color: var(--text-soft);
        }

        :global([data-theme="dark"] .portfolio-wip-note) {
          color: var(--text-muted);
        }

        /* Link button — hardcoded black border/text won't read on a dark card */
        :global([data-theme="dark"] .portfolio-linkbtn) {
          border-color: var(--text);
          color: var(--text);
        }
        :global([data-theme="dark"] .portfolio-linkbtn::before) {
          background: var(--text);
        }
        :global([data-theme="dark"] .portfolio-linkbtn:hover) {
          color: var(--bg);
        }

        :global([data-theme="dark"] .portfolio-linkbtn.is-wip) {
          border-color: #ff9800;
          color: #ff9800;
        }
        :global([data-theme="dark"] .portfolio-linkbtn.is-wip:hover) {
          color: var(--bg);
        }

        /* Pagination — hardcoded black/white scheme */
        :global([data-theme="dark"] .pagination .page-link) {
          color: var(--text);
          background-color: var(--card-bg);
          border-color: var(--border);
        }
        :global([data-theme="dark"] .pagination .page-link:hover) {
          background-color: var(--text);
          color: var(--bg);
        }
        :global([data-theme="dark"] .pagination .page-item.active .page-link) {
          background-color: var(--accent);
          border-color: var(--accent);
          color: var(--bg);
        }
        :global([data-theme="dark"] .pagination .page-item.disabled .page-link) {
          color: var(--text-muted);
          border-color: var(--border);
          background-color: var(--card-bg);
        }
      `}</style>
    </section>
  );
};

export default Portfolio;