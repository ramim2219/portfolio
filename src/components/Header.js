import { Navbar, Container } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "education", label: "Education" },
  { id: "skill", label: "Experience" },
  { id: "work", label: "Portfolio" },
  { id: "services", label: "Services" },
  { id: "contactus", label: "Contact", mobileOnly: true },
];

const Header = () => {
  const router = useRouter();
  const [active, setActive] = useState("home");

  // Are we on a case-study page (pages/projects/[id].js)?
  const isProjectPage = router.pathname.startsWith("/projects");

  // Section links (#work, #about, …) only exist on the home page, so we
  // prefix them with "/" whenever we're on any other route.
  const onHomePage = router.pathname === "/";
  const homePrefix = onHomePage ? "" : "/";
  const hrefFor = (id) => `${homePrefix}#${id}`;

  // While viewing a project, the "Portfolio" item is the current section.
  const activeItem = isProjectPage ? "work" : active;

  return (
    <header className="main-header header-fixed">
      <Navbar expand="lg" className="header-nav one-page-nav" collapseOnSelect>
        <Container>
          {/* Brand */}
          <a className="navbar-brand" href="/#home" onClick={() => setActive("home")}>
            <img
              src="/assets/img/logo.png"
              className="svg navbar-logo"
              alt="RamimDev Logo"
            />
          </a>

          {/* Toggle */}
          <Navbar.Toggle className="navbar-toggler">
            <span />
            <span />
            <span />
          </Navbar.Toggle>

          {/* Menu */}
          <Navbar.Collapse className="navbar-collapse justify-content-center">
            <ul className="navbar-nav align-items-lg-center">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={hrefFor(item.id)}
                    className={`nav-link ${
                      activeItem === item.id ? "active" : ""
                    } ${item.mobileOnly ? "d-lg-none" : ""}`}
                    onClick={() => setActive(item.id)}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}

              {/* Mobile Contact Button */}
              <li className="d-lg-none mt-3">
                <a
                  className="px-btn px-btn-theme2 w-100 text-center"
                  href={hrefFor("contactus")}
                  onClick={() => setActive("contactus")}
                >
                  Contact Now
                </a>
              </li>
            </ul>
          </Navbar.Collapse>

          {/* Desktop Contact Button */}
          <div className="ms-auto d-none d-lg-block">
            <a
              className="px-btn px-btn-theme2"
              href={hrefFor("contactus")}
              onClick={() => setActive("contactus")}
            >
              Contact Now
            </a>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;