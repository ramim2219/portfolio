import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  Lightbulb,
  Building2,
  X,
} from "lucide-react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { experienceData, getExperienceById } from "@/src/data/experienceData";

export async function getStaticPaths() {
  return {
    paths: experienceData.map((role) => ({ params: { id: String(role.id) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const role = getExperienceById(params.id);
  if (!role) return { notFound: true };
  return { props: { role } };
}

const ExperienceDetail = ({ role }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const gallery = role.gallery || [];
  const hasGallery = gallery.length > 0;

  return (
    <>
      <Head>
        <title>{role.title} | Ramim Dev</title>
        <meta name="description" content={role.description} />
      </Head>

      <Header />

      <main className="wrapper project-detail-page">
        {/* ─────────────────────────────
            HERO
            ───────────────────────────── */}
        <section className="section project-hero">
          <div className="container">
            {/* Top back pill */}
            <Link href="/#about" className="nav-pill-btn back-top">
              <span className="pill-arrow">
                <ArrowLeft size={18} />
              </span>
              <span className="pill-label">Back to About</span>
            </Link>

            <motion.div
              className="row align-items-center g-5 mt-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* LEFT: Text */}
              <div className="col-lg-6">
                <span className="project-status-badge">
                  <span className="dot" /> {role.tag}
                </span>

                <h1 className="project-title">{role.title}</h1>
                <p className="project-subtitle">{role.subtitle}</p>
                <p className="project-lead">{role.description}</p>

                {/* Small meta chip row */}
                <div className="hero-meta-row">
                  <div className="hero-meta-chip">
                    <Building2 size={14} />
                    <span>{role.org}</span>
                  </div>
                  <div className="hero-meta-chip">
                    <Clock size={14} />
                    <span>{role.period}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Working photo with org logo overlay */}
              <div className="col-lg-6">
                <div className="project-hero-image">
                  {/* Replace with a real photo of you at the office */}
                  <img
                    src="/assets/img/my_activities/Office/office_time.jpeg"
                    alt={`${role.title} — working at ${role.org}`}
                  />

                  {/* Organisation logo badge — small, top-left */}
                  <div className="org-logo-badge" title={role.org}>
                    <img
                      src={role.image || "/assets/img/puc.png"}
                      alt={`${role.org} logo`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────
            BODY
            ───────────────────────────── */}
        <section className="section project-body bg-gray">
          <div className="container">
            <div className="row g-4">
              {/* Main content */}
              <div className="col-lg-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="project-section-heading">Overview</h3>
                  <p className="project-full-desc">{role.fullDescription}</p>

                  <h3 className="project-section-heading">
                    Key Responsibilities
                  </h3>
                  <ul className="project-features">
                    {role.responsibilities.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                      >
                        <CheckCircle2 size={16} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {role.outcomes && role.outcomes.length > 0 && (
                    <>
                      <h3 className="project-section-heading">
                        Impact &amp; Outcomes
                      </h3>
                      <div className="project-challenges">
                        {role.outcomes.map((o, i) => (
                          <motion.div
                            key={i}
                            className="challenge-card"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                          >
                            <div className="challenge-row is-solution">
                              <Lightbulb size={16} />
                              <div>
                                <span className="challenge-label">
                                  {o.title}
                                </span>
                                <p>{o.text}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* ── Screenshot gallery — only renders when role.gallery exists ── */}
                  {hasGallery && (
                    <>
                      <h3 className="project-section-heading">Screenshots</h3>
                      <div className="gallery-grid">
                        {gallery.map((item, i) => (
                          <motion.button
                            key={i}
                            type="button"
                            className="gallery-thumb"
                            onClick={() => setLightboxIndex(i)}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: i * 0.05 }}
                          >
                            <img src={item.src} alt={item.caption} />
                            <span className="gallery-thumb-caption">
                              {item.caption}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="col-lg-4">
                <motion.div
                  className="project-info-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h5>Role Info</h5>
                  <ul className="project-info-list">
                    <li>
                      <User size={16} />
                      <div>
                        <span>Organisation</span>
                        <strong>{role.org}</strong>
                      </div>
                    </li>
                    <li>
                      <Clock size={16} />
                      <div>
                        <span>Period</span>
                        <strong>{role.period}</strong>
                      </div>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <div>
                        <span>Status</span>
                        <strong>{role.status}</strong>
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
                  <h5>Skills &amp; Tools</h5>
                  <div className="project-tech-tags">
                    {role.topics.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Lightbox — sits outside the grid, covers the viewport */}
        {hasGallery && lightboxIndex !== null && (
          <div
            className="gallery-lightbox-overlay"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="gallery-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div
              className="gallery-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="gallery-lightbox-nav"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + gallery.length) % gallery.length
                  )
                }
                aria-label="Previous"
              >
                <ChevronLeft size={26} />
              </button>
              <div className="gallery-lightbox-img-wrap">
                <img
                  src={gallery[lightboxIndex].src}
                  alt={gallery[lightboxIndex].caption}
                />
                <p className="gallery-lightbox-caption">
                  {gallery[lightboxIndex].caption}
                </p>
              </div>
              <button
                className="gallery-lightbox-nav"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % gallery.length)
                }
                aria-label="Next"
              >
                <ChevronRight size={26} />
              </button>
            </div>
          </div>
        )}

        {/* ─────────────────────────────
            BOTTOM NAV
            ───────────────────────────── */}
        <section className="section project-nav-section">
          <div className="container">
            <div className="project-nav-row">
              <Link href="/#about" className="nav-pill-btn nav-prev">
                <span className="pill-arrow">
                  <ChevronLeft size={18} />
                </span>
                <span className="pill-text">
                  <small>Back to</small>
                  <strong>About Me</strong>
                </span>
              </Link>

              <Link
                href="/leadership/competitive-programming-trainer"
                className="nav-pill-btn nav-next"
              >
                <span className="pill-text pill-text-right">
                  <small>See also</small>
                  <strong>Leadership Role</strong>
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
        /* ─────────────────────────────
           NAV PILLS
           ───────────────────────────── */
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
          background: #F7AF24;
          border: 2px solid #F7AF24;
          box-shadow: 0 6px 16px -6px rgba(247, 175, 36, 0.45);
          text-decoration: none;
          cursor: pointer;
          transition:
            background 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }
        :global(.nav-pill-btn:hover) {
          background: #111827;
          color: #F7AF24;
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
        :global(.nav-pill-btn.nav-prev:hover .pill-arrow),
        :global(.nav-pill-btn.back-top:hover .pill-arrow) {
          transform: translateX(-4px);
        }
        :global(.nav-pill-btn.nav-next:hover .pill-arrow) {
          transform: translateX(4px);
        }
        :global(.nav-pill-btn .pill-text) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.15;
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

        /* ─────────────────────────────
           HERO
           ───────────────────────────── */
        .project-hero {
          padding-top: 140px;
          padding-bottom: 70px;
        }

        .project-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #4338ca;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 999px;
          padding: 5px 12px;
          margin-bottom: 14px;
        }
        .project-status-badge .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }

        .project-title {
          font-size: 2.6rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-bottom: 12px;
        }
        .project-subtitle {
          font-size: 13px;
          font-weight: 700;
          color: #6366f1;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 18px;
        }
        .project-lead {
          font-size: 15.5px;
          line-height: 1.85;
          color: #475569;
          margin-bottom: 24px;
          max-width: 540px;
        }

        /* Meta chip row */
        .hero-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .hero-meta-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          font-size: 12.5px;
          font-weight: 600;
          color: #334155;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
        }
        .hero-meta-chip :global(svg) {
          color: #6366f1;
          flex-shrink: 0;
        }

        /* Hero image (working photo) with small logo overlay */
        .project-hero-image {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.04),
            0 20px 40px -12px rgba(15, 23, 42, 0.18);
          aspect-ratio: 4 / 3;
          background: #f1f5f9;
        }
        .project-hero-image > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Organisation logo badge — small, top-left */
        .org-logo-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          width: 52px;
          height: 52px;
          border-radius: 12px;
          padding: 6px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        .org-logo-badge img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        /* ─────────────────────────────
           BODY
           ───────────────────────────── */
        .project-body { padding: 70px 0 80px; }

        .project-section-heading {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.2px;
          margin: 0 0 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e2e8f0;
        }
        .project-section-heading:not(:first-child) {
          margin-top: 36px;
        }

        .project-full-desc {
          font-size: 15px;
          line-height: 1.85;
          color: #475569;
        }

        .project-features {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .project-features li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          line-height: 1.6;
          color: #334155;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px 14px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .project-features li:hover {
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 4px 14px -6px rgba(99, 102, 241, 0.2);
        }
        .project-features li :global(svg) {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Outcomes */
        .project-challenges {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .challenge-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 18px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .challenge-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -18px rgba(99, 102, 241, 0.3);
        }
        .challenge-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .challenge-row p {
          margin: 4px 0 0;
          font-size: 13.5px;
          line-height: 1.65;
          color: #475569;
        }
        .challenge-label {
          display: block;
          font-size: 12.5px;
          font-weight: 800;
          letter-spacing: 0.2px;
        }
        .challenge-row.is-solution :global(svg) {
          color: #6366f1;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .challenge-row.is-solution .challenge-label {
          color: #4338ca;
        }

        /* Screenshot gallery */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 14px;
        }
        .gallery-thumb {
          position: relative;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          background: #0a0a0a;
          aspect-ratio: 4 / 3;
          padding: 0;
          cursor: pointer;
          display: block;
          text-align: left;
        }
        .gallery-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }
        .gallery-thumb:hover img {
          transform: scale(1.05);
        }
        .gallery-thumb-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 8px 10px;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
        }

        /* Sidebar cards */
        .project-info-card,
        .project-tech-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 22px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          margin-bottom: 20px;
        }
        .project-info-card h5,
        .project-tech-card h5 {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.1px;
          margin-bottom: 16px;
        }
        .project-info-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .project-info-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .project-info-list li :global(svg) {
          color: #3b82f6;
          margin-top: 3px;
          flex-shrink: 0;
        }
        .project-info-list li span {
          display: block;
          font-size: 10.5px;
          color: #94a3b8;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .project-info-list li strong {
          display: block;
          font-size: 13.5px;
          color: #0f172a;
          font-weight: 700;
          margin-top: 3px;
        }

        .project-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .project-tech-tags span {
          background: #eff6ff;
          color: #3b82f6;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 11px;
          border-radius: 20px;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .project-tech-tags span:hover {
          background: #dbeafe;
          transform: translateY(-1px);
        }

        .project-nav-section { padding: 0 0 80px; }

        /* ─────────────────────────────
           LIGHTBOX (global — rendered outside the scoped tree's normal flow)
           ───────────────────────────── */
        :global(.gallery-lightbox-overlay) {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.92);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          padding: 16px;
        }
        :global(.gallery-lightbox-close) {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        :global(.gallery-lightbox-close:hover) {
          background: rgba(239, 68, 68, 0.4);
        }
        :global(.gallery-lightbox-content) {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 92vw;
          justify-content: center;
        }
        :global(.gallery-lightbox-img-wrap) {
          text-align: center;
        }
        :global(.gallery-lightbox-img-wrap img) {
          width: auto;
          height: auto;
          max-width: 80vw;
          max-height: 78vh;
          border-radius: 10px;
          object-fit: contain;
          box-shadow: 0 12px 60px rgba(0, 0, 0, 0.7);
          display: block;
          margin: 0 auto;
        }
        :global(.gallery-lightbox-caption) {
          margin-top: 12px;
          color: #e0e7ff;
          font-size: 13.5px;
        }
        :global(.gallery-lightbox-nav) {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        :global(.gallery-lightbox-nav:hover) {
          background: rgba(99, 102, 241, 0.4);
        }

        /* ─────────────────────────────
           RESPONSIVE
           ───────────────────────────── */
        @media (max-width: 991px) {
          .project-hero { padding-top: 120px; padding-bottom: 50px; }
          .project-title { font-size: 2rem; }
          .project-lead { max-width: 100%; }
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
          .project-title { font-size: 1.75rem; }
          .project-body { padding: 50px 0 60px; }

          .org-logo-badge {
            width: 44px;
            height: 44px;
            top: 12px;
            left: 12px;
            padding: 5px;
          }
        }

        @media (max-width: 576px) {
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
          .hero-meta-row { gap: 8px; }
          .hero-meta-chip {
            font-size: 11.5px;
            padding: 6px 11px;
          }
        }

        @media (max-width: 575px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          :global(.gallery-lightbox-img-wrap img) {
            max-width: 72vw;
            max-height: 65vh;
          }
        }
      `}</style>
    </>
  );
};

export default ExperienceDetail;