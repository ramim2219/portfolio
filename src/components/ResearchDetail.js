// components/ResearchDetail.jsx
'use client';

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Microscope, Database, BarChart3, Rocket, BookOpen, Cpu,
  Camera, ZoomIn, X, ChevronLeft, ChevronRight, Sparkles, FileText,
  ExternalLink,
} from "lucide-react";

const THESIS = {
  title: "A Multilevel Classification of Multilingual Negative Reviews in E-commerce",
  supervisor: "Estiak Ahamed Sazid",
  supervisorRole: "Lecturer, Dept. of CSE",
  university: "Premier University, Chattogram",
  duration: "2024 – 2026",
  authors: [
    { name: "Saikat Barua", id: "2104010202196" },
    { name: "Shafayet Ullah Ramin", id: "2104010202219" },
  ],
  abstract:
    "A multilingual multi-label framework for identifying complaint-related issue categories from negative e-commerce reviews written in Bangla, English, and Banglish. A 14,280-review corpus was annotated across four issue categories, and eight models spanning classical ML, deep learning, transformers, and hybrid architectures were benchmarked. XLM-RoBERTa achieved the best performance at 97.02% Micro-F1, and the framework was deployed on the IFJONA e-commerce platform.",
  tags: [
    "Multilingual NLP", "Multi-Label Classification", "Aspect Category Detection",
    "Bangla NLP", "Banglish", "XLM-RoBERTa",
  ],
};

const HIGHLIGHTS = [
  { value: "14,280", label: "Annotated reviews", sub: "Bangla · English · Banglish" },
  { value: "4",      label: "Issue categories",  sub: "Multi-label, cardinality 1.58" },
  { value: "8",      label: "Models benchmarked", sub: "ML · DL · Transformers · Hybrid" },
  { value: "97.02%", label: "Best Micro-F1",     sub: "XLM-RoBERTa on held-out test" },
];

const OBJECTIVES = [
  "Prepare and analyze a multilingual negative review dataset (Bangla, English, Banglish).",
  "Define four complaint categories: Product, Delivery, Monetary, Customer Service.",
  "Formulate complaint detection as a multi-label classification task.",
  "Compare classical ML, deep learning, transformer, and hybrid models.",
  "Evaluate with multi-label metrics — Micro-F1, Macro-F1, Exact Match, Hamming Loss.",
  "Integrate the framework into a real e-commerce review management system.",
];

const DATASET_FACTS = [
  { label: "Raw reviews",        value: "14,913" },
  { label: "Final usable",       value: "14,280" },
  { label: "Bangla",             value: "34.59%" },
  { label: "English",            value: "33.98%" },
  { label: "Banglish",           value: "31.42%" },
  { label: "Label cardinality",  value: "1.58" },
];

const CATEGORIES = [
  { name: "Product Issue",          prevalence: "59.17%", desc: "Quality, damage, wrong item, size/colour mismatch, missing quantity." },
  { name: "Delivery Issue",         prevalence: "32.39%", desc: "Late or failed delivery, damaged parcel, courier mishandling." },
  { name: "Monetary Issue",         prevalence: "33.53%", desc: "Payment failure, delayed refund, overcharging, hidden charges." },
  { name: "Customer Service Issue", prevalence: "32.82%", desc: "Unresponsive seller, poor support, return/replacement failures." },
];

const MODELS = [
  { name: "XLM-RoBERTa",                    microF1: "97.02%", macroF1: "96.87%", family: "Transformer",  best: true },
  { name: "mBERT",                          microF1: "96.77%", macroF1: "96.67%", family: "Transformer" },
  { name: "TF-IDF + Linear SVM",            microF1: "95.86%", macroF1: "95.85%", family: "Classical ML" },
  { name: "TF-IDF + Logistic Regression",   microF1: "95.72%", macroF1: "95.74%", family: "Classical ML" },
  { name: "LSTM",                           microF1: "95.17%", macroF1: "95.19%", family: "Deep Learning" },
  { name: "BiLSTM",                         microF1: "94.67%", macroF1: "94.52%", family: "Deep Learning" },
  { name: "BanglaBERT",                     microF1: "79.50%", macroF1: "77.25%", family: "Transformer" },
  { name: "BanglaBERT + BiLSTM",            microF1: "77.86%", macroF1: "76.12%", family: "Hybrid" },
];

const TECH_STACK = [
  { name: "Laravel API",      role: "Production backend — review submission, rating filter" },
  { name: "FastAPI",          role: "ML inference microservice — model loading and prediction" },
  { name: "React Admin Panel", role: "Displays predicted issue labels as colour-coded badges" },
  { name: "MySQL",            role: "Stores reviews and detected issue labels" },
];

const THESIS_GALLERY = [
  {
    src: "/assets/img/my_activities/thesis/thesis-1.jpeg",
    caption: "Thesis Defense",
    description:
      "Presenting the research methodology and results in front of the evaluation panel at Premier University, Chittagong.",
  },
  {
    src: "/assets/img/my_activities/thesis/thesis-2.jpeg",
    caption: "With My Team",
    description:
      "Post-defense photo with my thesis teammates after successfully completing the final presentation.",
  },
  {
    src: "/assets/img/my_activities/thesis/thesis-3.jpeg",
    caption: "Final Thesis Book",
    description:
      "The printed and bound copy of the thesis, submitted to the Department of CSE for final approval.",
  },
  {
    src: "/assets/img/my_activities/thesis/thesis-4.pdf",
    caption: "Real-Time Deployment",
    description:
      "The thesis model integrated into a live e-commerce admin panel — automatically detecting negative complaint issues from incoming customer reviews in real time.",
    featured: true,
  },
];

const isPdf = (src) => /\.pdf(\?.*)?$/i.test(src || "");

export default function ResearchDetail() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const galleryLength = THESIS_GALLERY.length;

  // Enable portals only after hydration (window exists)
  useEffect(() => {
    setMounted(true);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + galleryLength) % galleryLength);
  }, [galleryLength]);

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % galleryLength);
  }, [galleryLength]);

  // Keyboard navigation + Escape
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, showPrev, showNext]);

  // Lock body scroll while the lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex]);

  const activeItem =
    lightboxIndex !== null ? THESIS_GALLERY[lightboxIndex] : null;

  /* ═══════════ LIGHTBOX (rendered via portal) ═══════════ */
  const lightbox =
    mounted && activeItem
      ? createPortal(
          <div
            className="thesis-lightbox-overlay"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.caption}
          >
            {/* Close button — large tap target, always on top */}
            <button
              type="button"
              className="thesis-lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              aria-label="Close gallery"
            >
              <X size={22} />
              <span className="sr-only">Close</span>
            </button>

            {/* Content — stop propagation so clicking the image doesn't close */}
            <div
              className="thesis-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryLength > 1 && (
                <button
                  type="button"
                  className="thesis-lightbox-nav"
                  onClick={showPrev}
                  aria-label="Previous"
                >
                  <ChevronLeft size={26} />
                </button>
              )}

              <div className="thesis-lightbox-stage">
                {isPdf(activeItem.src) ? (
                  <iframe
                    src={`${activeItem.src}#toolbar=0&navpanes=0&view=FitH`}
                    className="thesis-lightbox-pdf"
                    title={activeItem.caption}
                  />
                ) : (
                  <img src={activeItem.src} alt={activeItem.caption} />
                )}

                <div className="thesis-lightbox-meta">
                  <h4 className="thesis-lightbox-title">{activeItem.caption}</h4>
                  <p className="thesis-lightbox-caption">
                    {activeItem.description}
                  </p>

                  {isPdf(activeItem.src) && (
                    <a
                      href={activeItem.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="thesis-lightbox-pdf-cta"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} />
                      Open full PDF
                    </a>
                  )}
                </div>
              </div>

              {galleryLength > 1 && (
                <button
                  type="button"
                  className="thesis-lightbox-nav"
                  onClick={showNext}
                  aria-label="Next"
                >
                  <ChevronRight size={26} />
                </button>
              )}
            </div>

            {/* Counter — pinned to top-left, always visible */}
            <div className="thesis-lightbox-counter">
              {lightboxIndex + 1} / {galleryLength}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="research-page">
      {/* ---------- Back button ---------- */}
      <div className="container research-back-wrap">
        <Link href="/#research" className="research-back-btn">
          <span className="back-arrow">
            <ArrowLeft size={18} />
          </span>
          <span className="back-label">Back to Home</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="research-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="hero-eyebrow"><Microscope size={14} /> Final Year Thesis</span>
            <h1 className="hero-title">{THESIS.title}</h1>
            <p className="hero-meta">
              <strong>{THESIS.supervisor}</strong> — {THESIS.supervisorRole}
              <span className="dot-sep">•</span>{THESIS.university}
              <span className="dot-sep">•</span>{THESIS.duration}
            </p>
            <p className="hero-authors">
              By {THESIS.authors.map((a, i) => (
                <span key={a.id}>
                  {a.name} <span className="muted">({a.id})</span>
                  {i < THESIS.authors.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
            <div className="hero-tags">
              {THESIS.tags.map((t) => <span key={t} className="hero-tag">{t}</span>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="research-highlights">
        <div className="container">
          <div className="highlight-grid">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.label}
                className="highlight-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="highlight-value">{h.value}</div>
                <div className="highlight-label">{h.label}</div>
                <div className="highlight-sub">{h.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="research-block">
        <div className="container">
          <div className="block-head"><BookOpen size={20} /><h2>Abstract</h2></div>
          <p className="abstract-text">{THESIS.abstract}</p>
        </div>
      </section>

      {/* Objectives */}
      <section className="research-block">
        <div className="container">
          <div className="block-head"><Microscope size={20} /><h2>Research Objectives</h2></div>
          <ul className="objectives-list">
            {OBJECTIVES.map((o, i) => (
              <li key={i}>
                <span className="obj-num">{String(i + 1).padStart(2, "0")}</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dataset */}
      <section className="research-block">
        <div className="container">
          <div className="block-head"><Database size={20} /><h2>Dataset at a Glance</h2></div>
          <div className="dataset-grid">
            {DATASET_FACTS.map((f) => (
              <div key={f.label} className="dataset-fact">
                <div className="fact-value">{f.value}</div>
                <div className="fact-label">{f.label}</div>
              </div>
            ))}
          </div>

          <h3 className="sub-head">Issue Categories</h3>
          <div className="categories-grid">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="category-card">
                <div className="cat-head">
                  <h4>{c.name}</h4>
                  <span className="cat-prevalence">{c.prevalence}</span>
                </div>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="research-block">
        <div className="container">
          <div className="block-head"><BarChart3 size={20} /><h2>Model Comparison</h2></div>
          <p className="block-lead">
            Eight models across four architectural families were benchmarked under an identical
            protocol. XLM-RoBERTa achieved the strongest performance on the held-out test set.
          </p>
          <div className="table-wrap">
            <table className="models-table">
              <thead>
                <tr>
                  <th>Rank</th><th>Model</th><th>Family</th><th>Micro-F1</th><th>Macro-F1</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map((m, i) => (
                  <tr key={m.name} className={m.best ? "best-row" : ""}>
                    <td>{i + 1}</td>
                    <td className="model-name">
                      {m.name}
                      {m.best && <span className="best-badge">Best</span>}
                    </td>
                    <td>{m.family}</td>
                    <td className="num">{m.microF1}</td>
                    <td className="num">{m.macroF1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section className="research-block">
        <div className="container">
          <div className="block-head"><Rocket size={20} /><h2>Real-World Deployment</h2></div>
          <p className="block-lead">
            The framework was integrated into the <strong>IFJONA</strong> e-commerce platform as a
            hybrid service-oriented system that classifies incoming negative reviews automatically.
          </p>
          <div className="stack-grid">
            {TECH_STACK.map((s) => (
              <div key={s.name} className="stack-card">
                <div className="stack-icon"><Cpu size={18} /></div>
                <h4>{s.name}</h4>
                <p>{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Thesis Gallery ═══════════ */}
      <section className="research-block">
        <div className="container">
          <div className="block-head">
            <Camera size={20} />
            <h2>Thesis Gallery</h2>
            <span className="gallery-count">{galleryLength} items</span>
          </div>
          <p className="block-lead">
            Moments from the thesis defense, the final submission, and the real-time
            deployment of the model into a live e-commerce admin panel.
          </p>

          <div className="thesis-gallery-grid">
            {THESIS_GALLERY.map((item, i) => {
              const pdf = isPdf(item.src);
              return (
                <motion.div
                  key={i}
                  className={
                    "thesis-gallery-item" + (item.featured ? " is-featured" : "")
                  }
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  {item.featured && (
                    <span className="thesis-gallery-featured-badge">
                      <Sparkles size={12} />
                      Featured · Live Deployment
                    </span>
                  )}

                  {pdf && (
                    <span className="thesis-gallery-pdf-badge">
                      <FileText size={12} />
                      PDF
                    </span>
                  )}

                  <button
                    type="button"
                    className="thesis-gallery-image-btn"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Open ${item.caption}`}
                  >
                    {pdf ? (
                      <object
                        data={`${item.src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        type="application/pdf"
                        className="thesis-gallery-pdf-preview"
                        aria-label={item.caption}
                      >
                        <div className="thesis-gallery-pdf-fallback">
                          <FileText size={36} />
                          <span>PDF Document</span>
                          <small>Click to open full preview</small>
                        </div>
                      </object>
                    ) : (
                      <img src={item.src} alt={item.caption} />
                    )}

                    <span className="thesis-gallery-zoom">
                      {pdf ? <FileText size={16} /> : <ZoomIn size={16} />}
                    </span>
                  </button>

                  <div className="thesis-gallery-info">
                    <h4 className="thesis-gallery-title">{item.caption}</h4>
                    <p className="thesis-gallery-desc">{item.description}</p>

                    {pdf && (
                      <a
                        href={item.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="thesis-gallery-pdf-link"
                      >
                        <ExternalLink size={13} />
                        Open PDF in new tab
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publication */}
      <section className="research-block research-block-last">
        <div className="container">
          <div className="publication-cta">
            <div className="pub-icon"><BookOpen size={22} /></div>
            <h3>Publication Status</h3>
            <p>
              A manuscript based on this thesis is currently in preparation for journal
              submission. Peer-reviewed publications will be listed here once accepted.
            </p>
          </div>
        </div>
      </section>

      {/* Portal-rendered lightbox */}
      {lightbox}

      <style jsx>{`
        .research-page { background: #fff; padding-bottom: 80px; color: #111827; }

        /* Screen-reader-only utility */
        .sr-only {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* ---------- Back button ---------- */
        .research-back-wrap { padding: 28px 0 0; }

        :global(.research-back-btn) {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 12px; padding: 14px 28px; border-radius: 10px;
          font-size: 15px; font-weight: 700; letter-spacing: 0.2px; line-height: 1;
          color: #111827; background: #F7AF24; border: 2px solid #F7AF24;
          box-shadow: 0 6px 16px -6px rgba(247, 175, 36, 0.45);
          text-decoration: none; cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease,
            transform 0.25s ease, box-shadow 0.25s ease;
        }
        :global(.research-back-btn:hover) {
          background: #111827; color: #F7AF24; border-color: #111827;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -10px rgba(17, 24, 39, 0.35);
        }
        :global(.research-back-btn:active) {
          transform: translateY(0);
          box-shadow: 0 4px 10px -4px rgba(17, 24, 39, 0.3);
        }
        :global(.research-back-btn:focus-visible) {
          outline: 3px solid rgba(247, 175, 36, 0.4); outline-offset: 3px;
        }
        :global(.research-back-btn .back-arrow) {
          display: inline-flex; align-items: center; justify-content: center;
          transition: transform 0.25s ease;
        }
        :global(.research-back-btn:hover .back-arrow) {
          transform: translateX(-4px);
        }

        /* ---------- Hero ---------- */
        .research-hero { padding: 40px 0 32px; }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12.5px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #af002d; margin-bottom: 14px;
        }
        .hero-title {
          font-size: 38px; font-weight: 800; line-height: 1.2;
          margin: 0 0 16px; color: #111827; max-width: 900px;
        }
        .hero-meta { font-size: 15px; color: #4b5563; margin: 0 0 6px; }
        .dot-sep { color: #d1d5db; margin: 0 8px; }
        .hero-authors { font-size: 14px; color: #4b5563; margin: 0 0 20px; }
        .hero-authors .muted { color: #9ca3af; }
        .hero-tags { display: flex; flex-wrap: wrap; gap: 8px; max-width: 800px; }
        .hero-tag {
          font-size: 12.5px; font-weight: 600; padding: 6px 12px;
          border-radius: 8px; background: #fff1e6; color: #af002d;
        }

        /* ---------- Highlights ---------- */
        .research-highlights { padding: 20px 0 40px; }
        .highlight-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }
        .highlight-card {
          padding: 22px 18px; border: 1px solid rgba(17, 24, 39, 0.06);
          border-radius: 14px;
          background: linear-gradient(180deg, #fff 0%, #fffbf7 100%);
          text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .highlight-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 28px -18px rgba(175, 0, 45, 0.28);
        }
        .highlight-value {
          font-size: 28px; font-weight: 800;
          background: linear-gradient(135deg, #ff7a18, #af002d);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.1; margin-bottom: 4px;
        }
        .highlight-label { font-size: 13.5px; font-weight: 700; color: #111827; }
        .highlight-sub { font-size: 11.5px; color: #6b7280; margin-top: 2px; }

        /* ---------- Blocks ---------- */
        .research-block { padding: 40px 0; border-top: 1px solid #f3f4f6; }
        .research-block-last { padding-bottom: 20px; }
        .block-head {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 24px; color: #af002d;
        }
        .block-head h2 { font-size: 24px; font-weight: 800; color: #111827; margin: 0; }
        .block-lead {
          font-size: 15px; line-height: 1.7; color: #4b5563;
          margin: 0 0 24px; max-width: 780px;
        }
        .abstract-text {
          font-size: 15.5px; line-height: 1.85; color: #374151;
          max-width: 900px; margin: 0;
        }
        .objectives-list { list-style: none; padding: 0; margin: 0; max-width: 900px; }
        .objectives-list li {
          display: flex; gap: 18px; padding: 14px 0;
          border-bottom: 1px dashed #f3f4f6;
          font-size: 14.5px; color: #374151; line-height: 1.65;
        }
        .objectives-list li:last-child { border-bottom: none; }
        .obj-num { flex-shrink: 0; font-weight: 800; color: #af002d; font-size: 14px; padding-top: 2px; }

        .dataset-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 14px; margin-bottom: 40px;
        }
        .dataset-fact {
          padding: 18px 14px; border-radius: 12px; background: #f9fafb;
          text-align: center; border: 1px solid #f3f4f6;
        }
        .fact-value { font-size: 22px; font-weight: 800; color: #af002d; line-height: 1.1; }
        .fact-label { font-size: 12px; color: #6b7280; margin-top: 4px; font-weight: 600; }

        .sub-head { font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 16px; }
        .categories-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }
        .category-card {
          padding: 18px 20px; border: 1px solid rgba(17, 24, 39, 0.06);
          border-radius: 12px; background: #fff;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .category-card:hover {
          border-color: rgba(175, 0, 45, 0.25);
          box-shadow: 0 12px 24px -18px rgba(175, 0, 45, 0.35);
        }
        .cat-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 8px; gap: 10px;
        }
        .category-card h4 { font-size: 15px; font-weight: 700; color: #111827; margin: 0; }
        .cat-prevalence {
          font-size: 11.5px; font-weight: 700; padding: 3px 9px;
          border-radius: 999px; background: #fff1e6; color: #af002d; white-space: nowrap;
        }
        .category-card p { font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0; }

        .table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid #f3f4f6; }
        .models-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .models-table th {
          text-align: left; padding: 14px 16px; background: #fafafa;
          font-weight: 700; color: #111827; border-bottom: 1px solid #f3f4f6;
          white-space: nowrap;
        }
        .models-table td {
          padding: 14px 16px; border-bottom: 1px solid #f9fafb; color: #374151;
        }
        .models-table tr:last-child td { border-bottom: none; }
        .models-table .num {
          font-variant-numeric: tabular-nums; font-weight: 600; color: #111827;
        }
        .model-name { font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .best-row { background: linear-gradient(90deg, #fff9f3 0%, #fff 100%); }
        .best-badge {
          font-size: 10.5px; font-weight: 800; padding: 2px 8px;
          border-radius: 999px;
          background: linear-gradient(135deg, #ff7a18, #af002d);
          color: #fff; letter-spacing: 0.3px;
        }

        .stack-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }
        .stack-card {
          padding: 20px; border: 1px solid rgba(17, 24, 39, 0.06);
          border-radius: 12px; background: #fff;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .stack-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 28px -18px rgba(175, 0, 45, 0.28);
        }
        .stack-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: inline-flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #fff1e6, #ffe3e3);
          color: #af002d; margin-bottom: 12px;
        }
        .stack-card h4 { font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 6px; }
        .stack-card p { font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0; }

        /* ═══════════ Thesis Gallery ═══════════ */
        .gallery-count {
          margin-left: auto; font-size: 12px; font-weight: 700;
          padding: 4px 12px; border-radius: 999px;
          background: rgba(175, 0, 45, 0.08);
          border: 1px solid rgba(175, 0, 45, 0.2);
          color: #af002d;
        }

        .thesis-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .thesis-gallery-item {
          display: flex; flex-direction: column;
          border: 1px solid rgba(17, 24, 39, 0.08);
          border-radius: 16px; overflow: hidden; background: #fff;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          position: relative;
        }
        .thesis-gallery-item:hover {
          transform: translateY(-4px);
          border-color: rgba(175, 0, 45, 0.25);
          box-shadow: 0 18px 36px -18px rgba(175, 0, 45, 0.35);
        }

        .thesis-gallery-image-btn {
          position: relative; display: block; width: 100%; padding: 0;
          border: none; background: #f9fafb; aspect-ratio: 4 / 3;
          overflow: hidden; cursor: zoom-in;
        }
        .thesis-gallery-image-btn img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .thesis-gallery-item:hover .thesis-gallery-image-btn img {
          transform: scale(1.05);
        }

        .thesis-gallery-pdf-preview {
          width: 100%; height: 100%; border: none; display: block;
          background: #fff; pointer-events: none;
        }
        .thesis-gallery-pdf-fallback {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 6px;
          height: 100%; color: #af002d; background: #fff7f0;
        }
        .thesis-gallery-pdf-fallback span {
          font-size: 14px; font-weight: 700;
        }
        .thesis-gallery-pdf-fallback small {
          font-size: 11px; font-weight: 500; color: #6b7280;
        }

        .thesis-gallery-zoom {
          position: absolute; top: 12px; right: 12px;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(15, 23, 42, 0.65); color: #fff;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          opacity: 0; transition: opacity 0.25s ease; z-index: 2;
        }
        .thesis-gallery-item:hover .thesis-gallery-zoom {
          opacity: 1;
        }

        .thesis-gallery-pdf-badge {
          position: absolute; top: 14px; right: 14px;
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 9px; border-radius: 999px;
          font-size: 10.5px; font-weight: 800; letter-spacing: 0.4px;
          text-transform: uppercase;
          background: #ffffff; color: #af002d;
          border: 1px solid rgba(175, 0, 45, 0.25);
          box-shadow: 0 2px 8px rgba(175, 0, 45, 0.15);
          z-index: 3;
        }
        .thesis-gallery-item.is-featured .thesis-gallery-zoom {
          right: 14px;
          top: 52px;
        }

        .thesis-gallery-info {
          padding: 18px 20px 20px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .thesis-gallery-title {
          font-size: 15.5px; font-weight: 800; color: #111827;
          margin: 0; letter-spacing: -0.2px;
        }
        .thesis-gallery-desc {
          font-size: 13.5px; line-height: 1.6; color: #6b7280; margin: 0;
        }

        .thesis-gallery-pdf-link {
          display: inline-flex; align-items: center; gap: 6px;
          align-self: flex-start;
          margin-top: 8px;
          padding: 6px 12px;
          font-size: 12.5px; font-weight: 700;
          color: #af002d;
          background: rgba(175, 0, 45, 0.06);
          border: 1px solid rgba(175, 0, 45, 0.2);
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .thesis-gallery-pdf-link:hover {
          background: rgba(175, 0, 45, 0.12);
          border-color: rgba(175, 0, 45, 0.4);
        }

        .thesis-gallery-item.is-featured {
          border: 2px solid transparent;
          background:
            linear-gradient(#fff, #fff) padding-box,
            linear-gradient(135deg, #F7AF24 0%, #af002d 100%) border-box;
        }
        .thesis-gallery-item.is-featured:hover {
          box-shadow: 0 22px 44px -18px rgba(175, 0, 45, 0.45);
        }
        .thesis-gallery-item.is-featured .thesis-gallery-info {
          padding: 22px 22px 24px;
          background: linear-gradient(180deg, #fff 0%, #fffbf7 100%);
        }
        .thesis-gallery-item.is-featured .thesis-gallery-title {
          font-size: 16.5px;
          background: linear-gradient(135deg, #ff7a18, #af002d);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .thesis-gallery-item.is-featured .thesis-gallery-desc {
          font-size: 14px; color: #4b5563;
        }
        .thesis-gallery-featured-badge {
          position: absolute; top: 14px; left: 14px;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 999px;
          font-size: 11.5px; font-weight: 800; letter-spacing: 0.4px;
          text-transform: uppercase; color: #ffffff;
          background: linear-gradient(135deg, #ff7a18, #af002d);
          box-shadow: 0 6px 16px rgba(175, 0, 45, 0.35);
          z-index: 4;
        }

        /* ═══════════ Lightbox (rendered via portal to document.body) ═══════════ */
        :global(.thesis-lightbox-overlay) {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.94);
          z-index: 2147483647; /* max int — above EVERYTHING */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          padding-top: max(24px, env(safe-area-inset-top));
          padding-bottom: max(24px, env(safe-area-inset-bottom));
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* Close button — top-RIGHT, large and always visible */
        :global(.thesis-lightbox-close) {
          position: fixed;
          top: max(16px, env(safe-area-inset-top));
          right: max(16px, env(safe-area-inset-right));
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2147483647;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        :global(.thesis-lightbox-close:hover) {
          background: rgba(239, 68, 68, 0.7);
          transform: scale(1.05);
        }
        :global(.thesis-lightbox-close:active) {
          transform: scale(0.95);
        }
        :global(.thesis-lightbox-close:focus-visible) {
          outline: 3px solid rgba(247, 175, 36, 0.6);
          outline-offset: 3px;
        }

        /* Counter — top-LEFT, always visible */
        :global(.thesis-lightbox-counter) {
          position: fixed;
          top: max(20px, env(safe-area-inset-top));
          left: max(20px, env(safe-area-inset-left));
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 2147483647;
          white-space: nowrap;
        }

        :global(.thesis-lightbox-content) {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 96vw;
          max-height: calc(100vh - 48px);
          margin: auto;
        }

        :global(.thesis-lightbox-stage) {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 100%;
        }
        :global(.thesis-lightbox-stage img) {
          max-width: min(82vw, 1200px);
          max-height: calc(100vh - 240px);
          width: auto;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 12px 60px rgba(0, 0, 0, 0.7);
          display: block;
        }

        :global(.thesis-lightbox-pdf) {
          width: min(82vw, 1100px);
          height: calc(100vh - 260px);
          min-height: 400px;
          border: none;
          border-radius: 10px;
          background: #ffffff;
          box-shadow: 0 12px 60px rgba(0, 0, 0, 0.7);
        }

        :global(.thesis-lightbox-meta) {
          max-width: 640px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }
        :global(.thesis-lightbox-title) {
          font-size: 16px; font-weight: 800; color: #F7AF24;
          margin: 0; letter-spacing: 0.2px;
        }
        :global(.thesis-lightbox-caption) {
          font-size: 13.5px; font-weight: 400; color: #e5e7eb;
          line-height: 1.6; margin: 0;
        }

        :global(.thesis-lightbox-pdf-cta) {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 999px;
          font-size: 12.5px; font-weight: 700;
          color: #111827; background: #F7AF24;
          border: 1px solid #F7AF24;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        :global(.thesis-lightbox-pdf-cta:hover) {
          background: #ffffff; color: #af002d;
        }

        :global(.thesis-lightbox-nav) {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        :global(.thesis-lightbox-nav:hover) {
          background: rgba(175, 0, 45, 0.6);
          transform: scale(1.05);
        }

        /* ---------- Publication ---------- */
        .publication-cta {
          text-align: center; max-width: 560px; margin: 20px auto 0;
          padding: 40px 28px; background: #fafafa;
          border: 1.5px dashed #e5e7eb; border-radius: 18px;
        }
        .pub-icon {
          width: 56px; height: 56px; margin: 0 auto 14px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          background: #fff; color: #af002d;
          box-shadow: 0 8px 20px -8px rgba(175, 0, 45, 0.25);
        }
        .publication-cta h3 { font-size: 18px; font-weight: 800; color: #111827; margin: 0 0 8px; }
        .publication-cta p { font-size: 14px; color: #6b7280; line-height: 1.7; margin: 0; }

        /* ---------- Responsive ---------- */
        @media (max-width: 767.98px) {
          .hero-title { font-size: 26px; }
          .block-head h2 { font-size: 20px; }
          .highlight-value { font-size: 24px; }
          .fact-value { font-size: 19px; }
          .research-block { padding: 32px 0; }

          :global(.research-back-btn) {
            padding: 12px 22px; font-size: 14px; gap: 10px;
          }

          .thesis-gallery-grid { grid-template-columns: 1fr; gap: 20px; }
          .thesis-gallery-zoom { opacity: 1; }
          .thesis-gallery-info { padding: 16px 18px 18px; }
          .thesis-gallery-title { font-size: 14.5px; }
          .thesis-gallery-desc { font-size: 13px; }

          .thesis-gallery-item.is-featured .thesis-gallery-info {
            padding: 18px 18px 20px;
          }
          .thesis-gallery-item.is-featured .thesis-gallery-title { font-size: 15.5px; }

          .thesis-gallery-featured-badge {
            top: 10px; left: 10px; font-size: 10.5px; padding: 5px 10px;
          }
          .thesis-gallery-pdf-badge {
            top: 10px; right: 10px; font-size: 10px; padding: 3px 8px;
          }
          .thesis-gallery-item.is-featured .thesis-gallery-zoom { top: 44px; }

          /* Mobile lightbox tweaks */
          :global(.thesis-lightbox-overlay) {
            padding: 16px;
            align-items: flex-start;
          }
          :global(.thesis-lightbox-close) {
            width: 44px;
            height: 44px;
          }
          :global(.thesis-lightbox-counter) {
            padding: 6px 12px;
            font-size: 12px;
          }
          :global(.thesis-lightbox-content) {
            flex-direction: column;
            gap: 12px;
            padding-top: 60px;
            width: 100%;
          }
          :global(.thesis-lightbox-stage) {
            width: 100%;
            gap: 12px;
          }
          :global(.thesis-lightbox-stage img) {
            max-width: 100%;
            max-height: calc(100vh - 300px);
          }
          :global(.thesis-lightbox-pdf) {
            width: 100%;
            height: calc(100vh - 260px);
          }
          :global(.thesis-lightbox-nav) {
            width: 40px;
            height: 40px;
          }
          :global(.thesis-lightbox-title) { font-size: 14.5px; }
          :global(.thesis-lightbox-caption) { font-size: 12.5px; }
        }
      `}</style>
    </div>
  );
}