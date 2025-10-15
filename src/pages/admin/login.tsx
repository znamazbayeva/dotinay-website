"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Typography } from "@mui/material";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Wrong password!");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4" mb={3}>
        Admin Login
      </Typography>
      <TextField
        fullWidth
        type="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        fullWidth
        sx={{ mt: 3, py: 1.3 }}
        variant="contained"
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
}
