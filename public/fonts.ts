import { Space_Grotesk, Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';

// Display / headings — bold, geometric, modern
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Body text — clean, legible, refined
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// Code / labels — monospace accents
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

// Serif accents — editorial emphasis
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

// Legacy aliases for components that haven't been updated yet
export const plexMono = jetbrainsMono;
export const plexSerif = playfair;
export const plexSans = inter;