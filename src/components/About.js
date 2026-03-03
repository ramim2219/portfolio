import SectionTitle from "./SectionTitle";
import { useState, useEffect, useRef } from "react";
import {
  Code2,
  Trophy,
  Cpu,
  Target,
  Mail,
  Phone,
  MapPin,
  Github,
  Award,
  ChevronRight,
  ChevronLeft,
  Camera,
  X,
  ZoomIn,
  Briefcase,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

// ─── Experience Highlight Strip ───────────────────────────────────────────────
const ExperienceHighlight = () => (
  <div className="exp-highlight-wrap">
    <div className="exp-highlight-label">
      <Briefcase size={13} />
      <span>Experience</span>
    </div>
    <div className="exp-highlight-items">
      <div className="exp-hi-card exp-hi-current">
        <div className="exp-hi-left">
          <div className="exp-hi-icon exp-hi-icon-active">
            <img src="assets/img/puc.png" />
          </div>
          <div className="exp-hi-dot-active"><span className="exp-hi-pulse" /></div>
        </div>
        <div className="exp-hi-body">
          <div className="exp-hi-top">
            <span className="exp-hi-role">Software Developer Trainee</span>
            <span className="exp-hi-badge-now">● Now</span>
          </div>
          <div className="exp-hi-bottom">
            <span className="exp-hi-org">Premier University, Chittagong</span>
            <span className="exp-hi-sep">·</span>
            <span className="exp-hi-date">Dec 2025 – Present</span>
          </div>
        </div>
      </div>
      <div className="exp-hi-divider" />
      <div className="exp-hi-card exp-hi-past">
        <div className="exp-hi-left">
          <div className="exp-hi-icon exp-hi-icon-past">
            <img src="assets/img/puc.png" />
          </div>
          <div className="exp-hi-dot-past" />
        </div>
        <div className="exp-hi-body">
          <div className="exp-hi-top">
            <span className="exp-hi-role">Competitive Programming Trainer</span>
            <span className="exp-hi-badge-done">Completed</span>
          </div>
          <div className="exp-hi-bottom">
            <span className="exp-hi-org">PUC CSE Club</span>
            <span className="exp-hi-sep">·</span>
            <span className="exp-hi-date">Jul 2024 – Aug 2025</span>
          </div>
        </div>
      </div>
    </div>
    <style>{`
      .exp-highlight-wrap { border-radius: 14px; border: 1px solid rgba(99,102,241,0.22); background: linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(168,85,247,0.04) 100%); overflow: hidden; margin-bottom: 20px; }
      .exp-highlight-label { display: flex; align-items: center; gap: 7px; padding: 8px 16px; background: rgba(99,102,241,0.1); border-bottom: 1px solid rgba(99,102,241,0.15); font-size: 0.7rem; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #a78bfa; }
      .exp-highlight-items { padding: 0; }
      .exp-hi-card { display: flex; align-items: center; gap: 14px; padding: 13px 16px; transition: background 0.2s; }
      .exp-hi-card:hover { background: rgba(99,102,241,0.07); }
      .exp-hi-left { display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0; }
      .exp-hi-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .exp-hi-icon-active { background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.25)); border: 1px solid rgba(99,102,241,0.5); color: #a78bfa; box-shadow: 0 2px 8px rgba(99,102,241,0.2); }
      .exp-hi-icon-past { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #888; }
      .exp-hi-dot-active { width: 8px; height: 8px; border-radius: 50%; background: radial-gradient(circle, #a78bfa, #6366f1); display: flex; align-items: center; justify-content: center; position: relative; }
      .exp-hi-pulse { position: absolute; width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid rgba(99,102,241,0.5); animation: hiPulse 1.8s ease-in-out infinite; }
      @keyframes hiPulse { 0% { transform: scale(0.7); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }
      .exp-hi-dot-past { width: 8px; height: 8px; border-radius: 50%; border: 2px solid rgba(99,102,241,0.25); background: rgba(255,255,255,0.06); }
      .exp-hi-body { flex: 1; min-width: 0; }
      .exp-hi-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; margin-bottom: 3px; }
      .exp-hi-role { font-size: 0.87rem; font-weight: 700; color: #1a1a2e; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .exp-hi-current .exp-hi-role { background: linear-gradient(135deg, #6366f1, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .exp-hi-bottom { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
      .exp-hi-org { font-size: 0.75rem; font-weight: 600; color: #555; }
      .exp-hi-current .exp-hi-org { color: #6366f1; }
      .exp-hi-sep { color: rgba(0,0,0,0.2); font-size: 0.8rem; }
      .exp-hi-date { font-size: 0.72rem; color: #888; font-style: italic; }
      .exp-hi-badge-now { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.5px; color: #a78bfa; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.4); border-radius: 20px; padding: 2px 8px; white-space: nowrap; flex-shrink: 0; }
      .exp-hi-badge-done { font-size: 0.65rem; font-weight: 700; color: #888; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2px 8px; white-space: nowrap; flex-shrink: 0; }
      .exp-hi-divider { height: 1px; margin: 0 16px; background: rgba(99,102,241,0.1); }
      @media (max-width: 480px) { .exp-hi-role { font-size: 0.8rem; } .exp-hi-card { padding: 11px 12px; gap: 10px; } .exp-hi-icon { width: 28px; height: 28px; } }
    `}</style>
  </div>
);

// ─── Reusable Gallery Slider ──────────────────────────────────────────────────
// NOTE: icon prop renamed via variable to avoid SWC destructuring parse error
const GallerySlider = (props) => {
  const {
    images,
    title,
    subtitle,
    accentColor = "#a78bfa",
    accentRgb = "99,102,241",
    icon,
  } = props;
  const IconComponent = icon || Camera;

  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);
  const total = images.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setInterval(next, 3500);
    return () => clearInterval(timerRef.current);
  }, [isHovered, current]);

  return (
    <>
      <div className="gallery-card mt-4">
        <div className="gallery-header">
          <div className="gallery-header-left">
            <div
              className="gallery-icon-wrap"
              style={{
                background: `linear-gradient(135deg, rgba(${accentRgb},0.3), rgba(168,85,247,0.3))`,
                border: `1px solid rgba(${accentRgb},0.35)`,
              }}
            >
              <IconComponent size={22} color={accentColor} />
            </div>
            <div>
              <h5 className="gallery-title">{title}</h5>
              <p className="gallery-subtitle">{subtitle}</p>
            </div>
          </div>
          <div className="gallery-counter">
            <span className="gallery-counter-current" style={{ color: accentColor }}>
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="gallery-counter-sep"> / </span>
            <span className="gallery-counter-total">{String(total).padStart(2, "0")}</span>
          </div>
        </div>

        <div
          className="slider-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="slider-track">
            {images.map((img, i) => (
              <div
                key={i}
                className={"slide" + (i === current ? " active" : "")}
                onClick={() => setLightbox(i)}
              >
                <img src={img.src} alt={img.caption} />
                <div className="slide-zoom-hint">
                  <ZoomIn size={16} />
                  <span>Click to expand</span>
                </div>
                <div className="slide-caption">
                  <div
                    className="caption-badge"
                    style={{
                      background: `rgba(${accentRgb},0.25)`,
                      border: `1px solid rgba(${accentRgb},0.4)`,
                    }}
                  >
                    <Award size={13} color={accentColor} />
                    <span>{img.caption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-progress">
            <div
              className="slider-progress-fill"
              style={{
                width: `${((current + 1) / total) * 100}%`,
                background: `linear-gradient(90deg, rgba(${accentRgb},1), #a855f7)`,
              }}
            />
          </div>

          <button className="slider-btn slider-btn-prev" onClick={prev} aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <button className="slider-btn slider-btn-next" onClick={next} aria-label="Next">
            <ChevronRight size={18} />
          </button>

          <div className="slider-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={"dot" + (i === current ? " active" : "")}
                onClick={() => setCurrent(i)}
                aria-label={"Slide " + (i + 1)}
                style={i === current ? { background: accentColor } : {}}
              />
            ))}
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            <X size={20} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-nav"
              onClick={() => setLightbox((lightbox - 1 + total) % total)}
            >
              <ChevronLeft size={26} />
            </button>
            <div className="lightbox-img-wrap">
              <img src={images[lightbox].src} alt={images[lightbox].caption} />
              <div
                className="lightbox-caption"
                style={{
                  background: `rgba(${accentRgb},0.2)`,
                  border: `1px solid rgba(${accentRgb},0.35)`,
                }}
              >
                <Award size={14} color={accentColor} />
                <span>{images[lightbox].caption}</span>
              </div>
            </div>
            <button
              className="lightbox-nav"
              onClick={() => setLightbox((lightbox + 1) % total)}
            >
              <ChevronRight size={26} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ─── About Section ────────────────────────────────────────────────────────────
const About = () => {
  const achievementImages = [
    { src: "/assets/img/icpc-dhaka-2024.jpg", caption: "ICPC Dhaka Regional 2024 — Ranked 213 / 307 teams" },
    { src: "/assets/img/duet-iupc-2023.jpg", caption: "DUET IUPC 2023 — Ranked 64 / 170 teams" },
    { src: "/assets/img/iiuc-iupc-2025.jpg", caption: "IIUC IUPC 2025 — Ranked 42nd position" },
    { src: "/assets/img/bu_iupc_2025.jpg", caption: "BU IUPC 2025 — Ranked 6th position" },
  ];

  const certificationImages = [
    { src: "/assets/img/cpp-trainer.jpeg", caption: "Competitive Programming Trainer At PUC CSE Club" },
    { src: "/assets/img/icpc.jpg", caption: "" },
    { src: "/assets/img/duet.jpg", caption: "" },
    { src: "/assets/img/iiuc.jpg", caption: "" },
    { src: "/assets/img/puc.jpg", caption: "" },
    { src: "/assets/img/gfg.jpg", caption: "" },
  ];

  return (
    <section id="about" className="section about-section bg-gray">
      <div className="container">
        <SectionTitle heading={"About Me"} subHeading={"Introduction"} />

        {/* ── Row 0: Experience Highlight ── */}
        <div className="row mb-4">
          <div className="col-12">
            <ExperienceHighlight />
          </div>
        </div>

        {/* ── Row 1: Two columns ── */}
        <div className="row g-4">
          <div className="col-lg-4 col-md-12">
            <div className="about-card">
              <div className="about-header">
                <h3 className="mb-3">SHAFAYET ULLAH RAMIM</h3>
                <div className="about-tagline">
                  <Cpu size={18} />
                  <span>Computer Science &amp; Engineering Student</span>
                </div>
              </div>
              <div className="about-contact">
                <div className="contact-item"><Mail size={16} /><span>shafayetullah200119@gmail.com</span></div>
                <div className="contact-item"><Phone size={16} /><span>+88 01829742139</span></div>
                <div className="contact-item"><MapPin size={16} /><span>Chittagong, Bangladesh</span></div>
                <div className="contact-item"><Github size={16} /><span>ramim2219</span></div>
              </div>
              <div className="skills-summary">
                <h6><Target size={16} /> Technical Focus</h6>
                <div className="skill-tags">
                  <span>Problem Solving</span>
                  <span>Data Structures</span>
                  <span>Algorithms</span>
                  <span>Full Stack Dev</span>
                  <span>Competitive Programming</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-12">
            <div className="about-content">
              <div className="about-intro">
                <p>
                  I am a passionate <strong>Computer Science &amp; Engineering</strong> student specializing in{" "}
                  <strong>full stack web development</strong> and <strong>competitive programming</strong>.
                  With experience in solving <strong>1000+ algorithmic problems</strong> across multiple platforms,
                  I focus on building scalable applications and efficient problem-solving.
                </p>
              </div>

              <div className="achievement-card">
                <div className="achievement-header"><Code2 size={20} /><h5>Problem Solving Achievements</h5></div>
                <div className="achievement-grid">
                  <div className="achievement-item">
                    <div className="platform">
                      <span className="platform-name">Codeforces</span>
                      <span className="rating">Pupil (1249)</span>
                    </div>
                    <div className="rank">Top 35% globally</div>
                  </div>
                  <div className="achievement-item">
                    <div className="platform">
                      <span className="platform-name">CodeChef</span>
                      <span className="rating">2★ (1523)</span>
                    </div>
                    <div className="rank">Top 8.3% globally</div>
                  </div>
                </div>
                <div className="achievement-stats">
                  <ChevronRight size={14} />
                  <span>50+ online contests participated</span>
                </div>
              </div>

              <div className="achievement-card">
                <div className="achievement-header"><Trophy size={20} /><h5>Programming Contest Highlights</h5></div>
                <div className="contest-badges">
                  <div className="contest-badge"><Award size={13} /><span>ICPC Dhaka 2024</span><strong>#213</strong></div>
                  <div className="contest-badge"><Award size={13} /><span>DUET IUPC 2025</span><strong>#64</strong></div>
                  <div className="contest-badge"><Award size={13} /><span>IIUC IUPC 2025</span><strong>#42</strong></div>
                  <div className="contest-badge"><Award size={13} /><span>PUC IUPC 2024</span><strong>#42</strong></div>
                  <div className="contest-badge"><Award size={13} /><span>BU IUPC 2025</span><strong>#6</strong></div>
                  <div className="contest-badge"><Award size={13} /><span>CUET IUPC 2022</span><strong>#53</strong></div>
                </div>
                <p className="contest-gallery-note">📸 See the gallery below for photos from these contests.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: Achievements Gallery ── */}
        <div className="row mt-4 justify-content-center">
          <div className="col-12">
            <GallerySlider
              images={achievementImages}
              title="Achievements & Participation Gallery"
              subtitle="Contest moments & milestone highlights"
              accentColor="#a78bfa"
              accentRgb="99,102,241"
              icon={Camera}
            />
          </div>
        </div>

        {/* ── Row 3: Certifications Gallery ── */}
        <div className="row mt-2 justify-content-center">
          <div className="col-12">
            <GallerySlider
              images={certificationImages}
              title="Certifications Gallery"
              subtitle="Courses, credentials & professional certificates"
              accentColor="#34d399"
              accentRgb="16,185,129"
              icon={BadgeCheck}
            />
          </div>
        </div>

      </div>

      <style>{`
        .gallery-card { border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }
        .gallery-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.03); flex-wrap: wrap; gap: 8px; }
        .gallery-header-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
        .gallery-icon-wrap { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .gallery-title { margin: 0; font-size: 1rem; font-weight: 700; letter-spacing: 0.2px; color: #000000; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .gallery-subtitle { margin: 2px 0 0; font-size: 0.75rem; color: #555; letter-spacing: 0.3px; }
        .gallery-counter { font-size: 0.82rem; font-weight: 600; letter-spacing: 1px; flex-shrink: 0; }
        .gallery-counter-current { font-size: 1.15rem; font-weight: 700; }
        .gallery-counter-sep { color: rgba(0,0,0,0.25); margin: 0 2px; }
        .gallery-counter-total { color: rgba(0,0,0,0.35); }
        .slider-wrapper { position: relative; overflow: hidden; background: #0a0a0a; aspect-ratio: 16/9; cursor: pointer; user-select: none; width: 75%; margin: 0 auto; }
        .slider-track { position: relative; width: 100%; height: 100%; }
        .slide { position: absolute; inset: 0; opacity: 0; transition: opacity 0.65s ease; pointer-events: none; }
        .slide.active { opacity: 1; pointer-events: auto; }
        .slide img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .slide-zoom-hint { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.75); border-radius: 20px; padding: 5px 10px; font-size: 0.72rem; display: flex; align-items: center; gap: 5px; backdrop-filter: blur(6px); opacity: 0; transition: opacity 0.2s; z-index: 5; }
        .slide.active:hover .slide-zoom-hint { opacity: 1; }
        .slide-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 32px 16px 14px; background: linear-gradient(transparent, rgba(0,0,0,0.82)); z-index: 5; }
        .caption-badge { display: inline-flex; align-items: center; gap: 7px; border-radius: 6px; padding: 5px 12px; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.2px; backdrop-filter: blur(4px); color: #e0e7ff; }
        .slider-progress { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: rgba(255,255,255,0.08); z-index: 10; }
        .slider-progress-fill { height: 100%; transition: width 0.4s ease; }
        .slider-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.15); color: #fff; border-radius: 50%; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, border-color 0.2s; z-index: 10; backdrop-filter: blur(6px); }
        .slider-btn:hover { background: rgba(99,102,241,0.5); border-color: rgba(99,102,241,0.6); }
        .slider-btn-prev { left: 10px; }
        .slider-btn-next { right: 10px; }
        .slider-dots { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); display: flex; gap: 7px; z-index: 10; }
        .dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.3); border: none; cursor: pointer; padding: 0; transition: background 0.25s, width 0.25s, border-radius 0.25s; }
        .dot.active { width: 22px; border-radius: 4px; }
        .lightbox-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 9999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); animation: fadeIn 0.2s ease; padding: 16px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .lightbox-close { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); color: #fff; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; z-index: 10001; }
        .lightbox-close:hover { background: rgba(239,68,68,0.4); }
        .lightbox-content { display: flex; align-items: center; gap: 16px; max-width: 92vw; justify-content: center; }
        .lightbox-img-wrap { text-align: center; }
        .lightbox-img-wrap img { width: auto; height: auto; max-width: 80vw; max-height: 80vh; border-radius: 10px; object-fit: contain; box-shadow: 0 12px 60px rgba(0,0,0,0.7); display: block; margin: 0 auto; }
        .lightbox-caption { display: inline-flex; align-items: center; gap: 7px; margin-top: 12px; border-radius: 6px; padding: 6px 14px; font-size: 0.83rem; font-weight: 500; flex-wrap: wrap; justify-content: center; color: #e0e7ff; }
        .lightbox-nav { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: background 0.2s; }
        .lightbox-nav:hover { background: rgba(99,102,241,0.4); }
        .contest-badges { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0 8px; }
        .contest-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 6px 14px; font-size: 0.8rem; color: #000000; transition: border-color 0.2s, background 0.2s; }
        .contest-badge:hover { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.35); }
        .contest-badge svg { color: #f59e0b; }
        .contest-badge strong { color: #a78bfa; font-weight: 700; font-size: 0.85rem; }
        .contest-gallery-note { margin: 8px 0 0; font-size: 0.75rem; color: rgba(255,255,255,0.3); font-style: italic; }
        @media (max-width: 991px) { .slider-wrapper { width: 90%; } }
        @media (max-width: 767px) { .slider-wrapper { width: 100%; aspect-ratio: 4/3; } .gallery-title { font-size: 0.9rem; } .gallery-subtitle { display: none; } .gallery-icon-wrap { width: 36px; height: 36px; } .lightbox-nav { width: 34px; height: 34px; } }
        @media (max-width: 575px) { .slider-wrapper { width: 100%; aspect-ratio: 1/1; } .slider-btn { width: 28px; height: 28px; } .gallery-header { padding: 12px 14px; } .gallery-title { font-size: 0.82rem; } .caption-badge { font-size: 0.7rem; padding: 4px 8px; } .slide-zoom-hint { display: none; } .lightbox-nav { width: 30px; height: 30px; } .lightbox-content { gap: 6px; } .dot { width: 6px; height: 6px; } .dot.active { width: 16px; } .lightbox-img-wrap img { max-width: 72vw; max-height: 65vh; } }
      `}</style>
    </section>
  );
};

export default About;