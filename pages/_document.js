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
        {/* Maintain all existing site styles and layout. */}
        <link rel="stylesheet" href="/assets/css/style.css" />
      </Head>
      <body><Main /><NextScript /></body>
    </Html>
  );
}
