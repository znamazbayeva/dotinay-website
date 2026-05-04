export function scoreBotEvent(input: {
  eventType: string;
  path?: string;
  userAgent?: string;
  timeOnPageMs?: number;
  maxScrollDepth?: number;
  mouseMoved?: boolean;
}) {
  let scoreDelta = 0;
  const reasons: string[] = [];

  const path = input.path || "";
  const ua = input.userAgent || "";

  if (
    path.startsWith("/private-admin") ||
    path.startsWith("/internal-debug") ||
    path.includes(".env") ||
    path.includes(".git") ||
    path.includes("wp-login") ||
    path.includes("phpmyadmin")
  ) {
    scoreDelta -= 40;
    reasons.push("HONEYPOT_OR_SCANNER_PATH");
  }

  if (!ua) {
    scoreDelta -= 20;
    reasons.push("NO_USER_AGENT");
  }

  if (/curl|wget|python-requests|bot|crawler|spider/i.test(ua)) {
    scoreDelta -= 15;
    reasons.push("SUSPICIOUS_USER_AGENT");
  }

  if (input.eventType === "JS_EXECUTED") {
    scoreDelta += 15;
    reasons.push("JS_EXECUTED");
  }

  if (input.mouseMoved) {
    scoreDelta += 20;
    reasons.push("MOUSE_MOVEMENT");
  }

  if ((input.maxScrollDepth || 0) > 40) {
    scoreDelta += 15;
    reasons.push("SCROLL_DEPTH_OVER_40");
  }

  if ((input.timeOnPageMs || 0) > 10000) {
    scoreDelta += 15;
    reasons.push("TIME_ON_PAGE_OVER_10S");
  }

  return { scoreDelta, reasons };
}

export function classifyBot(score: number) {
  if (score >= 40) return "likely_human";
  if (score <= -50) return "scanner_bot";
  if (score <= -10) return "suspicious_bot";
  return "unknown";
}