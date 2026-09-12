'use client';

import { motion } from "framer-motion";

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="effect-1">
        <img src="assets/img/effect-1.svg" className="svg" alt="image" />
      </div>

      <div className="effect-2">
        <img src="assets/img/effect-2.svg" className="svg" alt="image" />
      </div>

      <div className="container">
        <div className="row min-vh-100 align-items-center">

          <div className="col-lg-6 pe-xl-5 py-5">
            <motion.div
              className="home-intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h6>
                <span>Hello.</span>
              </h6>

              <h1>
                I'm Shafayet <br />
                Ullah Ramim
              </h1>

              {/* ✅ Role line — quick snapshot */}
              <p className="home-role">
                Full-Stack Developer · React.js &amp; Laravel · CSE Graduate
              </p>

              {/* ✅ Main bio — reflects CV accurately */}
              <p>
                I build clean, reliable web applications — from React front-ends
                and Laravel REST APIs to production e-commerce platforms serving
                real customers. I've shipped admin systems for a university,
                supported a live US-based online store, and solved 1,000+
                algorithmic problems along the way.
              </p>

              <div className="btn-bar">
                {/* Let's Talk */}
                <a className="px-btn px-btn-theme me-3" href="#contactus">
                  Let's Talk
                </a>

                {/* Download CV */}
                <a
                  className="px-btn download-cv-btn"
                  href="/assets/img/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <i className="fas fa-download me-2"></i>
                  Download CV
                </a>
              </div>

              {/* ✅ Quick stats row — proof, not claims */}
              {/* <div className="home-stats">
                <div className="stat">
                  <span className="stat-value">1000+</span>
                  <span className="stat-label">DSA problems</span>
                </div>
                <div className="stat">
                  <span className="stat-value">50+</span>
                  <span className="stat-label">Contests</span>
                </div>
                <div className="stat">
                  <span className="stat-value">2★</span>
                  <span className="stat-label">CodeChef · Pupil CF</span>
                </div>
                <div className="stat">
                  <span className="stat-value">1</span>
                  <span className="stat-label">Live e-commerce client</span>
                </div>
              </div> */}

            </motion.div>
          </div>

          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <div className="home-image">
              <img src="assets/img/home-banner.png" alt="image" />
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        /* Role line — small subtitle under the name */
        .home-role {
          font-size: 15px;
          font-weight: 600;
          color: #af002d;
          letter-spacing: 0.3px;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        /* Quick stats row */
        .home-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 28px;
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid rgba(17, 24, 39, 0.08);
        }
        .stat {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .stat-value {
          font-size: 22px;
          font-weight: 800;
          color: #111827;
        }
        .stat-label {
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          margin-top: 2px;
        }

        /* Download CV button */
        .download-cv-btn {
          background: #f7af24;
          border: 2px solid #f7af24;
          color: #111;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .download-cv-btn:hover {
          background: #111;
          border-color: #111;
          color: #fff;
        }

        @media (max-width: 767.98px) {
          .home-stats {
            gap: 20px;
            margin-top: 22px;
            padding-top: 18px;
          }
          .stat-value {
            font-size: 19px;
          }
        }
      `}</style>
    </section>
  );
};

export default Home;