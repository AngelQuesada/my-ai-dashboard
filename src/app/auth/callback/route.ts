import { createClient } from '@/utils/supabase'
import { NextResponse } from 'next/server'

// Esta es la ruta de callback de autenticación.
// Se ejecuta cuando el usuario hace clic en el enlace mágico.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // si "next" está en los parámetros, lo usamos como URL de redirección.
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    // Intercambiamos el código por una sesión.
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Si no hay error, redirigimos al usuario a la página principal.
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Si hay un error, redirigimos al usuario a una página de error.
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
