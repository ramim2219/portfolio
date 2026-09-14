import { Head, Html, Main, NextScript } from "next/document";

// Runs before React hydration to prevent theme flash (FOUC)
const themeInitScript = `
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      var theme = stored || (prefersLight ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
    } catch (e) {}
  })();
`;

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        {/* No-flash theme initialization — must run before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        {/* Charset & rendering */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* SEO */}
        <meta name="author" content="Ramim" />
        <meta name="description" content="Ramim — Full-Stack Developer Portfolio" />
        <meta name="keywords" content="Ramim, Portfolio, Full-Stack Developer, Next.js, React" />
        <meta name="theme-color" content="#0d1117" />

        {/* Open Graph (social preview) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ramim — Full-Stack Developer" />
        <meta property="og:description" content="Portfolio of Ramim, Full-Stack Developer." />
        <meta property="og:url" content="https://ramim.tech" />
        <meta property="og:image" content="https://ramim.tech/logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ramim — Full-Stack Developer" />
        <meta name="twitter:description" content="Portfolio of Ramim, Full-Stack Developer." />
        <meta name="twitter:image" content="https://ramim.tech/logo.png" />

        {/* Title */}
        <title>Ramim — Full-Stack Developer</title>

        {/* Favicon */}
        <link rel="icon" type="image/png" href="/fabicon.png" />
        <link rel="apple-touch-icon" href="/fabicon.png" />

        {/* Styles */}
        <link rel="stylesheet" href="/assets/css/style.css" />

        {/* Canonical */}
        <link rel="canonical" href="https://ramim.tech" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}