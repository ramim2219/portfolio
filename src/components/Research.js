// components/Research.jsx
'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
import { Microscope, BookOpen, FileText, ArrowRight } from "lucide-react";

const RESEARCH_DATA = [
  {
    period: "2024 – 2026",
    title: "Multilingual Complaint Detection",
    subtitle: "Final Year Thesis · In Progress",
    description:
      "A multi-label framework detecting complaint categories from Bangla, English, and Banglish e-commerce reviews.",
    icon: <Microscope size={18} />,
    grade: "F1 Score: 97.02%",
    highlight: true,
  },
  {
    period: "2024",
    title: "14,280 Review Corpus",
    subtitle: "Manually Annotated Dataset",
    description:
      "Multilingual review corpus annotated by three annotators with majority voting and expert validation.",
    icon: <BookOpen size={18} />,
    grade: "Bangla · English · Banglish",
  },
  {
    period: "2026",
    title: "Journal Publication",
    subtitle: "Manuscript in Preparation",
    description:
      "A manuscript based on the thesis findings is being prepared for peer-reviewed journal submission.",
    icon: <FileText size={18} />,
    grade: "Coming Soon",
  },
];

const Research = () => {
  return (
    <section id="research" className="research-section edu-compact">
      <div className="container">
        <div className="row justify-content-center">
          <SectionTitle
            heading={"Research"}
            subHeading={"Thesis & Publications"}
            text={
              "Multilingual NLP, multi-label text classification, and transformer-based models for real-world e-commerce complaints."
            }
          />
        </div>

        {/* ---------- Card grid ---------- */}
        <div className="research-grid">
          {RESEARCH_DATA.map((item, index) => (
            <motion.div
              key={index}
              className={`edu-card ${item.highlight ? "research-highlight" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="edu-header">
                <span className="edu-period">{item.period}</span>
                <div className="edu-icon">{item.icon}</div>
              </div>
              <h5>{item.title}</h5>
              <div className="research-subtitle">{item.subtitle}</div>
              <p className="research-desc">{item.description}</p>
              <div className="edu-meta">
                <span className="edu-grade">{item.grade}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ---------- Centered CTA ---------- */}
        <motion.div
          className="research-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/research" className="research-more-btn">
            <span className="btn-label">View Full Research</span>
            <span className="btn-arrow">
              <ArrowRight size={18} />
            </span>
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .research-section {
          padding: 100px 0 110px;
        }

        /* ---------- Card grid ---------- */
        .research-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        :global(.research-section .edu-card) {
          height: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        :global(.research-section .edu-card:hover) {
          transform: translateY(-4px);
          box-shadow: 0 18px 36px -18px rgba(175, 0, 45, 0.25);
        }

        :global(.research-section .edu-card.research-highlight) {
          background: linear-gradient(135deg, #fff 0%, #fff9f3 100%);
          position: relative;
          overflow: hidden;
        }
        :global(.research-section .edu-card.research-highlight)::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #ff7a18, #af002d);
        }

        .research-subtitle {
          font-size: 12px;
          font-weight: 700;
          color: #af002d;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .research-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: #6b7280;
          margin: 0 0 12px;
        }

        /* ---------- Centered CTA wrapper ---------- */
        :global(.research-cta) {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          margin-top: 60px;
          padding: 0 16px;
        }

       :global(.research-more-btn) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.2px;
          line-height: 1;
          color: #ffffff;
          background: #F7AF24;
          border: 2px solid #F7AF24;
          /* ✅ Shadow now matches the amber background */
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

        :global(.research-more-btn:hover) {
          background: #ffffff;
          color: #F7AF24;
          border-color: #F7AF24;
          transform: translateY(-2px);
          /* ✅ Slightly stronger amber glow on hover */
          box-shadow: 0 12px 24px -10px rgba(247, 175, 36, 0.55);
        }

        :global(.research-more-btn:active) {
          transform: translateY(0);
          /* ✅ Tighter amber shadow when pressed */
          box-shadow: 0 4px 10px -4px rgba(247, 175, 36, 0.45);
        }

        :global(.research-more-btn:focus-visible) {
          /* ✅ Focus ring in the same amber family */
          outline: 3px solid rgba(247, 175, 36, 0.4);
          outline-offset: 3px;
        }

        /* Inner spans */
        :global(.research-more-btn .btn-arrow),
        :global(.research-more-btn .btn-icon) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
        }

        :global(.research-more-btn:hover .btn-arrow) {
          transform: translateX(4px);
        }

        :global(.research-more-btn:hover .btn-icon) {
          transform: rotate(-8deg);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 767.98px) {
          .research-section {
            padding: 70px 0 80px;
          }
          .research-grid {
            gap: 18px;
          }
          .research-cta {
            margin-top: 44px;
          }

          :global(.research-more-btn) {
            padding: 12px 26px;
            font-size: 14px;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default Research;