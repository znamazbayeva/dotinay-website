import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Navbar() {
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={700} color="primary">Dotinay</Typography>
        <div>
          {['/', '/about', '/blog'].map((path) => (
            <Button key={path} component={Link} href={path} sx={{ color: 'text.primary', mx: 1 }}>
              {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
            </Button>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
}