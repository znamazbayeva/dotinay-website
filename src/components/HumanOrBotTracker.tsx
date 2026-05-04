import { useEffect } from "react";

function getSessionId() {
  const key = "human_or_bot_session";
  let value = localStorage.getItem(key);

  if (!value) {
    value = crypto.randomUUID();
    localStorage.setItem(key, value);
  }

  return value;
}

export default function HumanOrBotTracker() {
  useEffect(() => {
    const path = window.location.pathname;
    const trackedKey = `human_or_bot_js_tracked:${path}`;

    if (sessionStorage.getItem(trackedKey)) {
      return;
    }

    sessionStorage.setItem(trackedKey, "true");

    const sessionId = getSessionId();
    const startedAt = Date.now();

    let mouseMoved = false;
    let maxScrollDepth = 0;

    fetch("/api/visitor-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "JS_EXECUTED",
        sessionId,
        path,
      }),
    }).catch(() => {});

    const onMouseMove = () => {
      mouseMoved = true;
    };

    const onScroll = () => {
      const fullHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (fullHeight > 0) {
        const depth = Math.round((window.scrollY / fullHeight) * 100);
        maxScrollDepth = Math.max(maxScrollDepth, depth);
      }
    };

    const onBeforeUnload = () => {
      const payload = JSON.stringify({
        eventType: "PAGE_SUMMARY",
        sessionId,
        path,
        timeOnPageMs: Date.now() - startedAt,
        maxScrollDepth,
        mouseMoved,
      });

      navigator.sendBeacon("/api/visitor-event", payload);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  return null;
}