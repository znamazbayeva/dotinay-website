"use client";
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import BlogCard from "../components/BlogCard";

const posts = [
  {
    category: "Tutorial",
    date: "2025-01-20",
    title: "Getting Started with Modern Web Development",
    desc: "A comprehensive guide to building modern web applications with the latest tools and technologies.",
    slug: "modern-web-development",
  },
  {
    category: "Documentation",
    date: "2025-01-18",
    title: "Understanding Design Patterns",
    desc: "Exploring common design patterns and their practical applications in software development.",
    slug: "understanding-design-patterns",
  },
  {
    category: "News",
    date: "2025-01-15",
    title: "Industry News: Latest Updates",
    desc: "Stay updated with the latest trends and developments in the tech industry.",
    slug: "industry-news-latest-updates",
  },
];

export default function Blog() {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 8, md: 10 },
      }}
    >
      {/* HEADER */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          fontWeight={700}
          color="text.primary"
          sx={{
            fontSize: { xs: "3rem", md: "3.8rem" },
            mb: 1,
          }}
        >
          Recent Posts
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontSize: { xs: "2.1rem", md: "2.3rem" } }}
        >
          Latest content from the blog
        </Typography>
      </Box>

      {/* COMPACT LIST */}
      <Stack spacing={1.5}> {/* smaller spacing */}
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <BlogCard
              title={post.title}
              desc={post.desc}
              slug={post.slug}
              category={post.category}
              date={post.date}
            />
          </motion.div>
        ))}
      </Stack>
    </Container>
  );
}
