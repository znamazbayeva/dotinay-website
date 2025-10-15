import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4D9BE6", // pastel blue
    },
    secondary: {
      main: "#F2B880", // warm accent
    },
    background: {
      default: "#EAF2FB", // soft pastel background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1B1F23",
      secondary: "#475569",
    },
  },
  typography: {
    fontFamily: "inherit",

    // Headings
    h1: {
      fontSize: "4.5rem", // 72px — hero size
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.25,
    },
    h2: {
      fontSize: "3.2rem", // 51px
      fontWeight: 600,
      letterSpacing: "-0.02em",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "2.4rem", // 38px
      fontWeight: 600,
      letterSpacing: "-0.015em",
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.9rem",
      fontWeight: 600,
      lineHeight: 1.45,
    },
    h5: {
      fontSize: "1.6rem",
      fontWeight: 500,
      color: "#475569",
    },
    h6: {
      fontSize: "1.3rem",
      fontWeight: 500,
      color: "#64748B",
    },

    // Body text
    body1: {
      fontSize: "1.35rem", // ~22px
      lineHeight: 2.0,
      color: "#334155",
      letterSpacing: "0.015em",
    },
    body2: {
      fontSize: "1.15rem", // ~18px
      lineHeight: 1.9,
      color: "#475569",
      letterSpacing: "0.01em",
    },

    // Buttons
    button: {
      fontSize: "1.1rem",
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.04em",
    },
  },
  shape: {
    borderRadius: 18,
  },
  shadows: Array(25).fill("none") as any,
});

export default theme;
