"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  // Github,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const timeline = [
  {
    year: "2018",
    title: "Biology, olympiads, and the first pivot",
    body:
      "My story did not start in software engineering. I began in biological sciences, participating in olympiads and genuinely loving the elegance of research and complex systems. But admiration is not always the same as calling. After graduation, I realized I did not imagine myself building a life there — so I started searching for something I could both think through and build with my own hands.",
    tag: "The beginning",
    glow: "linear-gradient(135deg, rgba(77,155,230,0.18), rgba(151,226,255,0.12), rgba(255,255,255,0))",
  },
  {
    year: "2018",
    title: "Technovation and the first proof",
    body:
      "During my foundation year, I joined Technovation Challenge. Our team placed 3rd out of 40 teams, and that single experience changed my direction. It was the first time technology felt like more than an abstract interest — it felt like momentum. That opportunity led me to MethodPro, where I got my first internship and later won 1st place at a hackathon.",
    tag: "First breakthrough",
    glow: "linear-gradient(135deg, rgba(93,135,255,0.16), rgba(160,170,255,0.12), rgba(255,255,255,0))",
  },
  {
    year: "2018–2022",
    title: "Switching to Computer Science",
    body:
      "I changed my major to Computer Science at Nazarbayev University. Those years were some of the hardest. I struggled academically at first, especially after transitioning from another field. But slowly, difficult concepts became structure, then intuition. I did not become comfortable overnight — I became consistent.",
    tag: "Hard years",
    glow: "linear-gradient(135deg, rgba(180,140,255,0.15), rgba(240,180,255,0.10), rgba(255,255,255,0))",
  },
  {
    year: "2021",
    title: "Research and technical confidence",
    body:
      "As a research assistant at Nazarbayev University, I worked on convolutional neural network classifiers for P300 signals in a brain-computer interface system. We were trying to convert thoughts of written letters into on-screen text. I achieved 89% accuracy through model design and hyperparameter tuning. It gave me one of my first real experiences of pushing a technical idea until it worked.",
    tag: "Research",
    glow: "linear-gradient(135deg, rgba(70,195,150,0.16), rgba(120,220,200,0.10), rgba(255,255,255,0))",
  },
  {
    year: "2022–2023",
    title: "Elefanto: becoming an engineer",
    body:
      "At Elefanto, I moved from theory into real product work. I optimized the website of MEGA, the largest shopping center in Kazakhstan, by 50% and improved security by adding content-security policy. I also built an admin portal for an international education project involving Ecuador and the United Kingdom. This is where I learned what it means to ship, iterate, and own impact.",
    tag: "Product engineering",
    glow: "linear-gradient(135deg, rgba(255,190,120,0.16), rgba(255,215,170,0.10), rgba(255,255,255,0))",
  },
  {
    year: "2024–2025",
    title: "Visa: distributed systems and rigor",
    body:
      "At Visa, I worked on backend infrastructure for reconciliation payments. I designed and maintained microservices, improved CI/CD pipelines by 30%, strengthened observability with monitoring and alerting, and collaborated closely with infrastructure and security teams in regulated environments. It was the stage where I began thinking more in systems than in isolated services.",
    tag: "Backend infrastructure",
    glow: "linear-gradient(135deg, rgba(77,190,230,0.16), rgba(170,235,255,0.10), rgba(255,255,255,0))",
  },
  {
    year: "2025–Present",
    title: "AWS: security detection at scale",
    body:
      "At AWS, I work on Security Detection Systems. I design regional build automation for Sonaris detection pipelines, built the Regional Detection Archive, and developed efficacy metrics for evaluating detection quality in the real world. The scale is different, the responsibility is heavier, and the engineering is sharper — but the core feeling is still the same: build something useful and make it reliable.",
    tag: "AWS",
    glow: "linear-gradient(135deg, rgba(255,155,190,0.16), rgba(255,210,225,0.10), rgba(255,255,255,0))",
  },
];

const experience = [
  {
    role: "Software Development Engineer",
    company: "Amazon Web Services (AWS) — Sonaris, Dublin",
    period: "Sep 2025 – Present",
    stack: "Java · AWS · Distributed Systems · Automation · Security Engineering",
    details: [
      "Designed and implemented regional build automation for security detection pipelines across AWS regions.",
      "Built the Regional Detection Archive for validating and versioning thousands of detections.",
      "Developed an efficacy metrics framework measuring precision, recall, and rollout quality.",
      "Worked with security engineers and threat intelligence teams to strengthen active defense systems.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Visa, Warsaw",
    period: "Jul 2024 – Aug 2025",
    stack: "Java · Spring Boot · Distributed Systems · CI/CD · Observability",
    details: [
      "Designed and maintained microservices for reconciliation payments across distributed systems.",
      "Improved deployment efficiency by automating CI/CD pipelines, reducing release time by 30%.",
      "Increased observability and uptime with custom dashboards and alerting tooling.",
      "Partnered with infrastructure and security teams to meet audit and privacy requirements.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Elefanto — International Team, Almaty",
    period: "Sep 2022 – Oct 2023",
    stack: "Vue.js · Nuxt.js · Django · TypeScript · Nginx · React",
    details: [
      "Optimized the MEGA shopping center website by 50% and improved security with content-security policy.",
      "Built an admin portal for an international education project with teams from Ecuador and the UK.",
      "Worked through the product lifecycle from ideation to delivery for features used by 10K+ users.",
    ],
  },
  {
    role: "Research Assistant",
    company: "Nazarbayev University, Astana",
    period: "May 2021 – Aug 2021",
    stack: "Python · PyTorch · Research",
    details: [
      "Developed CNN classifiers for P300 signals in a brain-computer interface system.",
      "Reached 89% accuracy with a one-convolution-layer neural network and tuning.",
    ],
  },
];

const achievements = [
  "6th place out of 54 teams at AITUHACKDAY: Creative Industry (2022)",
  "1st place out of 18 teams at MethodPro Hackathon (2019)",
  "3rd place out of 40 teams at Technovation Challenge (2018)",
];

const projects = [
  {
    title: "Agro-focused e-commerce platform",
    meta: "Django · NGINX · PostgreSQL · REST API · Spring 2024",
    body: "Built an API for an agro-products company that helped increase sales by 20% through better order processing and inventory management.",
  },
  {
    title: "Barbershop reservation web application",
    meta: "Django · JavaScript · PostgreSQL · Nuxt.js · Summer 2023",
    body: "Developed an online reservation system used by roughly 300 customers monthly.",
  },
  {
    title: "Internship management application",
    meta: "Django · React · Redux · REST API · Spring 2022",
    body: "Built an internship recruitment and application portal for local students and companies in a team of three.",
  },
];

const skills = [
  "Java",
  "Spring Boot",
  "AWS",
  "Distributed Systems",
  "Security Engineering",
  "Automation",
  "Vue.js",
  "React.js",
  "TypeScript",
  "Python",
  "Django",
  "SQL",
  "Observability",
  "CI/CD",
];

const glassCardSx = {
  borderRadius: "30px",
  background: "rgba(255,255,255,0.68)",
  border: "1px solid rgba(255,255,255,0.72)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 24px 80px rgba(15, 23, 42, 0.08)",
};

const softInnerCardSx = {
  borderRadius: "24px",
  background: "rgba(248,250,252,0.7)",
  border: "1px solid rgba(226,232,240,0.85)",
  boxShadow: "0 10px 30px rgba(15,23,42,0.03)",
};

export default function CareerJourneyPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "text.primary",
        background:
          "radial-gradient(circle at top, rgba(77,155,230,0.18), transparent 24%), linear-gradient(to bottom, #f8fbff, #eef4fb 40%, #eaf2fb 100%)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,0.48)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 15% 15%, rgba(77,155,230,0.20), transparent 22%), radial-gradient(circle at 85% 20%, rgba(216,180,254,0.16), transparent 18%), radial-gradient(circle at 65% 70%, rgba(253,164,175,0.12), transparent 18%)",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", py: { xs: 10, md: 14 } }}>
          <Grid container spacing={6} alignItems="flex-end">
            <Grid item xs={12} lg={7}>
              <MotionBox initial="hidden" animate="visible" variants={fadeUp}>
                <Chip
                  icon={<Sparkles size={14} />}
                  label="Career · CV · Story"
                  sx={{
                    mb: 3,
                    px: 1,
                    py: 2.4,
                    borderRadius: "999px",
                    fontWeight: 600,
                    color: "primary.main",
                    background: "rgba(255,255,255,0.72)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    backdropFilter: "blur(12px)",
                    "& .MuiChip-icon": { color: "primary.main" },
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    maxWidth: 920,
                    fontSize: { xs: "2.6rem", md: "4.5rem" },
                    lineHeight: { xs: 1.15, md: 1.1 },
                  }}
                >
                  My journey from biology to building systems at AWS.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 4,
                    maxWidth: 900,
                    color: "text.secondary",
                    fontSize: { xs: "1.05rem", md: "1.35rem" },
                    lineHeight: { xs: 1.8, md: 2 },
                  }}
                >
                  I’m Zhuldyz Namazbayeva — a software engineer whose path into tech started
                  with uncertainty, competitions, difficult transitions, and a lot of
                  persistence. This page is both my CV and the story behind it.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mt: 5, alignItems: { xs: "stretch", sm: "center" } }}
                >
                  <Button
                    variant="contained"
                    startIcon={<Mail size={18} />}
                    href="mailto:zhuldyznamazbayeva@gmail.com"
                    sx={{
                      px: 3,
                      py: 1.6,
                      borderRadius: "18px",
                      boxShadow: "0 18px 40px rgba(77,155,230,0.25)",
                    }}
                  >
                    Contact me
                  </Button>

                  {/* <Button
                    variant="outlined"
                    startIcon={<Github size={18} />}
                    href="https://github.com/znamazbayeva"
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      px: 3,
                      py: 1.6,
                      borderRadius: "18px",
                      color: "text.primary",
                      borderColor: "rgba(203,213,225,0.8)",
                      background: "rgba(255,255,255,0.78)",
                      backdropFilter: "blur(12px)",
                      "&:hover": {
                        borderColor: "rgba(148,163,184,0.8)",
                        background: "rgba(255,255,255,0.95)",
                      },
                    }}
                  >
                    GitHub
                  </Button> */}
                </Stack>
              </MotionBox>
            </Grid>

            <Grid item xs={12} lg={5}>
              <MotionBox
                initial="hidden"
                animate="visible"
                custom={1}
                variants={fadeUp}
                sx={{ display: "grid", gap: 2 }}
              >
                <Paper elevation={0} sx={{ ...glassCardSx, p: 3.5 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MapPin size={18} />
                    <Typography variant="body2" color="text.secondary">
                      Dublin, Ireland
                    </Typography>
                  </Stack>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    Software Development Engineer
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    AWS — Security Detection Systems
                  </Typography>
                </Paper>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper elevation={0} sx={{ ...glassCardSx, p: 3, height: "100%" }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <GraduationCap size={18} />
                        <Typography variant="body2" color="text.secondary">
                          Education
                        </Typography>
                      </Stack>
                      <Typography variant="h6" sx={{ mt: 2, color: "text.primary" }}>
                        Nazarbayev University
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        BSc in Computer Science · 2018–2022
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Paper elevation={0} sx={{ ...glassCardSx, p: 3, height: "100%" }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Briefcase size={18} />
                        <Typography variant="body2" color="text.secondary">
                          Focus
                        </Typography>
                      </Stack>
                      <Typography variant="h6" sx={{ mt: 2, color: "text.primary" }}>
                        Backend, security, scale
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Distributed systems, metrics, automation, real-world reliability.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 10, md: 14 } }}>
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <Typography
            sx={{
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "primary.main",
            }}
          >
            Journey
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 2,
              fontSize: { xs: "2rem", md: "3.2rem" },
            }}
          >
            A creative timeline of how I got here.
          </Typography>
          <Typography variant="body1" sx={{ mt: 3, maxWidth: 760, color: "text.secondary" }}>
            Inspired by academic CV storytelling layouts, but rewritten to feel more
            personal, modern, and alive.
          </Typography>
        </MotionBox>

        <Box sx={{ position: "relative", mt: { xs: 8, md: 10 } }}>
          <Box
            sx={{
              position: "absolute",
              left: 24,
              top: 0,
              bottom: 0,
              width: "1px",
              display: { xs: "none", md: "block" },
              background:
                "linear-gradient(to bottom, rgba(125,211,252,0.8), rgba(196,181,253,0.8), rgba(244,114,182,0.65))",
            }}
          />

          <Stack spacing={3}>
            {timeline.map((item, index) => (
              <MotionBox
                key={item.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "80px 1fr" },
                  gap: { xs: 2, md: 4 },
                }}
              >
                <Box sx={{ position: "relative", display: { xs: "none", md: "block" } }}>
                  <Paper
                    elevation={0}
                    sx={{
                      position: "sticky",
                      top: 96,
                      width: 48,
                      minHeight: 48,
                      borderRadius: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      px: 1,
                      background: "rgba(255,255,255,0.85)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 14px 30px rgba(15,23,42,0.08)",
                    }}
                  >
                    <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, lineHeight: 1.15 }}>
                      {item.year}
                    </Typography>
                  </Paper>
                </Box>

                <MotionPaper
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  elevation={0}
                  sx={{
                    ...glassCardSx,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: item.glow,
                      opacity: 0.95,
                    }}
                  />
                  <Box sx={{ position: "relative", p: { xs: 3, md: 4 } }}>
                    <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ mb: 3 }}>
                      <Chip
                        label={item.year}
                        size="small"
                        sx={{
                          display: { xs: "inline-flex", md: "none" },
                          background: "rgba(255,255,255,0.82)",
                          border: "1px solid rgba(226,232,240,0.8)",
                        }}
                      />
                      <Chip
                        label={item.tag}
                        size="small"
                        sx={{
                          background: "rgba(241,245,249,0.9)",
                          color: "text.secondary",
                        }}
                      />
                    </Stack>

                    <Typography variant="h3" sx={{ fontSize: { xs: "1.7rem", md: "2.2rem" } }}>
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        mt: 3,
                        maxWidth: 920,
                        color: "text.secondary",
                        fontSize: { xs: "1rem", md: "1.12rem" },
                        lineHeight: { xs: 1.9, md: 2 },
                      }}
                    >
                      {item.body}
                    </Typography>
                  </Box>
                </MotionPaper>
              </MotionBox>
            ))}
          </Stack>
        </Box>
      </Container>

      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.7)",
          borderBottom: "1px solid rgba(255,255,255,0.7)",
          background: "rgba(255,255,255,0.34)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 10, md: 14 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} xl={7}>
              <MotionPaper
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                elevation={0}
                sx={{ ...glassCardSx, p: { xs: 3, md: 4 } }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "primary.main",
                  }}
                >
                  Experience
                </Typography>

                <Typography variant="h2" sx={{ mt: 2, fontSize: { xs: "2rem", md: "3rem" } }}>
                  Work that shaped how I think.
                </Typography>

                <Stack spacing={2.5} sx={{ mt: 4 }}>
                  {experience.map((item, index) => (
                    <MotionPaper
                      key={item.role + item.company}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={fadeUp}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.22 }}
                      elevation={0}
                      sx={{ ...softInnerCardSx, p: 3 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="h5" sx={{ color: "text.primary" }}>
                            {item.role}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.8, fontWeight: 600 }}>
                            {item.company}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mt: 1.2, color: "primary.main", fontWeight: 500 }}
                          >
                            {item.stack}
                          </Typography>
                        </Box>

                        <Chip
                          label={item.period}
                          sx={{
                            background: "rgba(255,255,255,0.88)",
                            border: "1px solid rgba(226,232,240,0.9)",
                            fontWeight: 600,
                          }}
                        />
                      </Box>

                      <Stack spacing={1.6} sx={{ mt: 3 }}>
                        {item.details.map((detail) => (
                          <Box key={detail} sx={{ display: "flex", gap: 1.5 }}>
                            <Box
                              sx={{
                                width: 7,
                                height: 7,
                                mt: "12px",
                                borderRadius: "999px",
                                background: "primary.main",
                                flexShrink: 0,
                              }}
                            />
                            <Typography variant="body2" sx={{ lineHeight: 1.9 }}>
                              {detail}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </MotionPaper>
                  ))}
                </Stack>
              </MotionPaper>
            </Grid>

            <Grid item xs={12} xl={5}>
              <Stack spacing={4}>
                <MotionPaper
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  elevation={0}
                  sx={{ ...glassCardSx, p: 3.5 }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: "primary.main",
                    }}
                  >
                    Projects
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    Selected builds
                  </Typography>

                  <Stack spacing={2} sx={{ mt: 3 }}>
                    {projects.map((project) => (
                      <MotionPaper
                        key={project.title}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        elevation={0}
                        sx={{
                          ...softInnerCardSx,
                          p: 2.5,
                          borderRadius: "22px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 2,
                          }}
                        >
                          <Box>
                            <Typography variant="h6" sx={{ color: "text.primary" }}>
                              {project.title}
                            </Typography>
                            <Typography
                              sx={{
                                mt: 0.8,
                                fontSize: "0.78rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "text.secondary",
                              }}
                            >
                              {project.meta}
                            </Typography>
                          </Box>
                          <ArrowUpRight size={16} />
                        </Box>
                        <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.9 }}>
                          {project.body}
                        </Typography>
                      </MotionPaper>
                    ))}
                  </Stack>
                </MotionPaper>

                <MotionPaper
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  elevation={0}
                  sx={{ ...glassCardSx, p: 3.5 }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: "primary.main",
                    }}
                  >
                    Achievements
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    Competitive milestones
                  </Typography>

                  <Stack spacing={1.5} sx={{ mt: 3 }}>
                    {achievements.map((item) => (
                      <Box
                        key={item}
                        sx={{
                          px: 2,
                          py: 1.8,
                          borderRadius: "20px",
                          border: "1px solid rgba(191,219,254,0.8)",
                          background:
                            "linear-gradient(90deg, rgba(239,246,255,0.9), rgba(255,255,255,0.94), rgba(252,231,243,0.85))",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "text.primary" }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </MotionPaper>

                <MotionPaper
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  elevation={0}
                  sx={{ ...glassCardSx, p: 3.5 }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: "primary.main",
                    }}
                  >
                    Skills
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    Core stack
                  </Typography>

                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.2,
                    }}
                  >
                    {skills.map((skill) => (
                      <MotionBox
                        key={skill}
                        whileHover={{ y: -3, scale: 1.02 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Chip
                          label={skill}
                          sx={{
                            px: 1,
                            py: 2.4,
                            borderRadius: "16px",
                            fontWeight: 600,
                            color: "text.primary",
                            background: "rgba(248,250,252,0.92)",
                            border: "1px solid rgba(226,232,240,0.9)",
                            "&:hover": {
                              background: "rgba(239,246,255,1)",
                              borderColor: "rgba(147,197,253,0.9)",
                            },
                          }}
                        />
                      </MotionBox>
                    ))}
                  </Box>
                </MotionPaper>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 10, md: 14 } }}>
        <MotionPaper
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          elevation={0}
          sx={{
            ...glassCardSx,
            position: "relative",
            overflow: "hidden",
            p: { xs: 3.5, md: 5 },
            borderRadius: "34px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 15% 20%, rgba(125,211,252,0.18), transparent 25%), radial-gradient(circle at 85% 20%, rgba(244,114,182,0.14), transparent 20%), radial-gradient(circle at 50% 100%, rgba(196,181,253,0.18), transparent 24%)",
            }}
          />
          <Box sx={{ position: "relative" }}>
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "primary.main",
              }}
            >
              Reflection
            </Typography>

            <Typography
              variant="h2"
              sx={{
                mt: 2,
                maxWidth: 980,
                fontSize: { xs: "2rem", md: "3.2rem" },
              }}
            >
              I didn’t enter software engineering through a straight line. I arrived here
              by growing into it.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 4,
                maxWidth: 900,
                color: "text.secondary",
              }}
            >
              What I’m most proud of is not just the titles or the companies. It’s the
              ability to keep moving through uncertainty — from biology to hackathons,
              from student struggles to real engineering, from local internships to AWS.
              My career has been built step by step, and that is exactly what makes it
              mine.
            </Typography>
          </Box>
        </MotionPaper>
      </Container>
    </Box>
  );
}