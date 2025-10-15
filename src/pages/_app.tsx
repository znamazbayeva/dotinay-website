import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "../theme";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IBM_Plex_Mono, Patrick_Hand } from "next/font/google";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
export default function MyApp({ Component, pageProps }: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box
         className={patrickHand.className}
          display="flex"
          flexDirection="column"
          minHeight="100vh"
          sx={{
            background: "#f9fafb",
            backgroundAttachment: "fixed",
          }}
        >
        <Navbar />
        <Box component="main" flexGrow={1}>
          <Component {...pageProps} />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
