import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box sx={{ py: 3, textAlign: 'center', borderTop: '1px solid #e5e7eb', mt: 6 }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Dotinay
      </Typography>
    </Box>
  );
}
