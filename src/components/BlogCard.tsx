"use client";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  desc: string;
  slug: string;
  category?: string;
  date?: string;
}

export default function BlogCard({
  title,
  desc,
  slug,
  category = "Article",
  date = "2025-01-01",
}: BlogCardProps) {
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
          borderRadius: "28px",
          backgroundColor: "#FFFFFF", // TRUE WHITE card
          textDecoration: "none",
          height: "100%",
          transition: "all 0.3s ease",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Category + Date */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Chip
              label={category}
              size="small"
              sx={{
                fontSize: "1.00rem",
                fontWeight: 500,
                bgcolor: "#E0F2FE",
                color: "#0369A1",
                borderRadius: "9999px",
                px: 1.5,
                boxShadow: "0 2px 6px rgba(3,105,161,0.1)",
              }}
            />
            <Typography
              variant="caption"
              color="#94A3B8"
              fontWeight={500}
              sx={{ fontSize: "1.00rem" }}
            >
              {date}
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{
              mb: 1,
              color: "#1E293B",
              lineHeight: 1.5,
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: "#475569",
              lineHeight: 1.7,
              fontSize: "1.2rem",
            }}
          >
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
