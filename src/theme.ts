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
  default: "#EEF4FA",
  paper: "#FFFFFF",
},
text: {
  primary: "#0F172A",
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
  fontSize: "1.28rem",
  lineHeight: 1.9,
  color: "#1E293B",
  letterSpacing: "0.01em",
},
body2: {
  fontSize: "1.08rem",
  lineHeight: 1.8,
  color: "#475569",
  letterSpacing: "0.008em",
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
   components: {
  MuiCssBaseline: {
    
    styleOverrides: {
      html: {
  scrollBehavior: "smooth",
},
      blockquote: {
        margin: "28px 0",
        padding: "18px 22px",
        background: "#EEF5FF",
        borderLeft: "4px solid #4D9BE6",
        borderRadius: "12px",
        color: "#334155",
        fontStyle: "normal",
        fontSize: "1.12rem",
        lineHeight: 1.85,
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
      },

      "blockquote p": {
        margin: 0,
      },

      "blockquote::before": {
        content: 'none',
      },
    },
  },
},
});

export default theme;
