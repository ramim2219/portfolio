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
    <section id="education" className="education-section edu-compact">
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
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;