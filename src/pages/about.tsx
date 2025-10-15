"use client";
import { Container, Typography, Box, Grid, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";

export default function About() {
  return (
    <Container
      sx={{
        py: { xs: 8, md: 10 },
        textAlign: "center",
        color: "#1E293B",
      }}
    >
      {/* INTRO */}
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

      {/* CAT MEMES SECTION */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ maxWidth: 800, mx: "auto" }}
      >
        {[
          "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif", // laptop cat
          "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif", // coding cat
          "https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif", // coffee cat
        ].map((src, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  bgcolor: "#fff",
                }}
              >
                <CardMedia
                  component="img"
                  src={src}
                  alt="Cat meme"
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                  }}
                />
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* OUTRO */}
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

          If you want to contact me write to zhuldyznamazbayeva@gmail.com
        </Typography>
      </Box>
    </Container>
  );
}
