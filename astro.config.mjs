// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://cesarbugueno.dev',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [react(), sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-CL', en: 'en-US' } } })],
  vite: {
    plugins: [tailwindcss()],
  },
});
