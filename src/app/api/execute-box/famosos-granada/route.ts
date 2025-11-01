import { createClient } from '@/utils/supabase';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Esta es la ruta de la API para ejecutar la caja "Búsqueda de famosos en Granada".
// Se puede llamar manually desde el botón "Ejecutar" o mediante un trabajo cron.
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

  // 2. Llamamos a la API de Gemini
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Busca eventos futuros (conciertos, espectáculos, etc.) en la provincia de Granada, España.
    Identifica a las personas famosas que participarán en dichos eventos.
    Por cada evento, genera un objeto JSON con la siguiente estructura:
    {
      "nombre_evento": "string",
      "descripcion": "string",
      "localizacion": "string",
      "famoso_principal": "string (con enlace a Wikipedia/perfil)",
      "metodo_contacto": "string (el mejor método PÚBLICO disponible, priorizando mánager/agencia sobre taquilla general, y especificando qué es)"
    }
    Devuelve un array de objetos JSON.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const geminiResponse = JSON.parse(text);

    // 3. Guardamos los resultados en Supabase
    const { error } = await supabase
      .from('resultados_famosos_granada')
      .insert(geminiResponse);

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
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al llamar a la API de Gemini' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
