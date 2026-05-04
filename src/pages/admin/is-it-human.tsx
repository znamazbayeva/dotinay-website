import { GetServerSideProps } from "next";

export default function IsItHumanDashboard({ events }: { events: any[] }) {
  return (
    <main style={{ padding: 32 }}>
      <h1>Is It a Human?</h1>
      <p>Recent visitor and honeypot events.</p>

      <table style={{ width: "100%", marginTop: 24 }}>
        <thead>
          <tr>
            <th align="left">Time</th>
            <th align="left">Event</th>
            <th align="left">Path</th>
            <th align="left">Class</th>
            <th align="left">Score</th>
            <th align="left">Reasons</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.createdAt}</td>
              <td>{event.eventType}</td>
              <td>{event.path}</td>
              <td>{event.classification}</td>
              <td>{event.scoreDelta}</td>
              <td>{event.reasons.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/visitor-event`);
  const data = await res.json();

  return {
    props: {
      events: data.events || [],
    },
  };
};