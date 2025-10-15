"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

// Temporary mock data — replace this with backend API call later
const mockPosts = {
  "modern-web-development": {
    title: "Getting Started with Modern Web Development",
    date: "2025-01-20",
    category: "Tutorial",
    html: `
      <h2>🚀 Introduction</h2>
      <p>Welcome to your journey into modern web development! In this article, we’ll explore how to set up a project with React, Next.js, and TypeScript.</p>
      <img src="https://media.giphy.com/media/QTfX9Ejfra3ZmNxh6B/giphy.gif" alt="coding cat" />
      <h3>💡 Step 1: Create a new project</h3>
      <pre><code>npx create-next-app@latest my-app --typescript</code></pre>
      <p>That’s it! You’ve got your first setup done. Now let’s build something fun.</p>
    `,
  },
  "understanding-design-patterns": {
    title: "Understanding Design Patterns",
    date: "2025-01-18",
    category: "Documentation",
    html: `
      <h2>📚 What Are Design Patterns?</h2>
      <p>Design patterns are proven solutions to common problems in software design.</p>
      <img src="https://media.giphy.com/media/3o7TKsQWq2I3uXRpBu/giphy.gif" alt="thinking cat" />
      <h3>Example: The Singleton</h3>
      <pre><code>class Singleton {
        static instance;
        constructor() {
          if (Singleton.instance) return Singleton.instance;
          Singleton.instance = this;
        }
      }</code></pre>
    `,
  },
};

export default function SinglePost() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Simulate backend request
      setTimeout(() => {
        setPost(mockPosts[slug as keyof typeof mockPosts]);
        setLoading(false);
      }, 500);
    }
  }, [slug]);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5">Post not found 😿</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 8, md: 10 },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            mb: 2,
            textAlign: "center",
            color: "#1E293B",
            fontSize: { xs: "2rem", md: "2.8rem" },
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#64748B",
            mb: 6,
          }}
        >
          {post.category} • {post.date}
        </Typography>

        {/* RENDER HTML CONTENT SAFELY */}
        <Box
          className="post-content"
          sx={{
            textAlign: "left",
            color: "#334155",
            fontSize: { xs: "1.05rem", md: "1.2rem" },
            lineHeight: 1.8,
            "& img": {
              borderRadius: 3,
              width: "100%",
              marginY: 3,
            },
            "& h2, & h3": {
              marginTop: 4,
              marginBottom: 1,
              color: "#1E293B",
            },
            "& pre": {
              background: "#f3f4f6",
              padding: "1rem",
              borderRadius: 6,
              overflowX: "auto",
              fontSize: "0.95rem",
            },
            "& code": {
              fontFamily: "monospace",
            },
          }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </motion.div>
    </Container>
  );
}
