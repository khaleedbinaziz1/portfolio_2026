import { IBM_Plex_Mono, IBM_Plex_Serif, IBM_Plex_Sans } from 'next/font/google';

// Shared across all khb- sections (Hero, About, ...). Import these instead of
// calling next/font/google again in every component.
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--khb-font-mono',
});

export const plexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--khb-font-serif',
});

export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--khb-font-sans',
});