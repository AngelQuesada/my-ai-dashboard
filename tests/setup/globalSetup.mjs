// tests/setup/globalSetup.mjs
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.testing.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async () => {
  console.log('Setting up test database...');
  // Crear la tabla "boxes"
  await supabase.rpc('query', {
    sql: `
      CREATE TABLE boxes (
        id TEXT PRIMARY KEY,
        cron_config JSONB,
        email_instructions TEXT
      );
    `,
  });
  // Crear la tabla "resultados_famosos_granada"
  await supabase.rpc('query', {
    sql: `
      CREATE TABLE resultados_famosos_granada (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        nombre_evento TEXT,
        descripcion TEXT,
        localizacion TEXT,
        famoso_principal TEXT,
        metodo_contacto TEXT
      );
    `,
  });
  console.log('Test database setup complete.');
};
