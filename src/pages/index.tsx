"use client";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router"; 

export default function Home() {
  const router = useRouter();
  return (
    <Box
      sx={{
        backgroundColor: "#f9fafb", // soft white pastel background
        minHeight: "100vh",
        py: { xs: 8, md: 12 },
      }}
    >
      {/* HERO SECTION */}
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h2"
            fontWeight={700}
            sx={{
              mb: 2,
              color: "#1E293B",
              fontSize: { xs: "2rem", md: "3.5rem" },
            }}
          >
            👋 Hi, I’m <span style={{ color: "#4D9BE6" }}>Dotinay</span>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "#475569",
              mb: 3,
              fontWeight: 400,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
            }}
          >
            A software engineer that likes art
          </Typography>
        </motion.div>
      </Container>

      {/* ABOUT SECTION */}
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              About This Blog
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              This is my personal corner of the internet where I document my
              learning journey, share tutorials, and explore ideas that inspire me.
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Whether you’re into product design, software engineering, or creative
              storytelling — I hope you find something that resonates with you.
            </Typography>

            <Box display="flex" gap={2}>
              <Button
               onClick={() => router.push("/blog")}
                variant="contained"
                sx={{
                  px: 3,
                  py: 1.2,
                  background: "linear-gradient(90deg, #6CB9FF, #4D9BE6)",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Read My Blog
              </Button>
            </Box>
          </Grid>

<Grid item xs={12} md={5}>
  <Box
    sx={{
      border: "1px solid #E2E8F0",
      borderRadius: 4,
      p: 3,
      bgcolor: "#ffffff",
      boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      },
    }}
  >
    <Typography
      variant="subtitle1"
      fontWeight={600}
      gutterBottom
      color="text.primary"
      sx={{ mb: 2 }}
    >
      How I Feel When Debugging 🧠
    </Typography>

    <Box
      component="img"
      src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2g0ZTRwMnV6dm16MGQ0N3Fhc3JhZXczbGkzNjZ6YmM5b2w2Y3k1OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JIX9t2j0ZTN9S/giphy.gif"
      alt="Funny coding meme"
      sx={{
        borderRadius: 3,
        width: "100%",
        maxWidth: 280,
        height: "auto",
        mb: 2,
      }}
    />

    <Typography
      variant="body2"
      color="text.secondary"
    >
      “Why does it work now but not five minutes ago?”
    </Typography>
  </Box>
</Grid>

        </Grid>
      </Container>
    </Box>
  );
}
