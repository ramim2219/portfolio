export const boston = {
  scrollToActiveNav() {
    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll("section");
      const navLi = document.querySelectorAll(".navbar-nav li");

      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id");
        }
      });
      navLi.forEach((li) => {
        let a = li.getElementsByTagName("a")[0];
        if (current !== null) {
          a.classList.remove("active");
        }
        if (a.getAttribute("href") == `#${current}`) {
          a.classList.add("active");
        }
      });
    });
  },
  imgToSvg() {
    document.querySelectorAll("img.svg").forEach(async (el) => {
      const imgID = el.getAttribute("id");
      const imgClass = el.getAttribute("class");
      const imgURL = el.getAttribute("src");

      if (!imgURL) return;

      try {
        const res = await fetch(imgURL);
        if (!res.ok) {
          console.warn("imgToSvg: fetch failed", imgURL, res.status);
          return;
        }

        const text = await res.text();

        // Parse as SVG/XML (correct)
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "image/svg+xml");
        const svg = xmlDoc.querySelector("svg");

        // If the response isn't an SVG (404 HTML etc.), svg will be null
        if (!svg) {
          console.warn("imgToSvg: not an svg or invalid svg:", imgURL);
          return;
        }

        if (imgID) svg.setAttribute("id", imgID);
        if (imgClass) svg.setAttribute("class", `${imgClass} replaced-svg`);

        svg.removeAttribute("xmlns:a");

        if (el.parentNode) el.parentNode.replaceChild(svg, el);
      } catch (err) {
        console.error("imgToSvg: error for", imgURL, err);
      }
    });
  },
};
