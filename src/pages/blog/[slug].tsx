import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CommentsSection from "../../components/CommentsSection";
import {
  Container,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Stack,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

export async function getServerSideProps(context: any) {
  const { slug } = context.params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`);
    if (!res.ok) {
      return { notFound: true };
    }

    const data = await res.json();
    const post = Array.isArray(data)
      ? data.find((p: any) => p.slug === slug)
      : data;

    if (!post || !post.title) {
      return { notFound: true };
    }

    return {
      props: {
        initialPost: post,
        slug,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function BlogPostPage({
  initialPost,
  slug,
}: {
  initialPost: any;
  slug: string;
}) {
  const router = useRouter();

  const [post, setPost] = useState(initialPost);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    }
  }, []);

  const formattedDate = post?.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  if (!post?.title) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h5" color="text.secondary" align="center">
          Post not found.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={post.description || post.title}
        />

        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.description || post.title}
        />
        <meta
          property="og:url"
          content={`https://www.dotinay.com/blog/${slug}`}
        />
        <meta property="og:site_name" content="Dotinay" />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={
            post.coverImage ||
            "https://www.dotinay.com/default-og.jpg"
          }
        />
      </Head>

      <Container
        maxWidth="md"
        sx={{
          py: { xs: 8, md: 10 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <motion.div whileHover={{ x: -3 }}>
          <Button
            onClick={() => router.push("/blog")}
            startIcon={<ArrowBackIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              color: "#64748B",
              px: 1,
              "&:hover": {
                color: "#0F172A",
                bgcolor: "transparent",
              },
            }}
          >
            Back to blog
          </Button>
        </motion.div>

        <Box textAlign="center" mb={0}>
          <Typography
            variant="h3"
            fontWeight={700}
            mb={2}
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              color: "#0F172A",
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            mb={3}
          >
            {post.category && (
              <Chip
                component={Link}
                href={`/blog?category=${encodeURIComponent(post.category)}`}
                clickable
                label={post.category}
                size="small"
                sx={{
                  bgcolor: "#E0F2FE",
                  color: "#0369A1",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  px: 1.5,
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#BAE6FD",
                  },
                }}
              />
            )}

            {formattedDate && (
              <Typography
                variant="subtitle1"
                color="#64748B"
                sx={{ fontSize: "1rem", fontWeight: 500 }}
              >
                {formattedDate}
              </Typography>
            )}
          </Stack>
        </Box>

        <Box
          sx={{
            fontSize: { xs: "1.15rem", md: "1.25rem" },
            lineHeight: 1.9,
            color: "#1E293B",
            "& h1, & h2, & h3": {
              color: "#0F172A",
              fontWeight: 700,
              mt: 2,
              mb: 0,
            },
            "& h2": { fontSize: "1.8rem" },
            "& p": { mb: 0 },
            "& ul, & ol": { pl: 4, mb: 0 },
            "& a": {
              color: "#0284C7",
              textDecoration: "underline",
              "&:hover": { color: "#0369A1" },
            },
          }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <CommentsSection slug={slug} isAdmin={isAdmin} />
      </Container>
    </>
  );
}