import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  AlertTriangle,
  Lightbulb,
  ZoomIn,
  X,
} from "lucide-react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { portfolioData, getProjectById } from "@/src/data/portfolioData";

export async function getStaticPaths() {
  return {
    paths: portfolioData.map((p) => ({ params: { id: String(p.id) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = getProjectById(params.id);
  if (!project) return { notFound: true };

  const index = portfolioData.findIndex((p) => p.id === project.id);
  const prevProject =
    portfolioData[(index - 1 + portfolioData.length) % portfolioData.length];
  const nextProject = portfolioData[(index + 1) % portfolioData.length];

  return { props: { project, prevProject, nextProject } };
}

/* ─────────────────────────────────────────────────────────
   Build the alternating gallery rows.

   Rules:
   - Images come from `gallery`. If `sections[i].image` exists,
     it overrides the gallery image for that row.
   - The hero (gallery[0]) is only skipped if the gallery has more
     than one image — otherwise the gallery would be empty.
   - Row index === gallery index, so the lightbox always opens the
     correct image.
   ───────────────────────────────────────────────────────── */
function buildGalleryRows(project) {
  const fullGallery =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image];

  const heroIsCover = fullGallery[0] === project.image;
  const galleryImages =
    heroIsCover && fullGallery.length > 1 ? fullGallery.slice(1) : fullGallery;

  if (galleryImages.length === 0) return [];

  const sections = project.sections || [];

  const fallbackText = [
    {
      title: project.title,
      subtitle: project.subtitle,
      body: project.fullDescription,
    },
    ...project.features.map((feature, i) => ({
      title: `Feature ${i + 1}`,
      subtitle: "",
      body: feature,
    })),
    ...(project.challenges || []).map((c) => ({
      title: "Challenge & Solution",
      subtitle: "",
      body: (
        <>
          <p><strong>Challenge:</strong> {c.challenge}</p>
          <p><strong>Solution:</strong> {c.solution}</p>
        </>
      ),
    })),
  ];

  return galleryImages.map((image, i) => {
    const realIndex = heroIsCover && fullGallery.length > 1 ? i + 1 : i;
    const section = sections[i];
    const text =
      section || fallbackText[i] || fallbackText[fallbackText.length - 1] || {};

    return {
      image: section && section.image ? section.image : image,
      imageIndex: realIndex,
      title: text.title || "",
      subtitle: text.subtitle || "",
      body: text.body || "",
    };
  });
}

const ProjectDetail = ({ project, prevProject, nextProject }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const galleryLength = project.gallery.length;

  const showPrevImage = () =>
    setLightboxIndex((i) => (i - 1 + galleryLength) % galleryLength);
  const showNextImage = () =>
    setLightboxIndex((i) => (i + 1) % galleryLength);

  const rows = buildGalleryRows(project);

  return (
    <>
      <Head>
        <title>{project.title} | Ramim Dev</title>
        <meta name="description" content={project.description} />
      </Head>

      <Header />

      <main className="wrapper project-detail-page">
        {/* ─────────────────────────────────────────────
            BACK BUTTON
            ───────────────────────────────────────────── */}
        <section className="section project-hero">
          <div className="container">
            <Link href="/#work" className="nav-pill-btn back-top">
              <span className="pill-arrow">
                <ArrowLeft size={18} />
              </span>
              <span className="pill-label">Back to Portfolio</span>
            </Link>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            INTRO BLOCK — full project story
            ───────────────────────────────────────────── */}
        <section className="section project-intro">
          <div className="container">
            <motion.div
              className="row align-items-center g-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="col-lg-6">
                {project.status === "in_progress" && (
                  <span className="project-status-badge">
                    <span className="dot" /> In Progress
                  </span>
                )}
                <h1 className="project-title">{project.title}</h1>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-lead">{project.description}</p>

                <div className="project-cta">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-btn px-btn-theme"
                    >
                      <ExternalLink size={16} className="me-2" />
                      Visit Live Site
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-btn px-btn-theme2"
                    >
                      <Github size={16} className="me-2" />
                      View Source Code
                    </a>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <button
                  type="button"
                  className="project-hero-image"
                  onClick={() => setLightboxIndex(0)}
                  aria-label="Open main screenshot"
                >
                  <img src={project.image} alt={project.title} />
                  <span className="img-zoom-badge">
                    <ZoomIn size={16} />
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Full description + features + challenges */}
            <div className="row g-4 mt-5">
              <div className="col-lg-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="project-section-heading">Project Overview</h3>
                  <p className="project-full-desc">{project.fullDescription}</p>

                  <h3 className="project-section-heading">Key Features</h3>
                  <ul className="project-features">
                    {project.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                      >
                        <CheckCircle2 size={16} />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {project.challenges && project.challenges.length > 0 && (
                    <>
                      <h3 className="project-section-heading">
                        Challenges &amp; Solutions
                      </h3>
                      <div className="project-challenges">
                        {project.challenges.map((item, i) => (
                          <motion.div
                            key={i}
                            className="challenge-card"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                          >
                            <div className="challenge-row is-challenge">
                              <AlertTriangle size={16} />
                              <div>
                                <span className="challenge-label">
                                  Challenge
                                </span>
                                <p>{item.challenge}</p>
                              </div>
                            </div>
                            <div className="challenge-row is-solution">
                              <Lightbulb size={16} />
                              <div>
                                <span className="challenge-label">
                                  Solution
                                </span>
                                <p>{item.solution}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </div>

              <div className="col-lg-4">
                <motion.div
                  className="project-info-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h5>Project Info</h5>
                  <ul className="project-info-list">
                    {project.role && (
                      <li>
                        <User size={16} />
                        <div>
                          <span>Role</span>
                          <strong>{project.role}</strong>
                        </div>
                      </li>
                    )}
                    {project.duration && (
                      <li>
                        <Clock size={16} />
                        <div>
                          <span>Duration</span>
                          <strong>{project.duration}</strong>
                        </div>
                      </li>
                    )}
                    <li>
                      <CheckCircle2 size={16} />
                      <div>
                        <span>Status</span>
                        <strong>
                          {project.status === "in_progress"
                            ? "In Progress"
                            : "Completed / Live"}
                        </strong>
                      </div>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="project-tech-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h5>Tech Stack</h5>
                  <div className="project-tech-tags">
                    {project.techStack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            GALLERY — alternating rows using Bootstrap grid
            Row 0: [text col-md-6]  [image col-md-6]
            Row 1: [image col-md-6] [text col-md-6]
            Row 2: [text col-md-6]  [image col-md-6]
            …repeats for every gallery image
            ───────────────────────────────────────────── */}
        {rows.length > 0 && (
          <section className="section project-alternating bg-gray">
            <div className="container">
              <motion.h3
                className="project-section-heading gallery-heading"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Gallery
              </motion.h3>

              {rows.map((row, idx) => {
                const isReversed = idx % 2 === 1;

                return (
                  <motion.div
                    key={idx}
                    className="row g-4 align-items-center gallery-alt-row"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* TEXT column */}
                    <div
                      className={`col-md-6 ${
                        isReversed ? "order-md-2" : "order-md-1"
                      }`}
                    >
                      <div className="alt-content">
                        {row.title && (
                          <h3 className="alt-title">{row.title}</h3>
                        )}
                        {row.subtitle && (
                          <p className="project-subtitle">{row.subtitle}</p>
                        )}
                        <div className="alt-body">{row.body}</div>
                      </div>
                    </div>

                    {/* IMAGE column */}
                    <div
                      className={`col-md-6 ${
                        isReversed ? "order-md-1" : "order-md-2"
                      }`}
                    >
                      <button
                        type="button"
                        className="gallery-image-card"
                        onClick={() => setLightboxIndex(row.imageIndex)}
                        aria-label={`Open screenshot ${row.imageIndex + 1}`}
                      >
                        <img
                          src={row.image}
                          alt={`${project.title} screenshot ${
                            row.imageIndex + 1
                          }`}
                        />
                        <span className="img-zoom-badge">
                          <ZoomIn size={16} />
                        </span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────
            LIGHTBOX
            ───────────────────────────────────────────── */}
        {lightboxIndex !== null && (
          <div
            className="project-lightbox-overlay"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              className="project-lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              aria-label="Close gallery"
            >
              <X size={22} />
            </button>

            <div
              className="project-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryLength > 1 && (
                <button
                  type="button"
                  className="project-lightbox-nav"
                  onClick={showPrevImage}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={26} />
                </button>
              )}
              <img
                src={project.gallery[lightboxIndex]}
                alt={`${project.title} screenshot ${lightboxIndex + 1}`}
              />
              {galleryLength > 1 && (
                <button
                  type="button"
                  className="project-lightbox-nav"
                  onClick={showNextImage}
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={26} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────
            PREV / NEXT NAV
            ───────────────────────────────────────────── */}
        <section className="section project-nav-section">
          <div className="container">
            <div className="project-nav-row">
              <Link
                href={`/projects/${prevProject.id}`}
                className="nav-pill-btn nav-prev"
              >
                <span className="pill-arrow">
                  <ChevronLeft size={18} />
                </span>
                <span className="pill-text">
                  <small>Previous</small>
                  <strong>{prevProject.title}</strong>
                </span>
              </Link>
              <Link
                href={`/projects/${nextProject.id}`}
                className="nav-pill-btn nav-next"
              >
                <span className="pill-text pill-text-right">
                  <small>Next</small>
                  <strong>{nextProject.title}</strong>
                </span>
                <span className="pill-arrow">
                  <ChevronRight size={18} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        /* ─── NAV PILL BUTTON ──────────────────────────── */
        :global(.nav-pill-btn) {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.2px;
          line-height: 1;
          color: #111827;
          background: #f7af24;
          border: 2px solid #f7af24;
          box-shadow: 0 6px 16px -6px rgba(247, 175, 36, 0.45);
          text-decoration: none;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease,
            border-color 0.25s ease, transform 0.25s ease,
            box-shadow 0.25s ease;
        }
        :global(.nav-pill-btn:hover) {
          background: #111827;
          color: #f7af24;
          border-color: #111827;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -10px rgba(17, 24, 39, 0.35);
        }
        :global(.nav-pill-btn:active) {
          transform: translateY(0);
          box-shadow: 0 4px 10px -4px rgba(17, 24, 39, 0.3);
        }
        :global(.nav-pill-btn:focus-visible) {
          outline: 3px solid rgba(247, 175, 36, 0.4);
          outline-offset: 3px;
        }
        :global(.nav-pill-btn .pill-arrow) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
        }
        :global(.nav-pill-btn.nav-prev:hover .pill-arrow) {
          transform: translateX(-4px);
        }
        :global(.nav-pill-btn.nav-next:hover .pill-arrow) {
          transform: translateX(4px);
        }
        :global(.nav-pill-btn.back-top:hover .pill-arrow) {
          transform: translateX(-4px);
        }
        :global(.nav-pill-btn .pill-text) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.15;
          min-width: 0;
        }
        :global(.nav-pill-btn .pill-text-right) {
          align-items: flex-end;
        }
        :global(.nav-pill-btn .pill-text small) {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          opacity: 0.7;
        }
        :global(.nav-pill-btn .pill-text strong) {
          font-size: 15px;
          font-weight: 800;
          max-width: 220px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        :global(.nav-pill-btn .pill-label) {
          font-size: 15px;
          font-weight: 700;
        }
        :global(.nav-pill-btn.back-top) {
          margin-top: 20px;
        }
        .project-nav-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        :global(.nav-pill-btn.nav-next) {
          margin-left: auto;
        }

        /* ─── PAGE / HERO (navbar clearance) ───────────── */
        .project-hero {
          padding-top: 120px;
          padding-bottom: 0;
        }

        .project-intro {
          padding: 30px 0 70px;
        }

        .project-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #b45309;
          background: rgba(255, 176, 32, 0.15);
          border: 1px solid rgba(255, 176, 32, 0.35);
          border-radius: 999px;
          padding: 6px 14px;
          margin-bottom: 16px;
        }
        .project-status-badge .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ffb020;
        }

        .project-title {
          font-size: 2.4rem;
          font-weight: 800;
          color: #111;
          line-height: 1.2;
          margin-bottom: 10px;
        }
        .project-subtitle {
          font-size: 13px;
          font-weight: 700;
          color: #6366f1;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 16px;
        }
        .project-lead {
          font-size: 16px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 26px;
        }
        .project-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        /* ─── SHARED IMAGE CARD TREATMENT ─────────────── */
        .project-hero-image,
        .gallery-image-card {
          position: relative;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          padding: 0;
          cursor: zoom-in;
          aspect-ratio: 16 / 10;
          background: #f1f5f9;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
          display: block;
          width: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .project-hero-image:hover,
        .gallery-image-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.16);
        }
        .project-hero-image img,
        .gallery-image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
          transition: transform 0.5s ease;
        }
        .project-hero-image:hover img,
        .gallery-image-card:hover img {
          transform: scale(1.04);
        }

        /* Shared zoom badge */
        .img-zoom-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          pointer-events: none;
        }

        /* ─── BODY (overview / features / challenges) ──── */
        .bg-gray {
          background: #f8fafc;
        }

        .project-section-heading {
          font-size: 1.3rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 14px;
        }
        .project-section-heading:not(:first-child) {
          margin-top: 30px;
        }

        .project-full-desc {
          font-size: 15.5px;
          line-height: 1.85;
          color: #475569;
        }

        .project-features {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .project-features li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14.5px;
          color: #334155;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px 14px;
        }
        .project-features li :global(svg) {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .project-challenges {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .challenge-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .challenge-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .challenge-row p {
          margin: 2px 0 0;
          font-size: 14px;
          line-height: 1.6;
          color: #475569;
        }
        .challenge-label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }
        .challenge-row.is-challenge :global(svg) {
          color: #f59e0b;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .challenge-row.is-challenge .challenge-label {
          color: #b45309;
        }
        .challenge-row.is-solution :global(svg) {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .challenge-row.is-solution .challenge-label {
          color: #047857;
        }

        .project-info-card,
        .project-tech-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 22px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          margin-bottom: 20px;
        }
        .project-info-card h5,
        .project-tech-card h5 {
          font-size: 15px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 14px;
        }
        .project-info-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .project-info-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .project-info-list li :global(svg) {
          color: #3b82f6;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .project-info-list li span {
          display: block;
          font-size: 11px;
          color: #94a3b8;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .project-info-list li strong {
          display: block;
          font-size: 14px;
          color: #1e293b;
          font-weight: 700;
          margin-top: 2px;
        }

        .project-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .project-tech-tags span {
          background: #eff6ff;
          color: #3b82f6;
          font-size: 12.5px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 20px;
        }

        /* ─── ALTERNATING GALLERY ROWS (Bootstrap grid) ── */
        .project-alternating {
          padding: 70px 0 80px;
        }

        .gallery-heading {
          text-align: center;
          margin-bottom: 30px;
        }

        .gallery-alt-row {
          padding: 48px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .gallery-alt-row:last-child {
          border-bottom: none;
        }

        .alt-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #111;
          margin-bottom: 10px;
          line-height: 1.25;
        }

        .alt-body {
          font-size: 15.5px;
          line-height: 1.8;
          color: #475569;
        }
        .alt-body p {
          margin-bottom: 10px;
        }
        .alt-body p:last-child {
          margin-bottom: 0;
        }

        /* ─── LIGHTBOX (fixed z-index + top offset) ────── */
        .project-lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 90px 16px 16px;
        }

        .project-lightbox-close {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100001;
          backdrop-filter: blur(6px);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .project-lightbox-close:hover {
          background: rgba(239, 68, 68, 0.65);
          transform: scale(1.06);
        }
        .project-lightbox-close:focus-visible {
          outline: 3px solid rgba(255, 255, 255, 0.5);
          outline-offset: 2px;
        }

        .project-lightbox-content {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 92vw;
          max-height: calc(100vh - 120px);
          justify-content: center;
        }

        .project-lightbox-content img {
          max-width: 82vw;
          max-height: calc(100vh - 140px);
          border-radius: 10px;
          box-shadow: 0 12px 60px rgba(0, 0, 0, 0.7);
          display: block;
          object-fit: contain;
        }

        .project-lightbox-nav {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          backdrop-filter: blur(4px);
          transition: background 0.2s ease;
        }
        .project-lightbox-nav:hover {
          background: rgba(99, 102, 241, 0.55);
        }

        .project-nav-section {
          padding: 0 0 70px;
        }

        /* ─── RESPONSIVE ───────────────────────────────── */
        @media (max-width: 991px) {
          .project-hero {
            padding-top: 100px;
          }
          .project-title {
            font-size: 1.9rem;
          }
          .gallery-alt-row {
            padding: 32px 0;
          }
          .alt-title {
            font-size: 1.35rem;
          }
        }

        @media (max-width: 767px) {
          :global(.nav-pill-btn) {
            padding: 12px 22px;
            font-size: 14px;
            gap: 10px;
          }
          :global(.nav-pill-btn .pill-text strong),
          :global(.nav-pill-btn .pill-label) {
            font-size: 13.5px;
          }
          :global(.nav-pill-btn .pill-text small) {
            font-size: 10px;
          }
          :global(.nav-pill-btn .pill-text strong) {
            max-width: 140px;
          }
          .project-lightbox-overlay {
            padding: 80px 12px 12px;
          }
        }

        @media (max-width: 576px) {
          .project-hero {
            padding-top: 90px;
          }
          .project-nav-row {
            flex-direction: column;
            align-items: stretch;
          }
          :global(.nav-pill-btn.nav-next) {
            margin-left: 0;
            justify-content: flex-end;
          }
          :global(.nav-pill-btn.nav-prev) {
            justify-content: flex-start;
          }
          .project-lightbox-nav {
            width: 34px;
            height: 34px;
          }
          .project-lightbox-close {
            top: 14px;
            right: 14px;
            width: 40px;
            height: 40px;
          }
          .project-lightbox-content img {
            max-width: 90vw;
            max-height: calc(100vh - 140px);
          }
        }
      `}</style>
    </>
  );
};

export default ProjectDetail;