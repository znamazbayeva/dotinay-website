import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ingestUrl = process.env.HUMAN_OR_BOT_INGEST_URL;

  if (!ingestUrl) {
    return res.status(500).json({ error: "Missing HUMAN_OR_BOT_INGEST_URL" });
  }

  if (req.method === "GET") {
    return res.status(404).json({ error: "Not found" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(ingestUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...req.body,
        userAgent: req.headers["user-agent"] || "",
        ip:
          req.headers["x-forwarded-for"] ||
          req.socket.remoteAddress ||
          "unknown",
        source: "dotinay",
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Human-or-bot ingest failed:", text);
      return res.status(502).json({ error: "Ingest failed" });
    }

    return res.status(204).end();
  } catch (error) {
    console.error("Human-or-bot proxy failed:", error);
    return res.status(500).json({ error: "Failed to forward event" });
  }
}