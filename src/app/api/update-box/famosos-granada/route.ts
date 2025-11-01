import { createClient } from '@/utils/supabase';

// Esta es la ruta de la API para actualizar la configuración de la caja "Búsqueda de famosos en Granada".
export async function POST(request: Request) {
  const supabase = createClient();

  // 1. Validamos al usuario
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2. Obtenemos los datos de la solicitud
  const { cronConfig, emailInstructions } = await request.json();

  // 3. Actualizamos la configuración en Supabase (marcador de posición)
  // En una aplicación real, aquí actualizaríamos la tabla "boxes" con la nueva configuración.
  console.log('Cron config:', cronConfig);
  console.log('Email instructions:', emailInstructions);

  // 4. Devolvemos una respuesta de éxito
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
