"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Stack,
  CircularProgress,
  Chip,
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

  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get("category") || "";

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
        const data = await res.json();

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

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;

    return posts.filter(
      (post) =>
        post.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [posts, selectedCategory]);

  const uniqueCategories = useMemo(() => {
    return Array.from(
      new Set(posts.map((post) => post.category).filter(Boolean))
    ) as string[];
  }, [posts]);

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
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight={700} mb={2}>
          Recent Posts
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
        >
          <Chip
            label="All"
            clickable
            onClick={() => router.push("/blog")}
            sx={{
              bgcolor: selectedCategory ? "#F1F5F9" : "#E0F2FE",
              color: selectedCategory ? "#334155" : "#0369A1",
              fontWeight: 600,
            }}
          />

          {uniqueCategories.map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              onClick={() =>
                router.push(`/blog?category=${encodeURIComponent(category)}`)
              }
              sx={{
                bgcolor:
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? "#E0F2FE"
                    : "#F1F5F9",
                color:
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? "#0369A1"
                    : "#334155",
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>

        {selectedCategory && (
          <Typography sx={{ mt: 2, color: "#64748B", fontSize: "0.95rem" }}>
            Showing posts in <strong>{selectedCategory}</strong>
          </Typography>
        )}
      </Box>

      {!filteredPosts.length ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h6" color="text.secondary">
            No posts found in this category.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={1}>
          {filteredPosts.map((post, index) => {
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
      )}
    </Container>
  );
}