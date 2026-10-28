# Portfolio Optimization — Installation & Test Guide (বাংলা)

এই project-এ **original layout, section order, colors, dark/light mode, animations, AI chatbot, contact system এবং content ধরে রাখা হয়েছে**। এটি কোনো redesign নয়।

## Install

1. সবচেয়ে নিরাপদ: **Patch ZIP** তোমার original portfolio project-এর মধ্যে extract করে files **merge / overwrite** করো। এতে original project-এর প্রয়োজনীয় icon font assets অক্ষত থাকবে।
2. অথবা Full Source ZIP extract করে original project-এর `public/assets/vendor/bootstrap/icons/fonts/` এবং `public/assets/vendor/font-awesome/webfonts/` folders সেখানে copy করবে। Font binary assets ZIP-এ দেওয়া হয়নি।
3. তোমার local `.env.local` backup থেকে নিজে restore করো। এই output-এ কোনো original secret key রাখা হয়নি। `.env.example` শুধু environment variable names ও placeholder দেখায়।
4. Terminal-এ `npm ci` এবং `npm run build` চালাও। Build সফল হলে `npm start` দিয়ে পরীক্ষা করো।
5. Home, About, Projects, Experience, Research, Leadership এবং Contact-এর light/dark mode, gallery zoom, nav এবং email form যাচাই করো। Live deploy-এর পরে PageSpeed Insights চালাও।

## Applied changes

- stylesheet-এর ৫টি local `@import` একত্র করে `public/assets/css/style.optimized.css` — CSS order অপরিবর্তিত; `_document.js` এখন এটি ব্যবহার করে। Rubik Google Font CSS আলাদাভাবে parallel-load হয়, preconnect সহ।
- Homepage hero-র image dimensions এবং high-priority loading দেওয়া হয়েছে, শুধুমাত্র homepage-এ preload করা হয়েছে।
- ৫ achievements + ৮ certificates-এর optimized lightweight thumbnail তৈরি হয়েছে; full images lightbox/detail-এ আগের মতো থাকে। Slider কেবল current ও neighbour slide images load করে।
- `/projects` page-এর first-row thumbnails দ্রুত load হয়, homepage-এর below-the-fold projects lazy-loaded থাকে।
- Project Details-এর header image/hero-তে full-quality original screenshot দেখাবে; project grid-এর small card thumbnail detail-এ zoom করার জন্য ব্যবহার করা হচ্ছে না। Video-hero-তে original poster বজায়।
- Project gallery-এর title/image misalignment fix; PDF prefetch সরানো; below-the-fold gallery screenshots lazy-loaded; video preload কমানো।
- পুরোনো nonexistent `.pdf` ও `.jpeg` references: Experience/Leadership/Research-এ available real images ব্যবহার করা হয়েছে। Thesis deployment screen-এর পুরোনো missing PDF-এর জায়গায় Ifjona Review Management screenshot দেখাবে।
- Person structured-data-এর broken `home-banner.png` path ঠিক করা হয়েছে; Footer social links-এর aria-label; pagination button accessibility improvements।
- Village Scenario video format এখনও `.mp4`; optimized 720p H.264/AAC, faststart; video playback unchanged.

## Measured media reductions (not Lighthouse scores)

- Gallery thumbnail originals: 2.10 MiB → optimized thumbs 0.52 MiB (75.2% less for thumbnail requests)
- Village Scenario MP4: 11.71 MiB → 0.55 MiB (95.3% smaller); independently measured SSIM ~0.996 versus original resized to 720p.
- Original CSS requests: 5 local imported vendor stylesheets + main file; now one combined local stylesheet. Consolidated CSS gzip ~48.9 KiB. Fonts still need Google Fonts connectivity and existing original icon fonts.

## Testing status

- JS/JSX syntax checked on 51 source files; 87 relative/alias imports resolved.
- 10 unique project IDs; 5 achievements + 8 certifications; all active project and achievement gallery references resolve on disk.
- CSS parsed without errors; ZIP integrity verified.
- **Production build NOT completed here:** provided ZIP contains no `node_modules`, npm registry was unreachable in this environment. `npm run build` returned `next: not found`. Lighthouse score after these changes is **not measured**. Do not claim 90/95/100 for the new code without deploying and testing.

## Secrets / Security

The uploaded source contained `.env.local`; it was deliberately excluded from generated ZIPs. Never upload API keys to public repositories. Consider rotating the API keys in the uploaded `.env.local`, and enter fresh keys directly on your own hosting or local machine. Note: the existing Next.js dependency is old (13.2.4). An upgrade is recommended in a separate, build-verified change because major version upgrades may alter behavior.
