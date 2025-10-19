"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import BlogCard from "../components/BlogCard";

interface Post {
  pk: string;
  slug: string;
  title: string;
  category?: string;
  date?: string;
  html?: string;
  tags?: string[];
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
        const data = await res.json();

        // Ensure consistent array structure
        const postsArray = Array.isArray(data) ? data : [data];
        setPosts(postsArray);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!posts.length) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6" color="text.secondary">
          No posts found.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 10 } }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight={700}>
          Recent Posts
        </Typography>
      </Box>

      <Stack spacing={1}>
        {posts.map((post, index) => {
          const plainText = post.html
            ? post.html.replace(/<[^>]+>/g, "").slice(0, 140) + "..."
            : "Click to read more...";

          return (
            <motion.div
              key={post.slug || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <BlogCard
                title={post.title}
                desc={plainText}
                slug={post.slug}
                category={post.category}
                date={post.date}
              />
            </motion.div>
          );
        })}
      </Stack>
    </Container>
  );
}
