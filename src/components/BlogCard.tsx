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
  // Format date if exists
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
    >
      <Card
        component={Link}
        href={`/blog/${slug}`}
        elevation={0}
        sx={{
          borderRadius: "20px",
          backgroundColor: "#fff",
          textDecoration: "none",
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          height: "100%",
          "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.1)" },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Category + Date */}
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
            {formattedDate && (
              <Typography variant="caption" color="#94A3B8" fontWeight={500}>
                {formattedDate}
              </Typography>
            )}
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 1, color: "#1E293B", lineHeight: 1.4 }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{ color: "#475569", lineHeight: 1.7, fontSize: "1rem" }}
          >
            {desc || "Click to read more..."}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
