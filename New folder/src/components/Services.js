import SectionTitle from "./SectionTitle";

const serviceData = [
  {
    id: 1,
    name: "Full Stack Web Development",
    icon: "bi bi-code-slash",
    desc: "Building scalable and secure full stack web applications using Laravel, React, PHP, MySQL, and modern JavaScript technologies.",
  },
  {
    id: 2,
    name: "Frontend Development",
    icon: "bi bi-laptop",
    desc: "Creating responsive, modern, and user-friendly interfaces using React, JavaScript, Tailwind CSS, and Bootstrap.",
  },
  {
    id: 3,
    name: "Backend Development",
    icon: "bi bi-server",
    desc: "Developing robust backend systems with Laravel and PHP, including REST APIs, authentication, and database design.",
  },
  {
    id: 4,
    name: "WordPress Development",
    icon: "fab fa-wordpress",
    desc: "Custom WordPress website development, theme customization, performance optimization, and content management solutions.",
  },
  {
    id: 5,
    name: "Database Design & Management",
    icon: "fas fa-database",
    desc: "Designing and managing efficient MySQL databases with optimized queries, relationships, and data integrity.",
  },
  {
    id: 6,
    name: "Problem Solving & Optimization",
    icon: "bi bi-lightning",
    desc: "Applying strong problem-solving skills from competitive programming to write optimized, clean, and efficient code.",
  },
];

const Services = () => {
  return (
    <section id="services" className="section services-section bg-gray">
      <div className="container">
        <SectionTitle heading={"Services I Offer"} subHeading={"Services"} />
        <div className="row gy-4">
          {serviceData.map((service) => (
            <div className="col-sm-6 col-lg-4 d-flex" key={service.id}>
              <div className="feature-box-01 w-100">
                <div className="feature-content">
                  <div className="number">
                    <span>0{service.id}</span>
                  </div>
                  <h5>{service.name}</h5>
                  <p>{service.desc}</p>
                  <div className="icon">
                    <i className={service.icon} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ============================================================
           DARK MODE — feature-box-01 gets its colors entirely from
           the template stylesheet (assumes a permanently light card),
           so we override explicitly here.
           ============================================================ */
        :global([data-theme="dark"] .feature-box-01) {
          background: var(--card-bg);
          border: 1px solid var(--border);
        }

        :global([data-theme="dark"] .feature-box-01 h5) {
          color: var(--text);
        }

        :global([data-theme="dark"] .feature-box-01 p) {
          color: var(--text-soft);
        }

        :global([data-theme="dark"] .feature-box-01 .number span) {
          color: var(--text-muted) !important;
          opacity: 0.5;
        }

        :global([data-theme="dark"] .feature-box-01 .icon) {
          color: var(--accent);
          background: var(--accent-soft);
        }

        :global([data-theme="dark"] .feature-box-01 .icon i) {
          color: var(--accent);
        }
      `}</style>
    </section>
  );
};

export default Services;
