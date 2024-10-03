// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Astro Blog';
export const SITE_DESCRIPTION = 'Welcome to my website!';

interface ImportMetaEnv {
    readonly SUPABASE_URL: string
    readonly SUPABASE_ANON_KEY: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

