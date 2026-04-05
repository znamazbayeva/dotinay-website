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
    pk: "",
    title: "",
    category: "",
    html: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin/login");
      return;
    }

    async function loadPost() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`);

        if (!res.ok) {
          throw new Error(`Failed to load post: ${res.status}`);
        }

        const data = await res.json();
        const item = Array.isArray(data) ? data[0] : data;

        setPost({
          pk: item.pk || "",
          title: item.title || "",
          category: item.category || "",
          html: item.html || "",
          tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
        });
      } catch (err) {
        console.error("Failed to load post:", err);
      }
    }

    if (!isNew) {
      loadPost();
    }
  }, [slug, isNew, router]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        pk: isNew ? `POST#${new Date().toISOString().slice(0, 7)}` : post.pk,
        slug: isNew
          ? post.title.toLowerCase().trim().replace(/\s+/g, "-")
          : slug,
        title: post.title,
        category: post.category,
        date: new Date().toISOString(),
        html: post.html,
        tags: post.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Save failed:", res.status, text);
        alert(`Save failed: ${res.status}`);
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Error saving post:", err);
      alert("Something went wrong while saving the post.");
    } finally {
      setLoading(false);
    }
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
        minRows={8}
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

      <Button variant="contained" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "💾 Save"}
      </Button>
    </Container>
  );
}