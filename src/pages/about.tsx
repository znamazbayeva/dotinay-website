"use client";

import { Container, Typography, Box, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";

const gifs = [
  "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
  "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif",
  "https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif",
];

export default function About() {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 8, md: 10 },
        px: { xs: 2, sm: 3 },
        textAlign: "center",
        color: "#0c1a31ff",
        overflowX: "clip",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            mb: 3,
            fontSize: { xs: "2rem", md: "2.8rem" },
          }}
        >
          ✨ My Story
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 800,
            mx: "auto",
            mb: 4,
            fontSize: { xs: "1.1rem", md: "1.3rem" },
            lineHeight: 1.7,
          }}
        >
          I’m Zhuldyz - a tech girlie who started her journey in <b>Kazakhstan</b>,
          moved to <b>Poland</b> to explore the world of code, and now builds cool stuff in <b>Ireland</b>.
          My life is powered by ☕, debugging sessions, and random bursts of creativity.
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 700,
            mx: "auto",
            mb: 6,
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            lineHeight: 1.8,
          }}
        >
          I’ve worked with <b>Elefanto</b> 🐘 (building frontend),
          spent amazing time at <b>Visa</b> 💳 (engineering and b2b solutions),
          and now I’m at <b>AWS</b> ☁️ - working on the exciting parts of large-scale systems.
          Every stop has taught me something new.
        </Typography>
      </motion.div>

      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
          },
          gap: { xs: 2, sm: 3 },
        }}
      >
        {gifs.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
            style={{ width: "100%" }}
          >
<Card
  sx={{
    width: "100%",
    borderRadius: 4,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    overflow: "hidden",
    bgcolor: "transparent", // 👈 no white frame
  }}
>
              <CardMedia
                component="img"
                src={src}
                alt="Cat meme"
                sx={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  aspectRatio: { xs: "4 / 3", sm: "1 / 1" },
                   objectFit: "cover",
                  bgcolor: "#fff",
                }}
              />
            </Card>
          </motion.div>
        ))}
      </Box>

      <Box mt={8}>
        <Typography
          variant="h6"
          sx={{
            color: "#475569",
            maxWidth: 700,
            mx: "auto",
            fontSize: { xs: "1.2rem", md: "1.4rem" },
            lineHeight: 1.8,
          }}
        >
          My code travels with me from Almaty to Warsaw to Dublin
          and somehow, so do my favorite cat memes. 🐾
          <br />
          <br />
          If you want to contact me write to zhuldyznamazbayeva@gmail.com
        </Typography>
      </Box>
    </Container>
  );
}