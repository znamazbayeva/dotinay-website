"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Stack, Paper, Box } from "@mui/material";

export default function Dashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin/login");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const handleDelete = async (slug: string, pk: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}?pk=${encodeURIComponent(pk)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "",
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Delete failed:", res.status, text);
        alert(`Delete failed: ${res.status} ${text}`);
        return;
      }

      setPosts((prev) => prev.filter((p) => !(p.slug === slug && p.pk === pk)));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting the post.");
    }
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight={700} mb={4}>
        Admin Dashboard
      </Typography>
      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => router.push("/admin/edit/new")}
      >
        ➕ Create New Post
      </Button>

      <Stack spacing={2}>
        {posts.map((post, i) => (
          <Paper
            key={i}
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {post.category}
              </Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Button onClick={() => router.push(`/admin/edit/${post.slug}`)}>
                Edit
              </Button>
              <Button color="error" onClick={() => handleDelete(post.slug, post.pk)}>
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
