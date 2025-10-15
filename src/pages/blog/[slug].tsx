"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box, CircularProgress } from "@mui/material";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}?pk=POST#2025-10`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <CircularProgress sx={{ mt: 10, ml: "50%" }} />;

  if (!post) return <Typography>No post found.</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight={700} mb={2}>
        {post.title?.S}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        {post.date?.S} — {post.category?.S}
      </Typography>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 3,
          p: 4,
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
        dangerouslySetInnerHTML={{ __html: post.html?.S }}
      />
    </Container>
  );
}
