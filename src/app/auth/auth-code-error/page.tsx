import { Box, Typography } from '@mui/material';

// Esta es la página de error de autenticación.
// Se muestra cuando hay un error al intercambiar el código de autenticación por una sesión.
export default function AuthCodeError() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Authentication Error
      </Typography>
      <Typography>
        There was an error authenticating your account. Please try again.
      </Typography>
    </Box>
  );
}
