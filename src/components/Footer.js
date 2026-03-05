const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 py-2">
            <div className="nav justify-content-center justify-content-md-start">
              <a href="https://www.facebook.com/shafayetullah.ramim/" target="blank">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="https://x.com/2219Ramim69667" target="blank">
                <i className="fab fa-twitter" />
              </a>
              <a href="https://www.instagram.com/ramimshafayetullah/" target="blank">
                <i className="fab fa-instagram" />
              </a>
              <a href="https://www.linkedin.com/in/shafayet-ullah-ramim-05976a237/" target="blank">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>
          <div className="col-md-6 py-2 text-center text-md-end">
            <p className="m-0">
              © {new Date().getFullYear()} copyright all right reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
