"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Stack,
} from "@mui/material";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}?pk=POST#2025-10`
        );
        const data = await res.json();

        const first = Array.isArray(data) ? data[0] : data;
        setPost(first || null);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post?.title) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h5" color="text.secondary" align="center">
          Post not found.
        </Typography>
      </Container>
    );
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 8, md: 10 },
        px: { xs: 2, sm: 4 },
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h3"
          fontWeight={700}
          mb={2}
          sx={{
            fontSize: { xs: "2rem", md: "2.6rem" }, // ✨ bigger main title
            color: "#0F172A",
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </Typography>

        {/* Category + Date */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mb={3}
        >
          {post.category && (
            <Chip
              label={post.category}
              size="small"
              sx={{
                bgcolor: "#E0F2FE",
                color: "#0369A1",
                fontWeight: 600,
                fontSize: "0.95rem",
                px: 1.5,
              }}
            />
          )}
          {formattedDate && (
            <Typography
              variant="subtitle1"
              color="#64748B"
              sx={{ fontSize: "1rem", fontWeight: 500 }}
            >
              {formattedDate}
            </Typography>
          )}
        </Stack>

        {/* Tags directly below category/date */}
        {post.tags && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            flexWrap="wrap"
          >
            {post.tags.map((tag: string) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: "#F1F5F9",
                  color: "#334155",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                }}
              />
            ))}
          </Stack>
        )}
      </Box>

      {/* HTML content */}
      <Box
        sx={{
          fontSize: { xs: "1.15rem", md: "1.25rem" }, // ✨ larger readable body
          lineHeight: 1.9,
          color: "#1E293B",
          "& h1, & h2, & h3": {
            color: "#0F172A",
            fontWeight: 700,
            mt: 5,
            mb: 2,
          },
          "& h2": { fontSize: "1.8rem" },
          "& p": { mb: 3 },
          "& ul, & ol": { pl: 4, mb: 3 },
          "& a": {
            color: "#0284C7",
            textDecoration: "underline",
            "&:hover": { color: "#0369A1" },
          },
        }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Container>
  );
}
