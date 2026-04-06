"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(148,163,184,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* ✨ Clickable animated logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                color: "#4D9BE6",
                cursor: "pointer",
                letterSpacing: "-0.02em",
                transition: "all 0.2s ease",
              }}
            >
              Dotinay ✨
            </Typography>
          </motion.div>
        </Link>

        {/* Navigation */}
        <div>
          {["/", "/about", "/cv", "/blog"].map((path) => (
            <Button
              key={path}
              component={Link}
              href={path}
              sx={{
                color: "text.primary",
                mx: 1,
                fontWeight: 500,
                position: "relative",
                overflow: "hidden",

                // ✨ underline animation
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "0%",
                  height: "2px",
                  bottom: 4,
                  left: 0,
                  bgcolor: "#4D9BE6",
                  transition: "width 0.3s ease",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              {path === "/"
                ? "Home"
                : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
            </Button>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
}