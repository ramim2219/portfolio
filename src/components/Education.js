'use client';

import React from "react";
import SectionTitle from "./SectionTitle";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const Education = () => {
  const educationData = [
    {
      period: "2016 – 2018",
      degree: "Secondary School Certificate (SSC)",
      institution: "Science Background",
      description: "Completed secondary education with emphasis on science and mathematics, developing early interest in computing.",
      icon: <BookOpen size={18} />,
      grade: "GPA: 4.94/5.00"
    },
    {
      period: "2018 – 2020",
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Science Background",
      description: "Studied physics, chemistry, and mathematics, building strong analytical thinking and problem-solving fundamentals.",
      icon: <Award size={18} />,
      grade: "GPA: 4.83/5.00"
    },
    {
      period: "2021 – 2025",
      degree: "BSc in Computer Science & Engineering",
      institution: "Premier University, Chittagong",
      description: "Focused on data structures, algorithms, software engineering, database systems, and web technologies. Actively involved in competitive programming and technical activities.",
      icon: <GraduationCap size={20} />,
      grade: "CGPA: 3.63/4.00"
    }
  ];

  return (
    <section id="education" className="mt-4 section experience-section education-section edu-compact">
      <div className="container">
        <div className="row justify-content-center">
          <SectionTitle
            heading={"Education"}
            subHeading={"Academic Journey"}
            text={
              "A structured overview of my academic path that built my foundation in computer science, problem-solving, and engineering mindset."
            }
          />
        </div>

        <div className="edu-timeline-wrap">
          <div className="edu-timeline-line" />
          
          {educationData.map((item, index) => (
            <motion.div 
              key={index}
              className={`edu-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="edu-card">
                    <div className="edu-header">
                      <span className="edu-period">{item.period}</span>
                      <div className="edu-icon">{item.icon}</div>
                    </div>
                    <h5>{item.degree}</h5>
                    <div className="edu-meta">
                      <span className="edu-institution">{item.institution}</span>
                      <span className="edu-grade">{item.grade}</span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                  <div className="edu-dot">
                    <div className="dot-inner" />
                  </div>
                </>
              ) : (
                <>
                  <div className="edu-dot">
                    <div className="dot-inner" />
                  </div>
                  <div className="edu-card">
                    <div className="edu-header">
                      <span className="edu-period">{item.period}</span>
                      <div className="edu-icon">{item.icon}</div>
                    </div>
                    <h5>{item.degree}</h5>
                    <div className="edu-meta">
                      <span className="edu-institution">{item.institution}</span>
                      <span className="edu-grade">{item.grade}</span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Compact overrides ── */
        .edu-compact.education-section {
          padding-top: 30px !important;
          padding-bottom: 30px !important;
        }
        .edu-compact .edu-timeline-wrap {
          margin-top: 12px;
          gap: 10px;
        }
        .edu-compact .edu-item {
          margin-bottom: 10px;
        }
        .edu-compact .edu-card {
          padding: 12px 16px !important;
        }
        .edu-compact .edu-card h5 {
          font-size: 0.95rem;
          margin-bottom: 4px !important;
          margin-top: 4px !important;
        }
        .edu-compact .edu-card p {
          font-size: 0.8rem;
          line-height: 1.5;
          margin-bottom: 0 !important;
          margin-top: 5px !important;
        }
        .edu-compact .edu-header {
          margin-bottom: 2px;
        }
        .edu-compact .edu-period {
          font-size: 0.72rem;
        }
        .edu-compact .edu-meta {
          margin-top: 3px;
          margin-bottom: 3px;
          gap: 6px;
        }
        .edu-compact .edu-grade {
          font-size: 0.72rem;
        }
        .edu-compact .edu-institution {
          font-size: 0.75rem;
        }
      `}</style>
    </section>
  );
};

export default Education;