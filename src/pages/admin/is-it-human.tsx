import { useEffect, useState } from "react";

export default function IsItHumanDashboard() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/is-it-human")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load dashboard data");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <main style={{ padding: 32 }}>Error: {error}</main>;
  }

  if (!data) {
    return <main style={{ padding: 32 }}>Loading...</main>;
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Is It a Human?</h1>
      <p>Honeypot and scanner detection dashboard.</p>

      <h2>Summary</h2>
      <ul>
        <li>Total sessions: {data.summary.totalSessions}</li>
        <li>Likely humans: {data.summary.likelyHumans}</li>
        <li>Suspicious bots: {data.summary.suspiciousBots}</li>
        <li>Scanner bots: {data.summary.scannerBots}</li>
        <li>Honeypot hits: {data.summary.honeypotHits}</li>
      </ul>

      <h2>Recent events</h2>
      <table style={{ width: "100%", marginTop: 16 }}>
        <thead>
          <tr>
            <th align="left">Time</th>
            <th align="left">Event</th>
            <th align="left">Path</th>
            <th align="left">Score</th>
            <th align="left">Reasons</th>
          </tr>
        </thead>

        <tbody>
          {data.events.map((event: any) => (
            <tr key={event.eventId}>
              <td>{event.createdAt}</td>
              <td>{event.eventType}</td>
              <td>{event.path}</td>
              <td>{event.scoreDelta}</td>
              <td>{(event.reasons || []).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}