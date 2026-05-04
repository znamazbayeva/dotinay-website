import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function getClassificationColor(classification: string) {
  if (classification === "scanner_bot") return "error";
  if (classification === "suspicious_bot") return "warning";
  if (classification === "likely_human") return "success";
  return "default";
}

function groupRequestsOverTime(events: any[]) {
  const buckets: Record<string, number> = {};

  for (const event of events || []) {
    const date = new Date(event.createdAt);
    const key = `${date.getHours().toString().padStart(2, "0")}:00`;
    buckets[key] = (buckets[key] || 0) + 1;
  }

  return Object.entries(buckets)
    .map(([time, requests]) => ({ time, requests }))
    .sort((a, b) => a.time.localeCompare(b.time));
}

function buildBotVsHumanData(summary: any) {
  return [
    { name: "Humans", value: summary?.likelyHumans || 0 },
    { name: "Suspicious", value: summary?.suspiciousBots || 0 },
    { name: "Scanners", value: summary?.scannerBots || 0 },
    { name: "Unknown", value: summary?.unknown || 0 },
  ];
}

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

  const topAttackers = useMemo(() => {
    return [...(data?.sessions || [])]
      .sort((a: any, b: any) => {
        const aScore = (a.honeypotHits || 0) * 10 + (a.requestCount || 0);
        const bScore = (b.honeypotHits || 0) * 10 + (b.requestCount || 0);
        return bScore - aScore;
      })
      .slice(0, 10);
  }, [data]);

  const requestTimeline = useMemo(
    () => groupRequestsOverTime(data?.events || []),
    [data]
  );

  const botVsHumanData = useMemo(
    () => buildBotVsHumanData(data?.summary || {}),
    [data]
  );

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  const summaryCards = [
    ["Total sessions", data.summary.totalSessions],
    ["Likely humans", data.summary.likelyHumans],
    ["Suspicious bots", data.summary.suspiciousBots],
    ["Scanner bots", data.summary.scannerBots],
    ["Honeypot hits", data.summary.honeypotHits],
  ];

  return (
    <Container sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h3" fontWeight={800}>
        Is It a Human?
      </Typography>

      <Typography sx={{ mt: 1, opacity: 0.7 }}>
        Honeypot, scanner grouping, and visitor intelligence dashboard.
      </Typography>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {summaryCards.map(([label, value]) => (
          <Grid item xs={12} sm={6} md={2.4} key={String(label)}>
            <Card sx={{ borderRadius: 4, height: "100%" }}>
              <CardContent>
                <Typography variant="body2" sx={{ opacity: 0.65 }}>
                  {label}
                </Typography>
                <Typography variant="h4" fontWeight={800}>
                  {value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Bots vs humans
              </Typography>

              <Box sx={{ height: 280, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={botVsHumanData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Requests over time
              </Typography>

              <Box sx={{ height: 280, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={requestTimeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="requests" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 3, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={800}>
            Top attackers
          </Typography>

          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {topAttackers.map((s: any) => (
              <Box
                key={s.visitorKey}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1.6fr 0.6fr 0.6fr 0.8fr",
                  },
                  gap: 1,
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    visitorKey
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      wordBreak: "break-all",
                      fontSize: 13,
                    }}
                  >
                    {s.visitorKey}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    Requests
                  </Typography>
                  <Typography fontWeight={800}>{s.requestCount || 0}</Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    Honeypot hits
                  </Typography>
                  <Typography fontWeight={800}>{s.honeypotHits || 0}</Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    Classification
                  </Typography>
                  <Box>
                    <Chip
                      label={s.classification}
                      color={getClassificationColor(s.classification) as any}
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={800}>
            Attack patterns
          </Typography>

          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {(data.topPaths || []).map((item: any) => (
              <Box
                key={item.path}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography sx={{ fontFamily: "monospace", wordBreak: "break-all" }}>
                  {item.path}
                </Typography>

                <Chip label={`${item.count} hits`} size="small" />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={800}>
            Recent events
          </Typography>

          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {(data.events || []).map((event: any) => (
              <Box
                key={event.eventId}
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={1}
                  justifyContent="space-between"
                >
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    {event.createdAt}
                  </Typography>
                  <Chip label={event.eventType} size="small" />
                </Stack>

                <Typography
                  sx={{
                    mt: 1,
                    fontFamily: "monospace",
                    wordBreak: "break-all",
                  }}
                >
                  {event.path}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Score: <b>{event.scoreDelta}</b>
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
                  {(event.reasons || []).map((reason: string) => (
                    <Chip key={reason} label={reason} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}