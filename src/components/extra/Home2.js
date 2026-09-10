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
            <div className="home-intro one-page-nav">

              <h6>
                <span>Hello.</span>
              </h6>

              <h1>
                I'm Shafayet <br />
                Ullah Ramim
              </h1>

              <p>
                I design and develop services for customers of all sizes,
                specializing in creating stylish, modern websites, web services
                and online stores.
              </p>

              <div className="btn-bar">

                {/* Let’s Talk Button */}
                <a className="px-btn px-btn-theme me-3" href="#contactus">
                  Let’s Talk
                </a>

                {/* Download CV Button */}
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

            </div>
          </div>

          <div className="col-lg-6">
            <div className="home-image">
              <img src="assets/img/home-banner.png" alt="image" />
            </div>
          </div>

        </div>
      </div>

      {/* CSS */}
      <style jsx>{`

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

      `}</style>
    </section>
  );
};

export default Home;