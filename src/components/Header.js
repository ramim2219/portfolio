// components/Header.jsx
import { Navbar, Container, Nav } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "home",      label: "Home" },
  { id: "about",     label: "About" },
  { id: "education", label: "Education" },
  { id: "skill",     label: "Experience" },
  { id: "research",  label: "Research" },
  { id: "work",      label: "Portfolio" },
  // { id: "services",  label: "Services" },
  { id: "contactus", label: "Contact", mobileOnly: true },
];

const ROUTE_TO_SECTION = [
  { prefix: "/projects",     section: "work" },
  { prefix: "/research",     section: "research" },
  { prefix: "/publications", section: "research" },
  { prefix: "/thesis",       section: "research" },
  { prefix: "/achievements", section: "about" },
  { prefix: "/experience",   section: "about" },
  { prefix: "/leadership",   section: "about" },
];

const DESKTOP_BREAKPOINT = 992;

const Header = () => {
  const router = useRouter();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef(null);
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef(null);

  // Mark as mounted so we can safely read router state on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only trust router state after hydration — prevents SSR mismatch
  const pathname = mounted && router.isReady ? router.pathname : "/";
  const onHomePage = pathname === "/";
  const homePrefix = onHomePage ? "" : "/";
  const hrefFor = (id) => `${homePrefix}#${id}`;

  // Route section wins on non-home pages; scroll-spy wins on home
  const routeSection =
    ROUTE_TO_SECTION.find((r) => pathname.startsWith(r.prefix))?.section || null;
  const activeItem = routeSection || (onHomePage ? active : "home");

  // Scrolled state (rAF-throttled)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset internal state on route changes
  useEffect(() => {
    const section =
      ROUTE_TO_SECTION.find((r) => router.pathname.startsWith(r.prefix))?.section || null;
    if (section) setActive(section);
    else if (router.pathname === "/") setActive("home");
    isClickScrolling.current = false;
    clearTimeout(clickTimeout.current);
  }, [router.pathname]);

  // Scroll-spy (home page only)
  useEffect(() => {
    if (!onHomePage) return;
    const sections = NAV_ITEMS
      .filter((item) => !item.mobileOnly)
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHomePage]);

  // Auto-collapse on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) setExpanded(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock background scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [expanded]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!expanded) return;
    const handleOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    const handleKey = (e) => { if (e.key === "Escape") setExpanded(false); };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [expanded]);

  const handleNavClick = (id) => () => {
    setActive(id);
    setExpanded(false);
    isClickScrolling.current = true;
    clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => { isClickScrolling.current = false; }, 800);
  };

  return (
    <header
      ref={headerRef}
      className={`main-header header-fixed ${scrolled ? "is-scrolled" : ""}`}
    >
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={setExpanded}
        className="header-nav one-page-nav"
      >
        <Container>
          <Navbar.Brand
            href="/#home"
            onClick={handleNavClick("home")}
            className="brand-wrap"
          >
            <img
              src="/assets/img/logo.png"
              className="navbar-logo"
              alt="RamimDev Logo"
            />
          </Navbar.Brand>

          {/* ⭐ Mobile-only group: theme toggle sits beside the hamburger,
              in the fixed bar itself — not inside the dropdown menu. */}
          <div className="d-flex d-lg-none align-items-center gap-2 mobile-bar-actions">
            <ThemeToggle />
            <Navbar.Toggle
              aria-controls="main-nav"
              aria-label={expanded ? "Close navigation menu" : "Open navigation menu"}
              className="navbar-toggler"
            >
              <span />
              <span />
              <span />
            </Navbar.Toggle>
          </div>

          <Navbar.Collapse id="main-nav" className="justify-content-center">
            {/* Nav list — every <li> MUST contain an <a> for scrollToActiveNav() */}
            <Nav as="ul" className="navbar-nav align-items-lg-center">
              {NAV_ITEMS.map((item) => (
                <Nav.Item as="li" key={item.id}>
                  <a
                    href={hrefFor(item.id)}
                    className={`nav-link ${activeItem === item.id ? "active" : ""} ${item.mobileOnly ? "d-lg-none" : ""}`}
                    aria-current={activeItem === item.id ? "page" : undefined}
                    onClick={handleNavClick(item.id)}
                  >
                    <span>{item.label}</span>
                  </a>
                </Nav.Item>
              ))}

              <li className="d-lg-none mt-3">
                <a
                  className="px-btn px-btn-theme2 w-100 text-center"
                  href={hrefFor("contactus")}
                  onClick={handleNavClick("contactus")}
                >
                  Contact Now
                </a>
              </li>
            </Nav>
          </Navbar.Collapse>

          {/* ⭐ Desktop right-side actions: theme toggle + Contact button */}
          <div className="ms-auto d-none d-lg-flex align-items-center gap-3">
            <ThemeToggle />
            <a
              className="px-btn px-btn-theme2"
              href={hrefFor("contactus")}
              onClick={handleNavClick("contactus")}
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