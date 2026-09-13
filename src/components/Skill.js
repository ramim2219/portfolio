// components/Skill.jsx
'use client';

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "./SectionTitle";

const skillsData = [
  { id: 1, name: "Laravel", icon: "fab fa-laravel" },
  { id: 2, name: "React JS", icon: "fab fa-react" },
  { id: 3, name: "PHP", icon: "fab fa-php" },
  { id: 4, name: "MySQL", icon: "fas fa-database" },
  { id: 5, name: "C++", icon: "fas fa-code" },
  { id: 6, name: "Python", icon: "fab fa-python" },
  { id: 7, name: "JavaScript", icon: "fab fa-js-square" },
  { id: 8, name: "WordPress", icon: "fab fa-wordpress" },
  { id: 9, name: "ASP.NET", icon: "fas fa-server" },
  { id: 10, name: "Git & GitHub", icon: "fab fa-git-alt" },
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
    href: "/experience/ecommerce-developer-ifjona",
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
        <div className="row">
          <div className="col-lg-6">
            <SectionTitle
              heading={"Skills and Experience"}
              subHeading={"Experience"}
              text={
                "Front-end and full-stack developer building admin systems, reports, and e-commerce platforms with React.js, Laravel, and ASP.NET."
              }
            />

            <div className="skill-box">
              <h3>My Skills</h3>
              <div className="skills-grid">
                {skillsData.map((skill) => (
                  <div className="skill-chip" key={skill.id}>
                    <span className="skill-icon">
                      <i className={skill.icon} />
                    </span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-5 ms-auto pt-5 pt-lg-0">
            <div className="experience-box">
              <h3>Experience</h3>
              <ul className="exp-list">
                {experiencesData.map((experience) => {
                  const isExpanded = !!expandedIds[experience.id];
                  const contributions = experience.contributions || [];
                  const hasMore = contributions.length > CONTRIBUTIONS_PREVIEW_COUNT;
                  const visibleContributions = isExpanded
                    ? contributions
                    : contributions.slice(0, CONTRIBUTIONS_PREVIEW_COUNT);

                  return (
                    <li key={experience.id} className="exp-item">
                      <div className="exp-track" aria-hidden="true">
                        <span className="exp-dot" />
                        <span className="exp-line" />
                      </div>

                      <div className="exp-content">
                        <span className="exp-date">{experience.date}</span>
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

                        {experience.href && (
                          <Link href={experience.href} className="learn-more-btn">
                            <span className="learn-more-label">Learn More</span>
                            <span className="learn-more-arrow">
                              <i className="fas fa-arrow-right" />
                            </span>
                          </Link>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="experience-user">
              <span className="eu-1">
                <img
                  src="assets/img/effect-3.svg"
                  className="svg"
                  alt="image"
                />
              </span>
              <span className="eu-2">
                <img
                  src="assets/img/effect-4.svg"
                  className="svg"
                  alt="image"
                />
              </span>
              <div className="avatar">
                <img src="assets/img/avatar.png" alt="image" />
              </div>
              <a className="px-btn px-btn-theme2" href="#contactus">
                Hire me
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .skill-box h3 {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 20px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 14px;
        }

        .skill-chip {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease,
            transform 0.25s ease;
        }

        .skill-chip:hover {
          border-color: #f7af24;
          box-shadow: 0 10px 24px -14px rgba(247, 175, 36, 0.45);
          transform: translateY(-2px);
        }

        .skill-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          border-radius: 10px;
          background: rgba(247, 175, 36, 0.16);
          color: #92650a;
          font-size: 16px;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .skill-chip:hover .skill-icon {
          background: #f7af24;
          color: #1f2937;
        }

        .skill-name {
          font-size: 13.5px;
          font-weight: 600;
          color: #374151;
        }

        .experience-box h3 {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 28px;
        }

        .exp-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .exp-item {
          display: grid;
          grid-template-columns: 20px 1fr;
          column-gap: 20px;
          padding-bottom: 32px;
        }
        .exp-item:last-child {
          padding-bottom: 0;
        }

        .exp-track {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .exp-dot {
          position: relative;
          z-index: 1;
          width: 12px;
          height: 12px;
          margin-top: 6px;
          border-radius: 50%;
          background: #f7af24;
          box-shadow: 0 0 0 4px rgba(247, 175, 36, 0.3);
        }

        .exp-line {
          position: absolute;
          top: 20px;
          bottom: -32px;
          width: 2px;
          background: #e5e7eb;
        }
        .exp-item:last-child .exp-line {
          display: none;
        }

        .exp-content {
          min-width: 0;
        }

        .exp-date {
          display: inline-block;
          font-size: 12.5px;
          font-weight: 700;
          color: #92650a;
          background: rgba(247, 175, 36, 0.2);
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 10px;
        }

        .exp-role {
          font-size: 17px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 4px;
          line-height: 1.3;
        }

        .exp-company {
          display: block;
          font-size: 13.5px;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 10px;
        }

        .exp-summary {
          font-size: 13.5px;
          line-height: 1.6;
          color: #4b5563;
          margin: 0 0 14px;
        }

        .exp-contributions {
          list-style: none;
          padding: 0;
          margin: 0 0 0px;
          display: flex;
          flex-direction: column;
          gap: 0px;
        }

        .exp-contributions li {
          position: relative;
          padding-left: 20px;
          font-size: 13.5px;
          color: #374151;
        }

        .exp-contributions li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 25px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f7af24;
        }

        .exp-toggle {
          display: inline-flex;
          align-items: center;
          margin: 4px 0 16px;
          padding: 0;
          background: none;
          border: none;
          font-size: 13px;
          font-weight: 700;
          color: #92650a;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
        }

        .exp-toggle:hover {
          color: #6b4a08;
        }

        .exp-toggle:focus-visible {
          outline: 2px solid #f7af24;
          outline-offset: 3px;
          border-radius: 4px;
        }

        :global(.learn-more-btn) {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;
          padding: 11px 22px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          line-height: 1;
          color: #92650a;
          background: transparent;
          border: 1.5px solid #f7af24;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease,
            transform 0.25s ease, box-shadow 0.25s ease;
        }

        :global(.learn-more-btn:hover) {
          background: #f7af24;
          color: #1f2937;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px -10px rgba(247, 175, 36, 0.55);
        }

        :global(.learn-more-btn:active) {
          transform: translateY(0);
          box-shadow: 0 4px 10px -4px rgba(247, 175, 36, 0.4);
        }

        :global(.learn-more-btn:focus-visible) {
          outline: 2px solid #f7af24;
          outline-offset: 3px;
        }

        :global(.learn-more-btn .learn-more-arrow) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
        }

        :global(.learn-more-btn:hover .learn-more-arrow) {
          transform: translateX(4px);
        }

        @media (max-width: 767.98px) {
          .exp-role {
            font-size: 15.5px;
          }
          .exp-contributions li,
          .exp-summary {
            font-size: 13px;
          }
          .exp-item {
            grid-template-columns: 16px 1fr;
            column-gap: 14px;
            padding-bottom: 26px;
          }
          .exp-line {
            top: 18px;
            bottom: -26px;
          }
          :global(.learn-more-btn) {
            padding: 10px 18px;
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
};

export default Skill;