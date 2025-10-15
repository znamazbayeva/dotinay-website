"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container, TextField, Button, Typography } from "@mui/material";

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const isNew = slug === "new";

  const [post, setPost] = useState({
    title: "",
    category: "",
    html: "",
    tags: "",
  });

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") router.push("/admin/login");

    if (!isNew) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}?pk=POST#2025-10`)
        .then((res) => res.json())
        .then((data) =>
          setPost({
            title: data.title.S,
            category: data.category.S,
            html: data.html.S,
            tags: data.tags.L.map((t: any) => t.S).join(", "),
          })
        );
    }
  }, [slug]);

  const handleSave = async () => {
    const newPost = {
      pk: `POST#${new Date().toISOString().slice(0, 7)}`,
      slug: isNew ? post.title.toLowerCase().replace(/\s+/g, "-") : slug,
      title: post.title,
      category: post.category,
      date: new Date().toISOString(),
      html: post.html,
      tags: post.tags.split(",").map((t) => t.trim()),
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY!,
      },
      body: JSON.stringify(newPost),
    });

    router.push("/admin/dashboard");
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        {isNew ? "Create Post" : "Edit Post"}
      </Typography>

      <TextField
        label="Title"
        fullWidth
        sx={{ mb: 2 }}
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <TextField
        label="Category"
        fullWidth
        sx={{ mb: 2 }}
        value={post.category}
        onChange={(e) => setPost({ ...post, category: e.target.value })}
      />
      <TextField
        label="HTML Content"
        fullWidth
        multiline
        minRows={6}
        sx={{ mb: 2 }}
        value={post.html}
        onChange={(e) => setPost({ ...post, html: e.target.value })}
      />
      <TextField
        label="Tags (comma-separated)"
        fullWidth
        sx={{ mb: 3 }}
        value={post.tags}
        onChange={(e) => setPost({ ...post, tags: e.target.value })}
      />
      <Button variant="contained" onClick={handleSave}>
        💾 Save
      </Button>
    </Container>
  );
}
