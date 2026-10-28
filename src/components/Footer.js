const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 py-2">
            <div className="nav justify-content-center justify-content-md-start">
              <a href="https://www.facebook.com/shafayetullah.ramim/" target="_blank" rel="noopener noreferrer" aria-label="Facebook (opens in new tab)">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="https://x.com/2219Ramim69667" target="_blank" rel="noopener noreferrer" aria-label="Twitter (opens in new tab)">
                <i className="fab fa-twitter" />
              </a>
              <a href="https://www.instagram.com/ramimshafayetullah/" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in new tab)">
                <i className="fab fa-instagram" />
              </a>
              <a href="https://www.linkedin.com/in/shafayet-ramim/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new tab)">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="https://github.com/ramim2219" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)">
                <i className="fab fa-github" />
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
