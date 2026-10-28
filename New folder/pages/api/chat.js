// pages/api/chat.js
import { portfolioData } from "@/src/data/portfolioData";
import { achievementsData } from "@/src/data/achievementsData";
import { experienceData } from "@/src/data/experienceData";
import { leadershipData } from "@/src/data/leadershipData";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages" });
  }

  // ---------- Helper: safely turn an array into a bullet list ----------
  const bulletize = (arr, mapper) => {
    if (!Array.isArray(arr) || arr.length === 0) return "";
    return arr.map(mapper).filter(Boolean).join("\n");
  };

  // ---------- Projects from portfolioData ----------
  const projectSummary = bulletize(
    portfolioData,
    (p) => {
      const parts = [`- ${p.title}: ${p.subtitle}`];
      if (p.status) parts.push(`status: ${p.status}`);
      if (p.link) parts.push(`link: ${p.link}`);
      if (p.repoUrl) parts.push(`repo: ${p.repoUrl}`);
      return parts.join(" | ");
    }
  );

  // ---------- Experience from experienceData ----------
  const experienceSummary = bulletize(
    experienceData,
    (e) => {
      const role = e.role || e.title || "";
      const company = e.company || e.organization || "";
      const period = e.period || e.duration || e.date || "";
      const location = e.location || "";
      const desc = e.description || e.details || "";

      const header = [role, company].filter(Boolean).join(" @ ");
      const meta = [period, location].filter(Boolean).join(" — ");
      const lines = [`- ${header}${meta ? ` (${meta})` : ""}`];
      if (desc) lines.push(`  ${desc}`);
      return lines.join("\n");
    }
  );

  // ---------- Achievements from achievementsData ----------
  const achievementsSummary = bulletize(
    achievementsData,
    (a) => {
      if (typeof a === "string") return `- ${a}`;
      const title = a.title || a.name || a.text || "";
      const detail = a.detail || a.description || a.value || "";
      return detail ? `- ${title}: ${detail}` : `- ${title}`;
    }
  );

  // ---------- Leadership from leadershipData ----------
  const leadershipSummary = bulletize(
    leadershipData,
    (l) => {
      if (typeof l === "string") return `- ${l}`;
      const role = l.role || l.title || "";
      const org = l.organization || l.company || "";
      const period = l.period || l.duration || "";
      const desc = l.description || l.details || "";

      const header = [role, org].filter(Boolean).join(" @ ");
      const meta = period ? ` (${period})` : "";
      const lines = [`- ${header}${meta}`];
      if (desc) lines.push(`  ${desc}`);
      return lines.join("\n");
    }
  );

  // ---------- Fallback CV info (used if any dynamic list is empty) ----------
  const fallbackExperience = `- Software Developer — IFJONA (Remote, Saint Albans, New York, USA), June 2025 – Present
  Built and maintained a production-ready single-vendor e-commerce platform with React.js, Laravel, PHP, and MySQL. Integrated Stripe, PayPal, and Cash on Delivery. Added real-time customer support with Laravel Reverb WebSocket. Deployed and managed the production MySQL database on a VPS.
- Software Developer Intern — Premier University, Chattogram, Bangladesh, December 2025 – Present`;

  const fallbackAchievements = `- ICPC Dhaka Regional Onsite 2024 — Ranked 213/307
- ICPC Dhaka Regional Preliminary 2023 — Ranked 835/2400+
- DUET IUPC 2025 — Ranked 64th / 170 teams
- IIUC IUPC 2025 — Ranked 42nd
- PUC IUPC 2024 — Ranked 48th
- BU DPC 2024 — Ranked 6th (Individual)
- HackerRank Frontend Developer (React) Certification
- GeeksforGeeks 160 Days Problem Solving`;

  // ---------- Assemble the system prompt ----------
  const systemPrompt = {
    role: "system",
    content: `You are the AI assistant for Shafayet Ullah Ramim's portfolio website.
You answer questions about Shafayet — his work experience, projects, skills, education,
achievements, leadership, and problem-solving profiles. Keep replies short (2–4 sentences),
friendly, and helpful. If you don't know something, say so and suggest using the
Contact section of the site.

==================================================
ABOUT SHAFAYET ULLAH RAMIM
==================================================
- Full name: Shafayet Ullah Ramim
- Role: Software Developer / Full-Stack Web Developer
- Location: Chattogram, Bangladesh
- Focus: React.js, Next.js, Laravel, PHP, MySQL, REST APIs, WebSockets

==================================================
WORK EXPERIENCE
==================================================
${experienceSummary || fallbackExperience}

==================================================
TECHNICAL SKILLS
==================================================
- Languages: PHP, JavaScript, TypeScript, Python, C, C++
- Frontend: React.js, Next.js, HTML5, CSS3, Tailwind CSS, Bootstrap
- Backend: Laravel, Node.js, Express.js, RESTful API Development,
  Authentication, Payment Gateway Integration
- CMS: WordPress Custom Theme & Plugin Development
- Database: MySQL, Query Optimization, Performance Tuning
- Real-Time: WebSocket, Socket.io, Laravel Reverb
- Tools & Deployment: Git, GitHub, Postman, Linux Server, cPanel, VPS Deployment

==================================================
EDUCATION
==================================================
- B.Sc. in Computer Science & Engineering
  Premier University, Chattogram, Bangladesh (2021 – 2025)
  CGPA: 3.63 / 4.00

==================================================
ACHIEVEMENTS & CERTIFICATIONS
==================================================
${achievementsSummary || fallbackAchievements}

==================================================
LEADERSHIP
==================================================
${leadershipSummary || "(No leadership entries provided.)"}

==================================================
PROBLEM SOLVING
==================================================
- Codeforces: Ramin2219_ — Highest rating 1249 (Pupil), top 35% of 1,692,402+ users
- CodeChef: ramim1234_ — Highest rating 1523 (2★ Coder), top 8.3% of 231,830+ users
- Solved 1000+ DSA problems and participated in 50+ online contests

==================================================
OTHER PROJECT
==================================================
- Employee Development System (GitHub)
  Full-stack attendance and payroll management with CRUD, role-based auth,
  automated payroll, overtime calculation, and a responsive dashboard.
  Built with Laravel, PHP, MySQL, HTML, CSS, JavaScript.

==================================================
PROJECTS FEATURED ON THIS SITE
==================================================
${projectSummary || "(No dynamic projects found.)"}

==================================================
INSTRUCTIONS
==================================================
- If asked "Do you know Shafayet Ullah Ramim?" or "Who is Shafayet?",
  answer yes and give a short intro using the info above.
- When asked about IFJONA, describe it as his current software developer
  role (remote, New York, USA) and highlight the e-commerce platform work,
  Stripe/PayPal integration, Laravel Reverb WebSocket, and VPS deployment.
- Answer questions about projects, skills, education, achievements,
  leadership, competitive programming, and experience.
- Never invent details that aren't listed above. If something isn't in
  this prompt, politely say you don't have that info and point the
  visitor to the Contact section.`,
  };

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [systemPrompt, ...messages],
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq error:", err);
      return res.status(500).json({ error: "Upstream error" });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, no response.";
    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}