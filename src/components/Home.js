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
            {/* ✅ Outer wrap lets us center the whole image+socials group on smaller screens */}
            <div className="home-image-outer">
              <div className="home-image-wrap">
                <div className="home-image">
                  <img src="assets/img/home-banner.png" alt="image" />
                </div>

                {/* ✅ Social column — sits to the right of the image, gentle heartbeat pulse */}
                <div className="home-socials">
                  <a
                    href="https://www.facebook.com/shafayetullah.ramim/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="social-icon"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/ramimshafayetullah/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="social-icon"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://github.com/ramim2219"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="social-icon"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shafayet-ullah-ramim-05976a237/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="social-icon"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    href="https://x.com/2219Ramim69667"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="social-icon"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
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

        /* ============================================================
           Keep decorative background effects behind the profile image
           ============================================================ */
        .effect-1,
        .effect-2 {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .home-image {
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .home-image img {
          position: relative;
          z-index: 1;
          max-width: 100%;
          height: auto;
          display: block;
        }

        /* ============================================================
           Image + social column layout
           ============================================================ */
        .home-image-outer {
          position: relative;
          width: 100%;
        }

        .home-image-wrap {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 22px;
        }

        .home-socials {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .social-icon {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #fff;
          border: 1px solid rgba(17, 24, 39, 0.12);
          color: #111827;
          font-size: 16px;
          box-shadow: 0 4px 10px rgba(17, 24, 39, 0.06);
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
        }

        .social-icon i {
          animation: heartbeat 2.2s ease-in-out infinite;
        }

        /* stagger the pulse slightly so the column feels alive, not synchronized/robotic */
        .home-socials a:nth-child(1) i { animation-delay: 0s; }
        .home-socials a:nth-child(2) i { animation-delay: 0.15s; }
        .home-socials a:nth-child(3) i { animation-delay: 0.3s; }
        .home-socials a:nth-child(4) i { animation-delay: 0.45s; }
        .home-socials a:nth-child(5) i { animation-delay: 0.6s; }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.12); }
          30% { transform: scale(1); }
          45% { transform: scale(1.08); }
          60% { transform: scale(1); }
        }

        .social-icon:hover {
          background: #af002d;
          border-color: #af002d;
          color: #fff;
          transform: translateY(-3px);
        }

        .social-icon:hover i {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .social-icon i {
            animation: none;
          }
        }

        /* ============================================================
           Lower devices: center the image (and its social column)
           ============================================================ */
        @media (max-width: 991.98px) {
          .home-image-outer {
            display: flex;
            justify-content: center;
          }
        }

        @media (max-width: 767.98px) {
          .home-image-wrap {
            flex-direction: column;
            gap: 16px;
          }
          .home-socials {
            flex-direction: row;
          }
          .social-icon {
            width: 38px;
            height: 38px;
            font-size: 14px;
          }
        }

        /* ============================================================
           DARK MODE — colors hardcoded above won't flip automatically
           since they live in this component's own scoped styles.
           ============================================================ */
        :global([data-theme="dark"] .home-role) {
          color: #ff7b7b;
        }

        :global([data-theme="dark"] .stat-value) {
          color: var(--text);
        }

        :global([data-theme="dark"] .stat-label) {
          color: var(--text-muted);
        }

        :global([data-theme="dark"] .home-stats) {
          border-top-color: var(--border);
        }

        :global([data-theme="dark"] .download-cv-btn) {
          color: #1a1a1a;
        }

        :global([data-theme="dark"] .download-cv-btn:hover) {
          background: var(--text);
          border-color: var(--text);
          color: var(--bg);
        }
        :global([data-theme="dark"] .home-intro h1) {
          color: var(--text) !important;
        }

        :global([data-theme="dark"] .home-intro h6 span) {
          color: var(--accent);
        }

        :global([data-theme="dark"] .social-icon) {
          background: var(--bg);
          border-color: var(--border);
          color: var(--text);
        }

        :global([data-theme="dark"] .social-icon:hover) {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--bg);
        }
      `}</style>
    </section>
  );
};

export default Home;