"use client";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  desc?: string;
  slug: string;
  category?: string;
  date?: string;
}

export default function BlogCard({
  title,
  desc,
  slug,
  category = "Article",
  date,
}: BlogCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.35, ease: "easeOut" } }}
      style={{ display: "block" }}
    >
      {/* 👇 Use Link OUTSIDE the Card to avoid anchor affecting Paper */}
      <Link href={`/blog/${slug}`} style={{ textDecoration: "none", display: "block" }}>
        <Card
          elevation={0}
          sx={{
            display: "block",
            borderRadius: "20px",
            bgcolor: "#ffffff",
            backgroundImage: "none !important",   // kill MUI Paper overlay tint
            boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
            overflow: "hidden",
            isolation: "isolate",                  // prevent parent blending
          }}
        >
          <CardContent sx={{ pt: 2, pb: 2, px: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Chip
                label={category}
                size="small"
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  bgcolor: "#E0F2FE",
                  color: "#0369A1",
                  borderRadius: "9999px",
                  px: 1.5,
                }}
              />
              {!!formattedDate && (
                <Typography variant="caption" color="#94A3B8" fontWeight={500}>
                  {formattedDate}
                </Typography>
              )}
            </Box>

            <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: "#1E293B", lineHeight: 1.4 }}>
              {title}
            </Typography>

            <Typography variant="body2" sx={{ color: "#475569", lineHeight: 1.7, fontSize: "1rem" }}>
              {desc || "Click to read more..."}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
