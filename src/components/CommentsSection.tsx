"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Comment {
  pk: string;
  sk: string;
  name: string;
  text: string;
  createdAt?: string;
}

export default function CommentsSection({
  slug,
  isAdmin = false,
}: {
  slug: string;
  isAdmin?: boolean;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const API = process.env.NEXT_PUBLIC_COMMENTS_API_URL;

  async function loadComments() {
    if (!API || !slug) return;

    try {
      setLoadingComments(true);
      setError("");

      const res = await fetch(`${API}/comments/${slug}`);
      const raw = await res.text();

      if (!res.ok) {
        throw new Error(`Failed to load comments: ${res.status} ${raw}`);
      }

      const data = raw ? JSON.parse(raw) : [];
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load comments:", err);
      setError("Could not load comments.");
    } finally {
      setLoadingComments(false);
    }
  }

  useEffect(() => {
    if (slug) loadComments();
  }, [slug]);

  async function handleSubmit() {
    if (!API) {
      setSubmitError("Comments API URL is missing.");
      return;
    }

    if (!name.trim() || !text.trim()) {
      setSubmitError("Please fill in both name and comment.");
      return;
    }

    try {
      setLoading(true);
      setSubmitError("");

      const res = await fetch(`${API}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postSlug: slug,
          name: name.trim(),
          text: text.trim(),
        }),
      });

      const raw = await res.text();

      if (!res.ok) {
        throw new Error(`Failed: ${res.status} ${raw}`);
      }

      setName("");
      setText("");
      await loadComments();
    } catch (err) {
      console.error("Failed to submit comment:", err);
      setSubmitError(err instanceof Error ? err.message : "Failed to post comment.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteComment(commentSk: string) {
    if (!API) return;

    const confirmed = window.confirm("Delete this comment?");
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${API}/comments/${slug}?sk=${encodeURIComponent(commentSk)}`,
        {
          method: "DELETE",
          headers: {
            "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "",
          },
        }
      );

      const raw = await res.text();

      if (!res.ok) {
        throw new Error(`Failed to delete: ${res.status} ${raw}`);
      }

      setComments((prev) => prev.filter((comment) => comment.sk !== commentSk));
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert(err instanceof Error ? err.message : "Failed to delete comment.");
    }
  }

  const formatDate = (value?: string) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
  }, [comments]);

  return (
    <Box mt={{ xs: 6, md: 8 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.9rem", md: "2.2rem" },
              fontWeight: 700,
              color: "#0F172A",
              mb: 0.5,
            }}
          >
            Comments
          </Typography>
          <Typography
            sx={{
              color: "#64748B",
              fontSize: "1rem",
            }}
          >
            Little thoughts from readers.
          </Typography>
        </Box>

        <Box
          sx={{
            px: 1.6,
            py: 0.7,
            bgcolor: "#EEF5FF",
            color: "#356AA3",
            fontSize: "0.92rem",
            fontWeight: 600,
          }}
        >
          {sortedComments.length} {sortedComments.length === 1 ? "comment" : "comments"}
        </Box>
      </Box>

      <Divider sx={{ mb: 4, opacity: 0.55 }} />

      <Paper
        sx={{
          p: { xs: 2, md: 2.5 },
          mb: 4,
          bgcolor: "#FFFFFF",
          border: "1px solid rgba(148, 163, 184, 0.14)",
          boxShadow: "0 10px 24px rgba(15, 23, 42, 0.05)",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: "#0F172A",
            fontSize: "1.08rem",
            mb: 2,
          }}
        >
          Leave a comment
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#F8FBFF",
              },
            }}
          />

          <TextField
            label="Write something kind..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            multiline
            minRows={4}
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#F8FBFF",
                alignItems: "flex-start",
              },
            }}
          />

          {submitError && (
            <Typography sx={{ color: "#DC2626", fontSize: "0.94rem" }}>
              {submitError}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                px: 2.6,
                py: 1.1,
                fontWeight: 700,
                boxShadow: "0 8px 20px rgba(77,155,230,0.18)",
              }}
            >
              {loading ? "Posting..." : "Post comment"}
            </Button>
          </Box>
        </Stack>
      </Paper>

      {error && (
        <Typography sx={{ color: "#DC2626", mb: 3 }}>
          {error}
        </Typography>
      )}

      {loadingComments ? (
        <Typography sx={{ color: "#64748B" }}>Loading comments...</Typography>
      ) : sortedComments.length === 0 ? (
        <Paper
          sx={{
            p: 3,
            bgcolor: "#F8FBFF",
            border: "1px solid rgba(148, 163, 184, 0.14)",
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.04)",
          }}
        >
          <Typography sx={{ color: "#64748B" }}>
            No comments yet. Be the first one.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2.2}>
          {sortedComments.map((comment) => (
            <Paper
              key={comment.sk}
              sx={{
                p: { xs: 2, md: 2.2 },
                bgcolor: "#FCFDFE",
                border: "1px solid rgba(191, 215, 245, 0.45)",
                boxShadow: "0 8px 18px rgba(15, 23, 42, 0.04)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.6,
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    fontSize: "1rem",
                    fontWeight: 700,
                    bgcolor: "#DCEEFF",
                    color: "#2D5F98",
                    boxShadow: "inset 0 0 0 1px rgba(77,155,230,0.16)",
                  }}
                >
                  {(comment.name || "?").trim().charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1.5,
                      flexWrap: "wrap",
                      mb: 0.7,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#0F172A",
                      }}
                    >
                      {comment.name}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {formatDate(comment.createdAt) && (
                        <Typography
                          sx={{
                            fontSize: "0.86rem",
                            color: "#7C8CA5",
                            bgcolor: "#F3F8FE",
                            px: 1.1,
                            py: 0.45,
                            lineHeight: 1,
                          }}
                        >
                          {formatDate(comment.createdAt)}
                        </Typography>
                      )}

                      {isAdmin && (
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteComment(comment.sk)}
                          sx={{
                            color: "#DC2626",
                            bgcolor: "#FEF2F2",
                            border: "1px solid rgba(220, 38, 38, 0.12)",
                            "&:hover": {
                              bgcolor: "#FEE2E2",
                            },
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      color: "#334155",
                      fontSize: "0.98rem",
                      lineHeight: 1.75,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {comment.text}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}