import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import "./globals.css";


export const metadata: Metadata = {
  title: "My AI Dashboard",
  description: "Personal AI automation and query dashboard",
};

// Este es el layout principal de la aplicación.
// Envuelve todas las páginas con los proveedores de Material UI.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* // AppRouterCacheProvider es necesario para la integración de Material UI con Next.js App Router. */}
        <AppRouterCacheProvider>
          {/* // ThemeProvider aplica el tema de Material UI a toda la aplicación. */}
          <ThemeProvider theme={theme}>
            {/* // CssBaseline normaliza los estilos CSS. */}
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
