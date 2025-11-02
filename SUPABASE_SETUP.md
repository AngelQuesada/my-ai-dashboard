# Supabase Setup Guide

This guide will walk you through the process of setting up a Supabase project for the My AI Dashboard application.

## 1. Create a New Supabase Project

1.  Go to [supabase.com](https://supabase.com/) and sign in.
2.  Click on "New project".
3.  Choose your organization and give your project a name (e.g., `my-ai-dashboard`).
4.  Generate a secure database password and save it in a safe place.
5.  Choose the region that is closest to you.
6.  Click on "Create new project".

## 2. Get Your Project URL and `anon` Key

1.  After your project is created, go to the "Project Settings" (the gear icon in the left sidebar).
2.  Click on "API".
3.  Under "Project API keys", you'll find your "Project URL" and your `anon` `public` key.
4.  You'll need these for your `.env.development.local` and `.env.testing.local` files.

## 3. Create the Database Tables

1.  Go to the "SQL Editor" in the left sidebar.
2.  Click on "New query".
3.  Copy and paste the following SQL script into the editor and click "Run".

```sql
-- Create the "boxes" table
CREATE TABLE boxes (
  id TEXT PRIMARY KEY,
  cron_config JSONB,
  email_instructions TEXT
);

-- Create the "resultados_famosos_granada" table
CREATE TABLE resultados_famosos_granada (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre_evento TEXT,
  descripcion TEXT,
  localizacion TEXT,
  famoso_principal TEXT,
  metodo_contacto TEXT
);
```

## 4. Configure Authentication

1.  Go to the "Authentication" section in the left sidebar.
2.  Click on "Providers".
3.  Enable the "Email" provider.
4.  Disable "Confirm email" for a simpler login experience.

## 5. Fill in Your Environment Variables

Now you can fill in the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` variables in your `.env.development.local` and `.env.testing.local` files with the values you got in step 2.

That's it! You should now be able to run the application and log in with a magic link.
