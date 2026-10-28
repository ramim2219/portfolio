import { useState } from "react";
import SectionTitle from "./SectionTitle";

const contactInfo = [
  {
    id: 1,
    label: "Phone",
    value: "+88 01829742139",
    link: "tel:+8801829742139",
    icon: "fas fa-phone-alt",
  },
  {
    id: 2,
    label: "Mail",
    value: "shafayet@ramim.tech",
    link: "mailto:shafayet@ramim.tech",
    icon: "fas fa-envelope",
  },
  {
    id: 3,
    label: "Visit My Office",
    value: "Mohora , Chandgaon , Chittagong",
    link: "https://maps.app.goo.gl/J77ANarBUtRvbsiKA",
    icon: "fas fa-map-marker-alt",
  },
];

const Contact = () => {
  const [mailData, setMailData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const { name, email, subject, message } = mailData;

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notice, setNotice] = useState("");
  const [website, setWebsite] = useState(""); // Hidden honeypot field for bots.

  const onChange = (e) => {
    setMailData((previous) => ({ ...previous, [e.target.name]: e.target.value }));
    setError(false);
    setSuccess(false);
    setNotice("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const form = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      website,
    };

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (
      form.name.length < 2 || form.name.length > 100 ||
      !isValidEmail || form.email.length > 254 ||
      form.subject.length < 3 || form.subject.length > 150 ||
      form.message.length < 10 || form.message.length > 5000
    ) {
      setError(true);
      setSuccess(false);
      setNotice("Please provide your name, a valid email, a subject, and a message (at least 10 characters).");
      return;
    }

    setLoading(true);
    setError(false);
    setSuccess(false);
    setNotice("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || "Message could not be sent. Please try again.");
      }
      setSuccess(true);
      setMailData({ name: "", email: "", message: "", subject: "" });
      setWebsite("");
      setNotice("Message submitted successfully! I'll get back to you soon.");
    } catch (err) {
      setError(true);
      setNotice(err.message || "Unable to send your message right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="contactus" className="section contactus-section bg-gray">
        <div className="container">
          <SectionTitle
            heading={"Let's Discuss Project"}
            subHeading={"Contact"}
          />

          <div className="row">
            {/* CONTACT FORM */}
            <div className="col-lg-6">
              <div className="contact-form">
                <h6>Get in touch</h6>
                <p className="lead">
                  Our friendly team would love to hear from you.
                </p>

                <form id="contact-form" onSubmit={onSubmit}>
                  {/* Hidden spam-trap: legitimate visitors will never see or fill it. */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", height: 0, overflow: "hidden" }}>
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>
                  <div className="row gx-3 gy-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="name">First name</label>
                        <input
                          name="name"
                          onChange={onChange}
                          value={name}
                          id="name"
                          placeholder="Name *"
                          className={`form-control ${error && name.trim().length < 2 ? "invalid" : ""}`}
                          autoComplete="name"
                          maxLength={100}
                          required
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">Your Email</label>
                        <input
                          name="email"
                          onChange={onChange}
                          value={email}
                          id="email"
                          placeholder="Email *"
                          className={`form-control ${error && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? "invalid" : ""}`}
                          autoComplete="email"
                          maxLength={254}
                          required
                          type="email"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="subject">Subject</label>
                        <input
                          name="subject"
                          onChange={onChange}
                          value={subject}
                          id="subject"
                          placeholder="Subject *"
                          className={`form-control ${error && subject.trim().length < 3 ? "invalid" : ""}`}
                          maxLength={150}
                          required
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="message">Your message</label>
                        <textarea
                          name="message"
                          onChange={onChange}
                          value={message}
                          id="message"
                          placeholder="Your message *"
                          rows={3}
                          className={`form-control ${error && message.trim().length < 10 ? "invalid" : ""}`}
                          maxLength={5000}
                          minLength={10}
                          required
                        />
                      </div>

                      {success && (
                        <span id="suce_message" className="text-success" role="status" aria-live="polite">
                          ✅ {notice}
                        </span>
                      )}

                      {error && (
                        <span className="text-danger" role="alert">
                          ⚠️ {notice}
                        </span>
                      )}
                    </div>

                    <div className="col-md-12">
                      <div className="send">
                        <button
                          className="px-btn px-btn-theme2"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Send Message"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* CONTACT INFO */}
            <div className="col-lg-6 ms-auto col-xl-5 pt-5 pt-lg-0">
              <ul className="contact-infos">
                {contactInfo.map((contact) => (
                  <li key={contact.id}>
                    <div className="icon">
                      <i className={contact.icon} />
                    </div>

                    <div className="col">
                      <h5>{contact.label}</h5>

                      <p>
                        {contact.link ? (
                          <a
                            href={contact.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          contact.value
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="text-center pt-5">
                <img
                  src="/assets/img/contact.svg"
                  className="svg"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ============================================================
           DARK MODE — contact form + info list get their colors from
           the template stylesheet (assumes a permanently light card).
           ============================================================ */

        :global([data-theme="dark"] .contact-form) {
          background: var(--card-bg);
          border: 1px solid var(--border);
        }

        :global([data-theme="dark"] .contact-form h6) {
          color: var(--text);
        }

        :global([data-theme="dark"] .contact-form .lead) {
          color: var(--text-soft);
        }

        :global([data-theme="dark"] .contact-form .form-label) {
          color: var(--text-soft);
        }

        :global([data-theme="dark"] .contact-form .form-control) {
          background: var(--bg-elevated);
          border-color: var(--border);
          color: var(--text);
        }

        :global([data-theme="dark"] .contact-form .form-control::placeholder) {
          color: var(--text-muted);
        }

        :global([data-theme="dark"] .contact-form .form-control:focus) {
          background: var(--bg-elevated);
          border-color: var(--accent);
          color: var(--text);
        }

        :global([data-theme="dark"] .contact-form .form-control.invalid) {
          border-color: #ff5c5c;
        }

        /* Contact info list */
        :global([data-theme="dark"] .contact-infos h5) {
          color: var(--text);
        }

        :global([data-theme="dark"] .contact-infos p),
        :global([data-theme="dark"] .contact-infos p a) {
          color: var(--text-soft);
        }

        :global([data-theme="dark"] .contact-infos p a:hover) {
          color: var(--accent);
        }

        :global([data-theme="dark"] .contact-infos .icon) {
          color: var(--accent);
          background: var(--accent-soft);
        }
      `}</style>
    </>
  );
};

export default Contact;