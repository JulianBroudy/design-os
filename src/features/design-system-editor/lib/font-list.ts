/**
 * Curated list of popular Google Fonts for the design system editor.
 * Organized by category for the font picker UI.
 */

export interface FontOption {
  name: string
  category: 'sans-serif' | 'serif' | 'monospace' | 'display'
}

export const SANS_FONTS: FontOption[] = [
  { name: 'Inter', category: 'sans-serif' },
  { name: 'DM Sans', category: 'sans-serif' },
  { name: 'Plus Jakarta Sans', category: 'sans-serif' },
  { name: 'Geist', category: 'sans-serif' },
  { name: 'Nunito Sans', category: 'sans-serif' },
  { name: 'Open Sans', category: 'sans-serif' },
  { name: 'Roboto', category: 'sans-serif' },
  { name: 'Lato', category: 'sans-serif' },
  { name: 'Poppins', category: 'sans-serif' },
  { name: 'Montserrat', category: 'sans-serif' },
  { name: 'Work Sans', category: 'sans-serif' },
  { name: 'Outfit', category: 'sans-serif' },
  { name: 'Manrope', category: 'sans-serif' },
  { name: 'Space Grotesk', category: 'sans-serif' },
  { name: 'Sora', category: 'sans-serif' },
  { name: 'Figtree', category: 'sans-serif' },
  { name: 'Albert Sans', category: 'sans-serif' },
  { name: 'Source Sans 3', category: 'sans-serif' },
  { name: 'Noto Sans', category: 'sans-serif' },
  { name: 'Raleway', category: 'sans-serif' },
]

export const SERIF_FONTS: FontOption[] = [
  { name: 'Merriweather', category: 'serif' },
  { name: 'Lora', category: 'serif' },
  { name: 'Playfair Display', category: 'serif' },
  { name: 'Source Serif 4', category: 'serif' },
  { name: 'Libre Baskerville', category: 'serif' },
  { name: 'DM Serif Display', category: 'serif' },
  { name: 'Crimson Pro', category: 'serif' },
  { name: 'Bitter', category: 'serif' },
  { name: 'Noto Serif', category: 'serif' },
  { name: 'PT Serif', category: 'serif' },
]

export const MONO_FONTS: FontOption[] = [
  { name: 'IBM Plex Mono', category: 'monospace' },
  { name: 'JetBrains Mono', category: 'monospace' },
  { name: 'Fira Code', category: 'monospace' },
  { name: 'Source Code Pro', category: 'monospace' },
  { name: 'Roboto Mono', category: 'monospace' },
  { name: 'Space Mono', category: 'monospace' },
  { name: 'Ubuntu Mono', category: 'monospace' },
  { name: 'DM Mono', category: 'monospace' },
  { name: 'Inconsolata', category: 'monospace' },
]

/** Get all fonts for a given role */
export function getFontsForRole(role: 'sans' | 'serif' | 'mono'): FontOption[] {
  switch (role) {
    case 'sans':
      return SANS_FONTS
    case 'serif':
      return SERIF_FONTS
    case 'mono':
      return MONO_FONTS
  }
}
