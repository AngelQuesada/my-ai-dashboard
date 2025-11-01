import { createClient } from '@/utils/supabase';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';

// Esta es la página principal de la aplicación.
// Comprueba si el usuario está autenticado y, en caso contrario, lo redirige a la página de login.
export default async function Home() {
  const supabase = createClient();

  // Obtenemos el usuario de la sesión de Supabase.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si no hay usuario, lo redirigimos a la página de login.
  if (!user) {
    return redirect('/login');
  }

  // Si el usuario está autenticado, mostramos el header y el dashboard.
  return (
    <main>
      <Header />
      <Dashboard />
    </main>
  );
}
