import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Trophy,
  Award,
  BadgeCheck,
  ZoomIn,
  X,
} from "lucide-react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import {
  allAchievements,
  getAchievementById,
} from "@/src/data/achievementsData";

export async function getStaticPaths() {
  return {
    paths: allAchievements.map((item) => ({ params: { id: String(item.id) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const item = getAchievementById(params.id);
  if (!item) return { notFound: true };

  const index = allAchievements.findIndex((a) => a.id === item.id);
  const prevItem =
    allAchievements[
      (index - 1 + allAchievements.length) % allAchievements.length
    ];
  const nextItem = allAchievements[(index + 1) % allAchievements.length];

  return { props: { item, prevItem, nextItem } };
}

const AchievementDetail = ({ item, prevItem, nextItem }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const galleryLength = item.gallery.length;
  const isCert = item.type === "certification";

  const showPrevImage = () =>
    setLightboxIndex((i) => (i - 1 + galleryLength) % galleryLength);
  const showNextImage = () =>
    setLightboxIndex((i) => (i + 1) % galleryLength);

  return (
    <>
      <Head>
        <title>{item.title} | Ramim Dev</title>
        <meta name="description" content={item.description} />
      </Head>

      <Header />

      <main className="wrapper achievement-detail-page">
        {/* Hero */}
        <section className="section achievement-hero">
          <div className="container">
            {/* ✅ Top back button — amber pill */}
            <Link href="/#about" className="nav-pill-btn back-top">
              <span className="pill-arrow">
                <ArrowLeft size={18} />
              </span>
              <span className="pill-label">Back to About</span>
            </Link>

            <motion.div
              className="row align-items-center g-4 mt-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="col-lg-6">
                <span className="achievement-type-badge">
                  {isCert ? <BadgeCheck size={14} /> : <Trophy size={14} />}
                  {isCert ? "Certification" : "Achievement"}
                </span>

                <h1 className="achievement-title">{item.title}</h1>
                <p className="achievement-subtitle">{item.subtitle}</p>

                {item.rank && (
                  <div className="achievement-rank-box">
                    <Award size={18} />
                    <strong>{item.rank}</strong>
                    <span>{item.rankLabel}</span>
                  </div>
                )}

                <p className="achievement-lead">{item.description}</p>

                <div className="achievement-meta">
                  {item.date && (
                    <span>
                      <Calendar size={14} /> {item.date}
                    </span>
                  )}
                  {item.location && (
                    <span>
                      <MapPin size={14} /> {item.location}
                    </span>
                  )}
                </div>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-btn px-btn-theme mt-3"
                  >
                    <ExternalLink size={16} className="me-2" />
                    View Link
                  </a>
                )}
              </div>

              <div className="col-lg-6">
                <div className="achievement-hero-image">
                  <img src={item.image} alt={item.title} />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Body */}
        <section className="section achievement-body bg-gray">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="achievement-section-heading">Overview</h3>
                  <p className="achievement-full-desc">{item.fullDescription}</p>

                  {item.highlights && item.highlights.length > 0 && (
                    <>
                      <h3 className="achievement-section-heading">Highlights</h3>
                      <ul className="achievement-highlights">
                        {item.highlights.map((h, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -14 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                          >
                            <CheckCircle2 size={16} />
                            <span>{h}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </>
                  )}
                </motion.div>
              </div>

              <div className="col-lg-4">
                <motion.div
                  className="achievement-info-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h5>Details</h5>
                  <ul className="achievement-info-list">
                    {item.rank && (
                      <li>
                        <Trophy size={16} />
                        <div>
                          <span>Rank</span>
                          <strong>{item.rank}</strong>
                        </div>
                      </li>
                    )}
                    {item.issuer && (
                      <li>
                        <BadgeCheck size={16} />
                        <div>
                          <span>Issuer</span>
                          <strong>{item.issuer}</strong>
                        </div>
                      </li>
                    )}
                    {item.date && (
                      <li>
                        <Calendar size={16} />
                        <div>
                          <span>Date</span>
                          <strong>{item.date}</strong>
                        </div>
                      </li>
                    )}
                    {item.location && (
                      <li>
                        <MapPin size={16} />
                        <div>
                          <span>Location</span>
                          <strong>{item.location}</strong>
                        </div>
                      </li>
                    )}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {item.gallery.length > 0 && (
          <section className="section achievement-gallery-section">
            <div className="container">
              <h3 className="achievement-section-heading">Gallery</h3>
              <div className="achievement-gallery-grid">
                {item.gallery.map((src, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    className="achievement-gallery-item"
                    onClick={() => setLightboxIndex(i)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <img src={src} alt={`${item.title} ${i + 1}`} />
                    <span className="achievement-gallery-zoom">
                      <ZoomIn size={16} />
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {lightboxIndex !== null && (
              <div
                className="achievement-lightbox-overlay"
                onClick={() => setLightboxIndex(null)}
              >
                <button
                  className="achievement-lightbox-close"
                  onClick={() => setLightboxIndex(null)}
                >
                  <X size={20} />
                </button>
                <div
                  className="achievement-lightbox-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  {galleryLength > 1 && (
                    <button
                      className="achievement-lightbox-nav"
                      onClick={showPrevImage}
                    >
                      <ChevronLeft size={26} />
                    </button>
                  )}
                  <img
                    src={item.gallery[lightboxIndex]}
                    alt={`${item.title} ${lightboxIndex + 1}`}
                  />
                  {galleryLength > 1 && (
                    <button
                      className="achievement-lightbox-nav"
                      onClick={showNextImage}
                    >
                      <ChevronRight size={26} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ---------- Prev / Next (amber pills) ---------- */}
        <section className="section achievement-nav-section">
          <div className="container">
            <div className="achievement-nav-row">
              <Link
                href={`/achievements/${prevItem.id}`}
                className="nav-pill-btn nav-prev"
              >
                <span className="pill-arrow">
                  <ChevronLeft size={18} />
                </span>
                <span className="pill-text">
                  <small>Previous</small>
                  <strong>{prevItem.title}</strong>
                </span>
              </Link>

              <Link
                href={`/achievements/${nextItem.id}`}
                className="nav-pill-btn nav-next"
              >
                <span className="pill-text pill-text-right">
                  <small>Next</small>
                  <strong>{nextItem.title}</strong>
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
        /* ─────────────────────────────────────────────
           NAV PILL BUTTON — consistent across all detail pages
           ───────────────────────────────────────────── */
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

        .achievement-nav-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        :global(.nav-pill-btn.nav-next) {
          margin-left: auto;
        }

        /* ─────────────────────────────────────────────
           PAGE STYLES
           ───────────────────────────────────────────── */
        .achievement-hero { padding-top: 140px; padding-bottom: 60px; }

        .achievement-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6366f1;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 999px;
          padding: 6px 14px;
          margin-bottom: 16px;
        }

        .achievement-title {
          font-size: 2.4rem;
          font-weight: 800;
          color: #111;
          line-height: 1.2;
          margin-bottom: 10px;
        }
        .achievement-subtitle {
          font-size: 15px;
          font-weight: 700;
          color: #6366f1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }

        .achievement-rank-box {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.1));
          border: 1px solid rgba(99,102,241,0.3);
          margin-bottom: 18px;
        }
        .achievement-rank-box strong {
          font-size: 1.4rem;
          color: #6366f1;
          font-weight: 800;
        }
        .achievement-rank-box span {
          font-size: 13px;
          color: #475569;
          font-weight: 600;
        }

        .achievement-lead {
          font-size: 16px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 20px;
        }

        .achievement-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 13px;
          color: #64748b;
        }
        .achievement-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }

        .achievement-hero-image {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
        }
        .achievement-hero-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .achievement-body { padding: 60px 0 70px; }

        .achievement-section-heading {
          font-size: 1.3rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 14px;
        }
        .achievement-section-heading:not(:first-child) { margin-top: 30px; }

        .achievement-full-desc {
          font-size: 15.5px;
          line-height: 1.85;
          color: #475569;
        }

        .achievement-highlights {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .achievement-highlights li {
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
        .achievement-highlights li :global(svg) {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .achievement-info-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 22px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }
        .achievement-info-card h5 {
          font-size: 15px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 14px;
        }
        .achievement-info-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .achievement-info-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .achievement-info-list li :global(svg) {
          color: #3b82f6;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .achievement-info-list li span {
          display: block;
          font-size: 11px;
          color: #94a3b8;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .achievement-info-list li strong {
          display: block;
          font-size: 14px;
          color: #1e293b;
          font-weight: 700;
          margin-top: 2px;
        }

        .achievement-gallery-section { padding: 60px 0 70px; }
        .achievement-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .achievement-gallery-item {
          position: relative;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          padding: 0;
          cursor: zoom-in;
          aspect-ratio: 4 / 3;
          background: #f1f5f9;
        }
        .achievement-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
          transition: transform 0.4s ease;
        }
        .achievement-gallery-item:hover img { transform: scale(1.06); }
        .achievement-gallery-zoom {
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
        }

        .achievement-lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .achievement-lightbox-close {
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
        .achievement-lightbox-content {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 92vw;
        }
        .achievement-lightbox-content img {
          max-width: 82vw;
          max-height: 82vh;
          border-radius: 10px;
          box-shadow: 0 12px 60px rgba(0, 0, 0, 0.7);
          display: block;
        }
        .achievement-lightbox-nav {
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

        .achievement-nav-section { padding: 0 0 70px; }

        /* ─────────────────────────────────────────────
           RESPONSIVE
           ───────────────────────────────────────────── */
        @media (max-width: 991px) {
          .achievement-hero { padding-top: 120px; }
          .achievement-title { font-size: 1.9rem; }
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
        }

        @media (max-width: 576px) {
          .achievement-nav-row {
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
          .achievement-lightbox-nav { width: 34px; height: 34px; }
        }
      `}</style>
    </>
  );
};

export default AchievementDetail;