// tests/setup/globalTeardown.mjs
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.testing.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async () => {
  console.log('Tearing down test database...');
  // Eliminar la tabla "boxes"
  await supabase.rpc('query', {
    sql: 'DROP TABLE boxes;',
  });
  // Eliminar la tabla "resultados_famosos_granada"
  await supabase.rpc('query', {
    sql: 'DROP TABLE resultados_famosos_granada;',
  });
  console.log('Test database teardown complete.');
};
