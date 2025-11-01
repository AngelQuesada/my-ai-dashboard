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

  // 3. Actualizamos la configuración en Supabase
  const { error } = await supabase.from('boxes').upsert({
    id: 'famosos-granada',
    cron_config: cronConfig,
    email_instructions: emailInstructions,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 4. Devolvemos una respuesta de éxito
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
