import type { NextApiRequest, NextApiResponse } from "next";
import { scoreBotEvent, classifyBot } from "../../utils/botScoring";

const events: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({
      events: events.slice(-100).reverse(),
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};

  const userAgent = req.headers["user-agent"] || "";
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "unknown";

  const scored = scoreBotEvent({
    eventType: body.eventType || "UNKNOWN",
    path: body.path || req.url || "/",
    userAgent: String(userAgent),
    timeOnPageMs: body.timeOnPageMs,
    maxScrollDepth: body.maxScrollDepth,
    mouseMoved: body.mouseMoved,
  });

  const totalScore = scored.scoreDelta;

  const event = {
    createdAt: new Date().toISOString(),
    sessionId: body.sessionId || "unknown",
    eventType: body.eventType || "UNKNOWN",
    path: body.path || "/",
    userAgent,
    ip,
    scoreDelta: scored.scoreDelta,
    classification: classifyBot(totalScore),
    reasons: scored.reasons,
  };

  events.push(event);
  console.log("HumanOrBotEvent", event);

  return res.status(204).end();
}