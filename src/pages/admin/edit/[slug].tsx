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
    description: "",
    coverImage: "",
    html: "",
    tags: "",
    sideNotes: "[]",
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
        const item = Array.isArray(data)
          ? data.find((p) => p.slug === slug) || data[0]
          : data;

        setPost({
          pk: item.pk || "",
          title: item.title || "",
          category: item.category || "",
          description: item.description || "",
          coverImage: item.coverImage || "",
          html: item.html || "",
          tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
          sideNotes: JSON.stringify(item.sideNotes || [], null, 2),
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

      let parsedSideNotes = [];
      try {
        parsedSideNotes = JSON.parse(post.sideNotes || "[]");
        if (!Array.isArray(parsedSideNotes)) {
          alert("Side Notes must be a JSON array.");
          setLoading(false);
          return;
        }
      } catch (err) {
        alert("Side Notes JSON is invalid.");
        setLoading(false);
        return;
      }

      const payload = {
        pk: isNew ? `POST#${new Date().toISOString().slice(0, 7)}` : post.pk,
        slug: isNew
          ? post.title.toLowerCase().trim().replace(/\s+/g, "-")
          : slug,
        title: post.title,
        category: post.category,
        description: post.description,
        coverImage: post.coverImage,
        date: new Date().toISOString(),
        html: post.html,
        tags: post.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        sideNotes: parsedSideNotes,
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
        label="Description"
        fullWidth
        multiline
        minRows={3}
        sx={{ mb: 2 }}
        value={post.description}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
      />

      <TextField
        label="Cover Image URL"
        fullWidth
        sx={{ mb: 2 }}
        value={post.coverImage}
        onChange={(e) => setPost({ ...post, coverImage: e.target.value })}
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
        sx={{ mb: 2 }}
        value={post.tags}
        onChange={(e) => setPost({ ...post, tags: e.target.value })}
      />

      <TextField
        label="Side Notes JSON"
        fullWidth
        multiline
        minRows={8}
        sx={{ mb: 3 }}
        value={post.sideNotes}
        onChange={(e) => setPost({ ...post, sideNotes: e.target.value })}
        helperText='Example: [{"targetId":"summary","title":"Summary note","content":"This section is intentionally spoiler-light."}]'
      />

      <Button variant="contained" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "💾 Save"}
      </Button>
    </Container>
  );
}