import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  Lightbulb,
} from "lucide-react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { experienceData, getExperienceById } from "@/src/components/experienceData";

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
  return (
    <>
      <Head>
        <title>{role.title} | Ramim Dev</title>
        <meta name="description" content={role.description} />
      </Head>

      <Header />

      <main className="wrapper project-detail-page">
        {/* Hero */}
        <section className="section project-hero">
          <div className="container">
            <Link href="/#about" className="back-link">
              <ArrowLeft size={16} className="me-2" />
              Back to About
            </Link>

            <motion.div
              className="row align-items-center g-4 mt-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="col-lg-6">
                <span className="project-status-badge">
                  <span className="dot" /> {role.tag}
                </span>
                <h1 className="project-title">{role.title}</h1>
                <p className="project-subtitle">{role.subtitle}</p>
                <p className="project-lead">{role.description}</p>
              </div>

              <div className="col-lg-6">
                <div className="project-hero-image">
                  <img src={role.image} alt={role.title} />
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
                  <h3 className="project-section-heading">Overview</h3>
                  <p className="project-full-desc">{role.fullDescription}</p>

                  <h3 className="project-section-heading">Key Responsibilities</h3>
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
                      <h3 className="project-section-heading">Impact &amp; Outcomes</h3>
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
                                <span className="challenge-label">{o.title}</span>
                                <p>{o.text}</p>
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

        {/* Back nav */}
        <section className="section project-nav-section">
          <div className="container">
            <div className="project-nav-row">
              <Link href="/#about" className="project-nav-link prev">
                <ChevronLeft size={18} />
                <div>
                  <small>Back to</small>
                  <span>About Me</span>
                </div>
              </Link>
              <Link href="/leadership/competitive-programming-trainer" className="project-nav-link next">
                <div>
                  <small>See also</small>
                  <span>Leadership Role</span>
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
        .back-link:hover { border-color: #111; }

        .project-hero { padding-top: 140px; padding-bottom: 60px; }

        .project-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #4338ca;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 999px;
          padding: 6px 14px;
          margin-bottom: 16px;
        }
        .project-status-badge .dot {
          width: 8px; height: 8px; border-radius: 50%; background: #6366f1;
        }

        .project-title {
          font-size: 2.4rem; font-weight: 800; color: #111; line-height: 1.2; margin-bottom: 10px;
        }
        .project-subtitle {
          font-size: 15px; font-weight: 700; color: #6366f1;
          text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;
        }
        .project-lead {
          font-size: 16px; line-height: 1.8; color: #555; margin-bottom: 26px;
        }

        .project-hero-image {
          border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
        }
        .project-hero-image img { width: 100%; height: auto; display: block; }

        .project-body { padding: 60px 0 70px; }

        .project-section-heading {
          font-size: 1.3rem; font-weight: 800; color: #1e293b; margin: 0 0 14px;
        }
        .project-section-heading:not(:first-child) { margin-top: 30px; }

        .project-full-desc { font-size: 15.5px; line-height: 1.85; color: #475569; }

        .project-features {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 12px;
        }
        .project-features li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 14.5px; color: #334155; background: #fff;
          border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px;
        }
        .project-features li :global(svg) {
          color: #10b981; flex-shrink: 0; margin-top: 2px;
        }

        .project-challenges { display: flex; flex-direction: column; gap: 14px; }
        .challenge-card {
          background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
          padding: 16px; display: flex; flex-direction: column; gap: 10px;
        }
        .challenge-row { display: flex; align-items: flex-start; gap: 10px; }
        .challenge-row p {
          margin: 2px 0 0; font-size: 14px; line-height: 1.6; color: #475569;
        }
        .challenge-label {
          display: block; font-size: 11px; font-weight: 800;
          letter-spacing: 0.6px; text-transform: uppercase;
        }
        .challenge-row.is-solution :global(svg) {
          color: #6366f1; flex-shrink: 0; margin-top: 2px;
        }
        .challenge-row.is-solution .challenge-label { color: #4338ca; }

        .project-info-card,
        .project-tech-card {
          background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
          padding: 22px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); margin-bottom: 20px;
        }
        .project-info-card h5,
        .project-tech-card h5 {
          font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 14px;
        }
        .project-info-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 14px;
        }
        .project-info-list li { display: flex; align-items: flex-start; gap: 10px; }
        .project-info-list li :global(svg) {
          color: #3b82f6; margin-top: 2px; flex-shrink: 0;
        }
        .project-info-list li span {
          display: block; font-size: 11px; color: #94a3b8;
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
        }
        .project-info-list li strong {
          display: block; font-size: 14px; color: #1e293b; font-weight: 700; margin-top: 2px;
        }

        .project-tech-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .project-tech-tags span {
          background: #eff6ff; color: #3b82f6; font-size: 12.5px;
          font-weight: 600; padding: 6px 12px; border-radius: 20px;
        }

        .project-nav-section { padding: 0 0 70px; }
        .project-nav-row {
          display: flex; justify-content: space-between; gap: 16px;
          border-top: 1px solid #e2e8f0; padding-top: 30px;
        }
        .project-nav-link {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; color: #1e293b; max-width: 45%;
          transition: color 0.2s ease;
        }
        .project-nav-link:hover { color: #6366f1; }
        .project-nav-link.next {
          text-align: right; justify-content: flex-end; margin-left: auto;
        }
        .project-nav-link small {
          display: block; font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.5px; color: #94a3b8; font-weight: 700;
        }
        .project-nav-link span {
          display: block; font-size: 14px; font-weight: 700;
        }

        @media (max-width: 991px) {
          .project-hero { padding-top: 120px; }
          .project-title { font-size: 1.9rem; }
        }
        @media (max-width: 576px) {
          .project-nav-link span { display: none; }
        }
      `}</style>
    </>
  );
};

export default ExperienceDetail;