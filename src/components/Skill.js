// components/Skill.jsx
'use client';

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "./SectionTitle";

const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { id: 2, name: "React JS", icon: "fab fa-react" },
      { id: 7, name: "JavaScript", icon: "fab fa-js-square" },
      { id: 8, name: "WordPress", icon: "fab fa-wordpress" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Languages",
    skills: [
      { id: 1, name: "Laravel", icon: "fab fa-laravel" },
      { id: 3, name: "PHP", icon: "fab fa-php" },
      { id: 9, name: "ASP.NET", icon: "fas fa-server" },
      { id: 6, name: "Python", icon: "fab fa-python" },
      { id: 5, name: "C++", icon: "fas fa-code" },
    ],
  },
  {
    id: "tools",
    label: "Data & Tools",
    skills: [
      { id: 4, name: "MySQL", icon: "fas fa-database" },
      { id: 10, name: "Git & GitHub", icon: "fab fa-git-alt" },
    ],
  },
];

const experiencesData = [
  {
    id: 1,
    date: "Dec 2025 - Present",
    designation: "Software Developer Trainee",
    company: "Premier University, Chittagong",
    summary:
      "Front-end developer on a 6-member team (5 frontend · 1 SQA). Built admin panels in React.js against senior-team APIs, and shipped two backend APIs in ASP.NET.",
    contributions: [
      "Menu Management — menus, submenus, and role-based access control.",
      "50+ production reports — Grade Sheets, Attendance, Form Sale — with PDF export.",
      "ID Card Panel — bulk generation and download for students.",
      "Tabulation Panel — reports for regular, residual, and retake students.",
      "Stores Management — UI + backend API built end-to-end in ASP.NET.",
      "Supplier Management — UI + backend API built end-to-end in ASP.NET.",
      "GT Bill Panel — billing and reconciliation for the accounts section.",
      "Course Evaluation Report Panel — faculty and course-wise reporting.",
      "Credit Transfer Panel — processing and history tracking.",
    ],
    href: "/experience/software-developer-trainee",
  },
  {
    id: 2,
    date: "Jan 2026 - Present",
    designation: "E-Commerce Developer",
    company: "Ifjona LLC — US-Based Client",
    summary:
      "Developed and delivered a production e-commerce platform for a US-based LLC client. Worked on frontend development, API integration, responsive UI, and client-requested features. Initial project delivered in June 2026; continue to provide ongoing development and support.",
    contributions: [
      "Built and delivered a production e-commerce platform end-to-end for a US-based LLC client.",
      "Developed the frontend with a responsive, mobile-first UI across all customer-facing pages.",
      "Integrated REST APIs between the React frontend and the Laravel backend.",
      "Implemented client-requested features and shipped iterative updates throughout the engagement.",
      "Delivered the initial project in June 2026 and continue providing ongoing development and support.",
    ],
    href: "/projects/1",
  },
];

const CONTRIBUTIONS_PREVIEW_COUNT = 4;

const Skill = () => {
  const [expandedIds, setExpandedIds] = useState({});

  const toggleExpanded = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="skill" className="section experience-section bg-gray">
      <div className="container">
        <SectionTitle
          heading={"Skills and Experience"}
          subHeading={"Experience"}
          text={
            "Front-end and full-stack developer building admin systems, reports, and e-commerce platforms with React.js, Laravel, and ASP.NET."
          }
        />

        {/* Skills band — full width, grouped so it reads at a glance */}
        <div className="skills-panel">
          <h3>My Skills</h3>
          <div className="skills-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.id}>
                <span className="skill-group-label">{group.label}</span>
                <ul className="skills-list">
                  {group.skills.map((skill) => (
                    <li className="skill-chip" key={skill.id}>
                      <i className={skill.icon} aria-hidden="true" />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Experience — two-up card grid so each entry uses full width instead of a tall narrow column */}
        <div className="experience-panel">
          <h3>Experience</h3>
          <div className="exp-grid">
            {experiencesData.map((experience, index) => {
              const isExpanded = !!expandedIds[experience.id];
              const contributions = experience.contributions || [];
              const hasMore = contributions.length > CONTRIBUTIONS_PREVIEW_COUNT;
              const visibleContributions = isExpanded
                ? contributions
                : contributions.slice(0, CONTRIBUTIONS_PREVIEW_COUNT);

              return (
                <article className="exp-card" key={experience.id}>
                  <div className="exp-card-body">
                    <div className="exp-card-head">
                      <span className="exp-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="exp-date">{experience.date}</span>
                    </div>

                    <h5 className="exp-role">{experience.designation}</h5>
                    <span className="exp-company">{experience.company}</span>

                    {experience.summary && (
                      <p className="exp-summary">{experience.summary}</p>
                    )}

                    {contributions.length > 0 && (
                      <>
                        <ul className="exp-contributions">
                          {visibleContributions.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>

                        {hasMore && (
                          <button
                            type="button"
                            className="exp-toggle"
                            aria-expanded={isExpanded}
                            onClick={() => toggleExpanded(experience.id)}
                          >
                            {isExpanded
                              ? "Show less"
                              : `Show ${contributions.length - CONTRIBUTIONS_PREVIEW_COUNT} more`}
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {experience.href && (
                    <div className="exp-card-foot">
                      <Link href={experience.href} className="learn-more-btn">
                        <span className="learn-more-label">Learn More</span>
                        <span className="learn-more-arrow">
                          <i className="fas fa-arrow-right" />
                        </span>
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* Availability banner — replaces the old side avatar block, full width so nothing is left hanging */}
        <div className="hire-banner">
          <div className="hire-banner-avatar">
            <img src="assets/img/avatar.png" alt="" />
            <span className="hire-status" aria-hidden="true" />
          </div>
          <div className="hire-banner-text">
            <strong>Open to new opportunities</strong>
            <span>Let&apos;s build something reliable together.</span>
          </div>
          <a className="px-btn px-btn-theme2" href="#contactus">
            Hire me
          </a>
        </div>
      </div>

      <style jsx>{`
        /* ---- Theme tokens ---------------------------------------------
           Light values are the defaults. Dark values are applied under
           every common "night mode" trigger we could reasonably guess:
           a .dark / .dark-mode / .night-mode class on <html>, <body>, or
           this section itself, a data-theme="dark" attribute, and the
           OS-level prefers-color-scheme as a fallback. If your toggle
           uses something else, tell me the exact class/attribute and
           I'll swap these selectors for the real one. */
        :global(.experience-section) {
          --exp-heading: #111827;
          --exp-muted: #6b7280;
          --exp-summary: #4b5563;
          --exp-body: #374151;
          --exp-accent: #f7af24;
          --exp-accent-text: #92650a;
          --exp-accent-text-hover: #6b4a08;
          --exp-accent-soft: rgba(247, 175, 36, 0.16);
          --exp-card-bg: #ffffff;
          --exp-card-border: #e5e7eb;
          --exp-card-border-hover: #f2c765;
          --exp-chip-bg: #ffffff;
          --exp-chip-border: #e5e7eb;
          --exp-chip-text: #374151;
          --exp-divider: #f1f2f4;
          --exp-banner-bg: #ffffff;
          --exp-ring: #ffffff;
        }

        :global(html.dark) .experience-section,
        :global(html.dark-mode) .experience-section,
        :global(html.night-mode) .experience-section,
        :global(body.dark) .experience-section,
        :global(body.dark-mode) .experience-section,
        :global(body.night-mode) .experience-section,
        :global(.dark) .experience-section,
        :global(.dark-mode) .experience-section,
        :global(.night-mode) .experience-section,
        :global([data-theme="dark"]) .experience-section,
        :global([data-theme="night"]) .experience-section,
        :global(.experience-section.dark),
        :global(.experience-section.dark-mode),
        :global(.experience-section.night-mode),
        :global(.experience-section[data-theme="dark"]) {
          --exp-heading: #f3f4f6;
          --exp-muted: #9ca3af;
          --exp-summary: #cbd5e1;
          --exp-body: #d1d5db;
          --exp-accent: #f7af24;
          --exp-accent-text: #f2b93d;
          --exp-accent-text-hover: #ffd27a;
          --exp-accent-soft: rgba(247, 175, 36, 0.18);
          --exp-card-bg: #1b1d24;
          --exp-card-border: #2c2f38;
          --exp-card-border-hover: #4a4023;
          --exp-chip-bg: #20232b;
          --exp-chip-border: #2c2f38;
          --exp-chip-text: #d1d5db;
          --exp-divider: rgba(255, 255, 255, 0.08);
          --exp-banner-bg: #1b1d24;
          --exp-ring: #1b1d24;
        }

        @media (prefers-color-scheme: dark) {
          :global(.experience-section) {
            --exp-heading: #f3f4f6;
            --exp-muted: #9ca3af;
            --exp-summary: #cbd5e1;
            --exp-body: #d1d5db;
            --exp-accent: #f7af24;
            --exp-accent-text: #f2b93d;
            --exp-accent-text-hover: #ffd27a;
            --exp-accent-soft: rgba(247, 175, 36, 0.18);
            --exp-card-bg: #1b1d24;
            --exp-card-border: #2c2f38;
            --exp-card-border-hover: #4a4023;
            --exp-chip-bg: #20232b;
            --exp-chip-border: #2c2f38;
            --exp-chip-text: #d1d5db;
            --exp-divider: rgba(255, 255, 255, 0.08);
            --exp-banner-bg: #1b1d24;
            --exp-ring: #1b1d24;
          }
        }

        .skills-panel {
          margin-top: 36px;
        }

        .skills-panel h3,
        .experience-panel h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--exp-heading);
          margin: 0 0 16px;
        }

        .skills-groups {
          display: flex;
          flex-wrap: wrap;
          gap: 22px 32px;
        }

        .skill-group {
          flex: 1 1 200px;
          min-width: 180px;
        }

        .skill-group-label {
          display: block;
          font-size: 12.5px;
          font-weight: 700;
          color: var(--exp-accent-text);
          margin-bottom: 9px;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .skill-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          background: var(--exp-chip-bg);
          border: 1px solid var(--exp-chip-border);
          border-radius: 7px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--exp-chip-text);
          transition: border-color 0.2s ease, color 0.2s ease;
        }

        .skill-chip i {
          font-size: 12.5px;
          color: var(--exp-accent-text);
        }

        .skill-chip:hover {
          border-color: var(--exp-accent);
          color: var(--exp-heading);
        }

        .experience-panel {
          margin-top: 38px;
        }

        .exp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 18px;
          align-items: stretch;
        }

        .exp-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--exp-card-bg);
          border: 1px solid var(--exp-card-border);
          border-radius: 14px;
          padding: 22px 22px 18px;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .exp-card:hover {
          border-color: var(--exp-card-border-hover);
        }

        .exp-card-body {
          flex: 1 1 auto;
        }

        .exp-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .exp-index {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: var(--exp-accent-soft);
          color: var(--exp-accent-text);
          font-size: 12px;
          font-weight: 700;
        }

        .exp-date {
          font-size: 12px;
          font-weight: 600;
          color: var(--exp-muted);
        }

        .exp-role {
          font-size: 16px;
          font-weight: 700;
          color: var(--exp-heading);
          margin: 0 0 3px;
          line-height: 1.3;
        }

        .exp-company {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--exp-muted);
          margin-bottom: 10px;
        }

        .exp-summary {
          font-size: 13px;
          line-height: 1.55;
          color: var(--exp-summary);
          margin: 0 0 12px;
        }

        .exp-contributions {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .exp-contributions li {
          position: relative;
          padding-left: 16px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--exp-body);
        }

        .exp-contributions li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--exp-accent);
        }

        .exp-toggle {
          display: inline-flex;
          align-items: center;
          margin: 10px 0 0;
          padding: 0;
          background: none;
          border: none;
          font-size: 12.5px;
          font-weight: 700;
          color: var(--exp-accent-text);
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
        }

        .exp-toggle:hover {
          color: var(--exp-accent-text-hover);
        }

        .exp-toggle:focus-visible {
          outline: 2px solid var(--exp-accent);
          outline-offset: 3px;
          border-radius: 4px;
        }

        .exp-card-foot {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--exp-divider);
        }

        :global(.learn-more-btn) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3px;
          line-height: 1;
          color: var(--exp-accent-text);
          background: transparent;
          border: 1.5px solid var(--exp-accent);
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }

        :global(.learn-more-btn:hover) {
          background: var(--exp-accent);
          color: #1f2937;
        }

        :global(.learn-more-btn:focus-visible) {
          outline: 2px solid var(--exp-accent);
          outline-offset: 3px;
        }

        :global(.learn-more-btn .learn-more-arrow) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        :global(.learn-more-btn:hover .learn-more-arrow) {
          transform: translateX(3px);
        }

        .hire-banner {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 30px;
          padding: 18px 22px;
          background: var(--exp-banner-bg);
          border: 1px solid var(--exp-card-border);
          border-radius: 14px;
        }

        .hire-banner-avatar {
          position: relative;
          width: 50px;
          height: 50px;
          flex-shrink: 0;
        }

        .hire-banner-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        .hire-status {
          position: absolute;
          right: -2px;
          bottom: -2px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #22c55e;
          border: 2px solid var(--exp-ring);
        }

        .hire-banner-text {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          min-width: 0;
        }

        .hire-banner-text strong {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--exp-heading);
        }

        .hire-banner-text span {
          font-size: 13px;
          color: var(--exp-muted);
        }

        @media (max-width: 575.98px) {
          .hire-banner {
            flex-wrap: wrap;
          }
          .hire-banner-text {
            flex-basis: 100%;
            order: 3;
          }
          :global(.hire-banner .px-btn) {
            margin-left: auto;
          }
        }

        @media (max-width: 767.98px) {
          .exp-role {
            font-size: 15px;
          }
          .exp-contributions li,
          .exp-summary {
            font-size: 12.5px;
          }
          .exp-card {
            padding: 18px 18px 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default Skill;