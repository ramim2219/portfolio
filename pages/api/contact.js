// Server-side contact endpoint. Requires RESEND_API_KEY and a Resend-verified sending domain.
// Never expose RESEND_API_KEY in NEXT_PUBLIC_* environment variables or browser code.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const config = {
  api: { bodyParser: { sizeLimit: "12kb" } },
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  // This helps reject cross-site browser requests; not a replacement for bot protection.
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return res.status(403).json({ error: "Invalid request origin." });
      }
    } catch {
      return res.status(403).json({ error: "Invalid request origin." });
    }
  }

  const data = req.body;
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return res.status(400).json({ error: "Invalid request." });
  }

  // A filled honeypot indicates likely bot activity; silently skip sending.
  if (typeof data.website === "string" && data.website.length > 0) {
    return res.status(200).json({ message: "Message submitted successfully." });
  }

  const fields = ["name", "email", "subject", "message"];
  if (fields.some((field) => typeof data[field] !== "string")) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const name = data.name.trim();
  const email = data.email.trim();
  const subject = data.subject.trim().replace(/[\r\n]+/g, " ");
  const message = data.message.trim();

  if (
    name.length < 2 || name.length > 100 ||
    email.length > 254 || !EMAIL_PATTERN.test(email) ||
    subject.length < 3 || subject.length > 150 ||
    message.length < 10 || message.length > 5000
  ) {
    return res.status(400).json({ error: "Please enter valid contact information and a message of at least 10 characters." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Contact form: RESEND_API_KEY is not configured.");
    return res.status(503).json({ error: "Contact form is not configured yet. Please email shafayet@ramim.tech directly." });
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Ramim Portfolio <contact@ramim.tech>";
  const to = process.env.CONTACT_TO_EMAIL || "shafayet@ramim.tech";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    let response;
    try {
      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "User-Agent": "RamimPortfolioContact/1.0",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email, // Replying in your inbox goes directly to the visitor.
          subject: `[Portfolio Contact] ${subject}`,
          text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n`,
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      // Do not leak Resend details or credentials to the visitor.
      console.error("Contact form: email provider failed with status", response.status);
      return res.status(502).json({ error: "Could not send your message. Please try again or email me directly." });
    }
    return res.status(200).json({ message: "Message submitted successfully." });
  } catch (error) {
    console.error("Contact form: provider unavailable", error?.name || "Unknown error");
    return res.status(502).json({ error: "Email service is temporarily unavailable. Please try again later." });
  }
}
