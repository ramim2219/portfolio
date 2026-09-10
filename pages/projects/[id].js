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
import { portfolioData, getProjectById } from "@/src/components/portfolioData";

export async function getStaticPaths() {
  return {
    paths: portfolioData.map((project) => ({ params: { id: String(project.id) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = getProjectById(params.id);

  if (!project) {
    return { notFound: true };
  }

  const index = portfolioData.findIndex((p) => p.id === project.id);
  const prevProject = portfolioData[(index - 1 + portfolioData.length) % portfolioData.length];
  const nextProject = portfolioData[(index + 1) % portfolioData.length];

  return {
    props: { project, prevProject, nextProject },
  };
}

const ProjectDetail = ({ project, prevProject, nextProject }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const galleryLength = project.gallery.length;

  const showPrevImage = () =>
    setLightboxIndex((i) => (i - 1 + galleryLength) % galleryLength);
  const showNextImage = () =>
    setLightboxIndex((i) => (i + 1) % galleryLength);

  return (
    <>
      <Head>
        <title>{project.title} | Ramim Dev</title>
        <meta name="description" content={project.description} />
      </Head>

      <Header />

      <main className="wrapper project-detail-page">
        {/* Hero */}
        <section className="section project-hero">
          <div className="container">
            <Link href="/#work" className="back-link">
              <ArrowLeft size={16} className="me-2" />
              Back to Portfolio
            </Link>

            <motion.div
              className="row align-items-center g-4 mt-2"
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
                <div className="project-hero-image">
                  <img src={project.image} alt={project.title} />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Body */}
        <section className="section project-body bg-gray">
          <div className="container">
            <div className="row g-4">
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
                      <h3 className="project-section-heading">Challenges &amp; Solutions</h3>
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
                                <span className="challenge-label">Challenge</span>
                                <p>{item.challenge}</p>
                              </div>
                            </div>
                            <div className="challenge-row is-solution">
                              <Lightbulb size={16} />
                              <div>
                                <span className="challenge-label">Solution</span>
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
                        <strong>{project.status === "in_progress" ? "In Progress" : "Completed / Live"}</strong>
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

        {/* Gallery */}
        <section className="section project-gallery-section">
          <div className="container">
            <motion.h3
              className="project-section-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Gallery
            </motion.h3>

            <div className="project-gallery-grid">
              {project.gallery.map((src, i) => (
                <motion.button
                  key={i}
                  type="button"
                  className="project-gallery-item"
                  onClick={() => setLightboxIndex(i)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  aria-label={`Open screenshot ${i + 1} of ${project.title}`}
                >
                  <img src={src} alt={`${project.title} screenshot ${i + 1}`} />
                  <span className="project-gallery-zoom">
                    <ZoomIn size={16} />
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {lightboxIndex !== null && (
            <div className="project-lightbox-overlay" onClick={() => setLightboxIndex(null)}>
              <button
                className="project-lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close gallery"
              >
                <X size={20} />
              </button>

              <div className="project-lightbox-content" onClick={(e) => e.stopPropagation()}>
                {galleryLength > 1 && (
                  <button
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
        </section>

        {/* Prev / Next project navigation */}
        <section className="section project-nav-section">
          <div className="container">
            <div className="project-nav-row">
              <Link href={`/projects/${prevProject.id}`} className="project-nav-link prev">
                <ChevronLeft size={18} />
                <div>
                  <small>Previous</small>
                  <span>{prevProject.title}</span>
                </div>
              </Link>
              <Link href={`/projects/${nextProject.id}`} className="project-nav-link next">
                <div>
                  <small>Next</small>
                  <span>{nextProject.title}</span>
                </div>
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .back-link {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: #111;
          text-decoration: none;
          border-bottom: 2px solid transparent;
          transition: border-color 0.2s ease;
        }
        .back-link:hover {
          border-color: #111;
        }

        .project-hero {
          padding-top: 140px;
          padding-bottom: 60px;
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
          font-size: 15px;
          font-weight: 700;
          color: #6366f1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
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

        .project-hero-image {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
        }
        .project-hero-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .project-body {
          padding: 60px 0 70px;
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

        .project-gallery-section {
          padding: 60px 0 70px;
        }
        .project-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .project-gallery-item {
          position: relative;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          padding: 0;
          cursor: zoom-in;
          aspect-ratio: 4 / 3;
          background: #f1f5f9;
        }
        .project-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
          transition: transform 0.4s ease;
        }
        .project-gallery-item:hover img {
          transform: scale(1.06);
        }
        .project-gallery-zoom {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        .project-lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .project-lightbox-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .project-lightbox-close:hover {
          background: rgba(239, 68, 68, 0.4);
        }
        .project-lightbox-content {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 92vw;
          justify-content: center;
        }
        .project-lightbox-content img {
          max-width: 82vw;
          max-height: 82vh;
          border-radius: 10px;
          box-shadow: 0 12px 60px rgba(0, 0, 0, 0.7);
          display: block;
        }
        .project-lightbox-nav {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }
        .project-lightbox-nav:hover {
          background: rgba(99, 102, 241, 0.4);
        }

        .project-nav-section {
          padding: 0 0 70px;
        }
        .project-nav-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          border-top: 1px solid #e2e8f0;
          padding-top: 30px;
        }
        .project-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #1e293b;
          max-width: 45%;
          transition: color 0.2s ease;
        }
        .project-nav-link:hover {
          color: #6366f1;
        }
        .project-nav-link.next {
          text-align: right;
          justify-content: flex-end;
          margin-left: auto;
        }
        .project-nav-link small {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #94a3b8;
          font-weight: 700;
        }
        .project-nav-link span {
          display: block;
          font-size: 14px;
          font-weight: 700;
        }

        @media (max-width: 991px) {
          .project-hero {
            padding-top: 120px;
          }
          .project-title {
            font-size: 1.9rem;
          }
        }

        @media (max-width: 576px) {
          .project-nav-link span {
            display: none;
          }
          .project-lightbox-nav {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectDetail;