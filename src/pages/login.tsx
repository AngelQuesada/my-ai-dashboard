import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Box, Button, TextField, Typography } from '@mui/material';

// Esta es la página de login.
// Permite al usuario iniciar sesión mediante un enlace mágico.
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // Creamos un cliente de Supabase para el navegador.
  const supabase = createBrowserSupabaseClient();

  // Esta función se ejecuta cuando el usuario envía el formulario.
  // Llama a la función de Supabase para enviar el enlace mágico.
  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setSubmitted(true);
  };

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
        Login
      </Typography>
      {/* // Si el formulario se ha enviado, mostramos un mensaje de confirmación. */}
      {submitted ? (
        <Typography>Please check your email for the magic link.</Typography>
      ) : (
        // Si no, mostramos el formulario.
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="contained">
            Send Magic Link
          </Button>
        </Box>
      )}
    </Box>
  );
}
