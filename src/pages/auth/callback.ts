import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export default async function handler(req) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createPagesServerClient({ req, res: new NextResponse() });
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
