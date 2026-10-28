import { Head, Html, Main, NextScript } from "next/document";

// Same no-flash light/dark initialization as the original portfolio.
const themeInitScript = `
(function () {try {
  var stored = localStorage.getItem('theme');
  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  var theme = stored || (prefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
} catch (e) {}})();`;

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <meta name="theme-color" content="#0d1117" />
        <link rel="icon" type="image/png" href="/fabicon.png" />
        <link rel="apple-touch-icon" href="/fabicon.png" />
        {/* Original vendor + template CSS combined to remove the @import waterfall. */}
        <link rel="stylesheet" href="/assets/css/style.optimized.css" />
        {/* Rubik typography is unchanged; preconnect removes DNS/connection setup. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" />
      </Head>
      <body><Main /><NextScript /></body>
    </Html>
  );
}
