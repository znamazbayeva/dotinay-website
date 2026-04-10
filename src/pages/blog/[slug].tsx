import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CommentsSection from "../../components/CommentsSection";
import {
  Container,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion, AnimatePresence } from "framer-motion";

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

type HeadingItem = {
  id: string;
  text: string;
};

type SideNote = {
  targetId: string;
  title?: string;
  content: string;
};

type OpenNoteState = {
  note: SideNote;
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  markerNumber: number;
} | null;

export default function BlogPostPage({
  initialPost,
  slug,
}: {
  initialPost: any;
  slug: string;
}) {
  const router = useRouter();
  const articleRef = useRef<HTMLDivElement | null>(null);

  const [post] = useState(initialPost);
  const [isAdmin, setIsAdmin] = useState(false);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [openNote, setOpenNote] = useState<OpenNoteState>(null);
  const [popupStyle, setPopupStyle] = useState<{
    top: number;
    left: number;
    maxWidth: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    }
  }, []);

  // Replace this with post.sideNotes later
const sideNotes: SideNote[] = Array.isArray(post?.sideNotes)
  ? post.sideNotes
  : [];
  
  const sideNotesByTarget = useMemo(() => {
    const map = new Map<string, SideNote[]>();
    sideNotes.forEach((note) => {
      const existing = map.get(note.targetId) || [];
      existing.push(note);
      map.set(note.targetId, existing);
    });
    return map;
  }, [sideNotes]);

  useEffect(() => {
    if (!articleRef.current) return;

    const article = articleRef.current;

    const headingEls = Array.from(
      article.querySelectorAll("h2, h3")
    ) as HTMLHeadingElement[];

    const targetEls = Array.from(
      article.querySelectorAll("h2, h3, p[id], blockquote[id]")
    ) as HTMLElement[];

    const mapped = headingEls.map((el, index) => {
      if (!el.id) {
        el.id =
          el.textContent
            ?.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-") || `section-${index}`;
      }

      return {
        id: el.id,
        text: el.textContent || `Section ${index + 1}`,
      };
    });

    setHeadings(mapped);

    const observers: IntersectionObserver[] = [];

    headingEls.forEach((el) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveHeading(el.id);
          }
        },
        {
          rootMargin: "-20% 0px -65% 0px",
          threshold: 0.1,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    targetEls.forEach((el) => {
      const notes = sideNotesByTarget.get(el.id);
      if (!notes || notes.length === 0) return;

      if (el.dataset.noteInjected === "true") return;

      const wrapper = document.createElement("span");
      wrapper.className = "note-marker-group";

      notes.forEach((note, idx) => {
        const marker = document.createElement("button");
        marker.type = "button";
        marker.className = "note-marker";
        marker.textContent = String(idx + 1);
        marker.setAttribute(
          "aria-label",
          note.title ? `Open note ${idx + 1}: ${note.title}` : `Open note ${idx + 1}`
        );

        marker.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();

          const rect = marker.getBoundingClientRect();

          const event = new CustomEvent("open-note-popup", {
            detail: {
              note,
              rect: {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
              },
              markerNumber: idx + 1,
            },
          });

          window.dispatchEvent(event);
        };

        wrapper.appendChild(marker);
      });

      el.appendChild(wrapper);
      el.dataset.noteInjected = "true";
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [post?.html, sideNotesByTarget]);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<OpenNoteState>;
      setOpenNote(customEvent.detail);
    };

    window.addEventListener("open-note-popup", handler as EventListener);

    return () => {
      window.removeEventListener("open-note-popup", handler as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!openNote) {
      setPopupStyle(null);
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    const popupWidth = Math.min(360, width - 32);
    const gap = 12;

    let left = openNote.rect.left + openNote.rect.width + gap;
    let top = openNote.rect.top - 12;

    const wouldOverflowRight = left + popupWidth > width - 16;

    if (wouldOverflowRight) {
      left = Math.max(16, openNote.rect.left - popupWidth - gap);
    }

    if (left < 16) left = 16;
    if (top < 16) top = 16;
    if (top > height - 220) top = height - 220;

    setPopupStyle({
      top,
      left,
      maxWidth: popupWidth,
    });
  }, [openNote]);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenNote(null);
    };

    const closeOnResize = () => setOpenNote(null);

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnResize);
    window.addEventListener("scroll", closeOnResize, true);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnResize);
      window.removeEventListener("scroll", closeOnResize, true);
    };
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

  const activeNote = useMemo(() => {
    return sideNotes.find((note) => note.targetId === activeHeading) || null;
  }, [sideNotes, activeHeading]);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description || post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || post.title} />
        <meta property="og:url" content={`https://www.dotinay.com/blog/${slug}`} />
        <meta property="og:site_name" content="Dotinay" />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={post.coverImage || "https://www.dotinay.com/default-og.jpg"}
        />
      </Head>

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          py: { xs: 4, md: 5 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            maxWidth: "1320px",
            mx: "auto",
          }}
        >
          <motion.div whileHover={{ x: -3 }}>
            <Button
              onClick={() => router.push("/blog")}
              startIcon={<ArrowBackIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "#0F172A",
                px: 1,
                mb: { xs: 2, md: 1 },
                "&:hover": {
                  color: "#000000",
                  bgcolor: "transparent",
                },
              }}
            >
              Back to blog
            </Button>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "250px minmax(0, 760px) 250px",
              },
              columnGap: { xs: 0, lg: 4 },
              rowGap: { xs: 4, lg: 0 },
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            {/* LEFT TOC */}
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                position: "sticky",
                top: 84,
                alignSelf: "start",
                gridColumn: "1",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "28px",
                  border: "1px solid #E5E7EB",
                  bgcolor: "#FFFFFF",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
                }}
              >
                {/* <AnimatePresence mode="wait">
                  {activeNote && (
                    <motion.div
                      key={activeNote.targetId}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "16px",
                          bgcolor: "#FFFFFF",
                          border: "1px solid #E2E8F0",
                          mb: 3,
                        }}
                      >
                        {activeNote.title && (
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: "#0F172A",
                              mb: 1,
                            }}
                          >
                            {activeNote.title}
                          </Typography>
                        )}
                        <Typography
                          sx={{
                            color: "#1E293B",
                            lineHeight: 1.8,
                            fontSize: "0.98rem",
                          }}
                        >
                          {activeNote.content}
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence> */}

                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#64748B",
                    mb: 1.5,
                  }}
                >
                  On this page
                </Typography>

                <Stack spacing={1}>
                  {headings.map((heading) => (
                    <Box
                      key={heading.id}
                      component="button"
                      onClick={() => {
                        const el = document.getElementById(heading.id);
                        if (!el) return;
                        const y =
                          el.getBoundingClientRect().top + window.scrollY - 110;
                        window.scrollTo({
                          top: y,
                          behavior: "smooth",
                        });
                      }}
                      sx={{
                        appearance: "none",
                        background: "none",
                        border: "none",
                        padding: 0,
                        margin: 0,
                        textAlign: "left",
                        cursor: "pointer",
                        textDecoration: "none",
                        color:
                          activeHeading === heading.id ? "#0F172A" : "#64748B",
                        fontWeight: activeHeading === heading.id ? 700 : 500,
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        transition: "all 0.2s ease",
                        fontFamily: "inherit",
                        "&:hover": {
                          color: "#0F172A",
                          transform: "translateX(2px)",
                        },
                      }}
                    >
                      {heading.text}
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>

            {/* CENTER ARTICLE */}
            <Box
              sx={{
                gridColumn: { xs: "1", lg: "2" },
                width: "100%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "28px",
                  px: { xs: 3, sm: 4, md: 5 },
                  py: { xs: 3, sm: 4, md: 5 },
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
                }}
              >
                <Box textAlign="center" mb={4}>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    mb={2}
                    sx={{
                      fontSize: { xs: "2rem", md: "2.8rem" },
                      color: "#0F172A",
                      lineHeight: 1.2,
                      mx: "auto",
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    mb={1}
                    flexWrap="wrap"
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
                  ref={articleRef}
                  sx={{
                    fontSize: { xs: "1.08rem", md: "1.16rem" },
                    lineHeight: 2,
                    color: "#0F172A",
                    fontWeight: 500,
                    "& h1, & h2, & h3": {
                      color: "#0B132B",
                      fontWeight: 800,
                      scrollMarginTop: "120px",
                    },
                    "& h1": {
                      mt: 4,
                      mb: 2,
                    },
                    "& h2": {
                      mt: 6,
                      mb: 2,
                      fontSize: "1.8rem",
                      lineHeight: 1.3,
                    },
                    "& h3": {
                      mt: 4,
                      mb: 1.5,
                      fontSize: "1.32rem",
                      lineHeight: 1.4,
                    },
                    "& p": {
                      mb: 2.3,
                      color: "#111827",
                    },
                    "& ul, & ol": {
                      pl: 4,
                      mb: 2.5,
                    },
                    "& li": {
                      mb: 1,
                      color: "#111827",
                    },
                    "& a": {
                      color: "#0284C7",
                      textDecoration: "underline",
                      "&:hover": { color: "#0369A1" },
                    },
                    "& blockquote": {
                      borderLeft: "3px solid #CBD5E1",
                      pl: 2,
                      ml: 0,
                      my: 3,
                      color: "#475569",
                      fontStyle: "italic",
                    },
                    "& img": {
                      width: "100%",
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "22px",
                      display: "block",
                      my: 3,
                    },
                    "& .note-marker-group": {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      ml: 0.5,
                      verticalAlign: "middle",
                    },
                    "& .note-marker": {
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "1.8rem",
                      height: "1.8rem",
                      border: "none",
                      borderRadius: "999px",
                      backgroundColor: "#BFDBFE",
                      color: "#1E3A8A",
                      fontSize: "0.88rem",
                      fontWeight: 800,
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(77, 155, 230, 0.18)",
                      transition: "transform 0.15s ease, box-shadow 0.15s ease",
                      "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 6px 14px rgba(77, 155, 230, 0.22)",
                      },
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </Box>

              <Box sx={{ mt: 6 }}>
                <CommentsSection slug={slug} isAdmin={isAdmin} />
              </Box>
            </Box>

            {/* RIGHT SPACER */}
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                gridColumn: "3",
              }}
            />
          </Box>
        </Box>
      </Container>

      <AnimatePresence>
        {openNote && popupStyle && (
          <>
            <Box
              onClick={() => setOpenNote(null)}
              sx={{
                position: "fixed",
                inset: 0,
                bgcolor: "rgba(15, 23, 42, 0.08)",
                zIndex: 1400,
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 4 }}
              transition={{ duration: 0.18 }}
              style={{
                position: "fixed",
                top: popupStyle.top,
                left: popupStyle.left,
                width: popupStyle.maxWidth,
                zIndex: 1500,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: "22px",
                  bgcolor: "#DCEFFE",
                  border: "1px solid #BFDBFE",
                  boxShadow: "0 18px 42px rgba(15, 23, 42, 0.18)",
                }}
              >
                <Box
                  display="flex"
                  alignItems="start"
                  justifyContent="space-between"
                  gap={2}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "1.8rem",
                        height: "1.8rem",
                        borderRadius: "999px",
                        backgroundColor: "#BFDBFE",
                        color: "#1E3A8A",
                        fontSize: "0.88rem",
                        fontWeight: 800,
                        mb: 1,
                      }}
                    >
                      {openNote.markerNumber}
                    </Box>

                    {openNote.note.title && (
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#1E3A8A",
                          mb: 0.75,
                          fontSize: "1rem",
                          lineHeight: 1.4,
                        }}
                      >
                        {openNote.note.title}
                      </Typography>
                    )}

                    <Typography
                      sx={{
                        color: "#1E293B",
                        fontSize: "1rem",
                        lineHeight: 1.75,
                      }}
                    >
                      {openNote.note.content}
                    </Typography>
                  </Box>

                  <Button
                    onClick={() => setOpenNote(null)}
                    sx={{
                      minWidth: 0,
                      p: 0,
                      color: "#1E3A8A",
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}