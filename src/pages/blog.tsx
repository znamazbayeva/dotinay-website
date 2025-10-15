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

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
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

      <Stack spacing={2}>
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <BlogCard
              title={post.title}
              desc={post.html?.replace(/<[^>]+>/g, "").slice(0, 140) + "..."}
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
