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

        // Backend returns array → take first element
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
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Header */}
<Box textAlign="center" mb={6}>
  <Typography variant="h3" fontWeight={700} mb={2}>
    {post.title}
  </Typography>

  {/* Category + Date */}
  <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    spacing={2}
    mb={2}
  >
    {post.category && (
      <Chip
        label={post.category}
        size="small"
        sx={{
          bgcolor: "#E0F2FE",
          color: "#0369A1",
          fontWeight: 500,
        }}
      />
    )}
    {formattedDate && (
      <Typography variant="subtitle2" color="text.secondary">
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
          }}
        />
      ))}
    </Stack>
  )}
</Box>

      {/* HTML content */}
      <Box
        sx={{
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: "#1E293B",
        }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Container>
  );
}
