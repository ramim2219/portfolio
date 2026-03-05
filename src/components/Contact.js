import emailjs from "@emailjs/browser";
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
    value: "shafayetullah200119@gmail.com",
    link: "mailto:shafayetullah200119@gmail.com",
    icon: "fas fa-envelope",
  },
  {
    id: 3,
    label: "Visit My Office",
    value: "North Mohora , Chittagong",
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

  const onChange = (e) => {
    setMailData({ ...mailData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      name.length === 0 ||
      email.length === 0 ||
      message.length === 0 ||
      subject.length === 0
    ) {
      setError(true);
    } else {
      setLoading(true);

      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          mailData,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then(
          (response) => {
            setError(false);
            setSuccess(true);
            setLoading(false);

            setTimeout(() => {
              setSuccess(false);
            }, 3000);

            setMailData({
              name: "",
              email: "",
              message: "",
              subject: "",
            });
          },
          (err) => {
            console.log(err.text);
            setLoading(false);
          }
        );
    }
  };

  return (
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

              <form id="contact-form" onSubmit={(e) => onSubmit(e)}>
                <div className="row gx-3 gy-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">First name</label>
                      <input
                        name="name"
                        onChange={onChange}
                        value={name}
                        id="name"
                        placeholder="Name *"
                        className={`form-control ${
                          error ? (name.length !== 0 ? "" : "invalid") : ""
                        }`}
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Your Email</label>
                      <input
                        name="email"
                        onChange={onChange}
                        value={email}
                        id="email"
                        placeholder="Email *"
                        className={`form-control ${
                          error ? (email.length !== 0 ? "" : "invalid") : ""
                        }`}
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input
                        name="subject"
                        onChange={onChange}
                        value={subject}
                        id="subject"
                        placeholder="Subject *"
                        className={`form-control ${
                          error ? (subject.length !== 0 ? "" : "invalid") : ""
                        }`}
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Your message</label>
                      <textarea
                        name="message"
                        onChange={onChange}
                        value={message}
                        id="message"
                        placeholder="Your message *"
                        rows={3}
                        className={`form-control ${
                          error ? (message.length !== 0 ? "" : "invalid") : ""
                        }`}
                      />
                    </div>

                    {success && (
                      <span id="suce_message" className="text-success">
                        ✅ Message Sent Successfully!
                      </span>
                    )}

                    {error && (
                      <span className="text-danger">
                        ⚠️ Please fill in all fields.
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
              <img src="assets/img/contact.svg" className="svg" alt="image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;