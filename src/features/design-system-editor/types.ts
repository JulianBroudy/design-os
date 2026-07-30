/**
 * Design System Editor types
 *
 * Semantic color roles follow shadcn/ui convention exactly.
 * All color values use oklch format for programmatic manipulation.
 */

export interface ColorTokens {
  background: string
  foreground: string
  card: string
  'card-foreground': string
  popover: string
  'popover-foreground': string
  primary: string
  'primary-foreground': string
  secondary: string
  'secondary-foreground': string
  muted: string
  'muted-foreground': string
  accent: string
  'accent-foreground': string
  destructive: string
  'destructive-foreground': string
  border: string
  input: string
  ring: string
}

export type ColorRole = keyof ColorTokens

/** Grouped color roles for the editor UI */
export const COLOR_ROLE_GROUPS = {
  'Base': ['background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground'] as ColorRole[],
  'Brand': ['primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'accent', 'accent-foreground'] as ColorRole[],
  'Semantic': ['muted', 'muted-foreground', 'destructive', 'destructive-foreground'] as ColorRole[],
  'Borders': ['border', 'input', 'ring'] as ColorRole[],
}

export interface DesignSystemTokens {
  colors: {
    light: ColorTokens
    dark: ColorTokens
  }
  typography: {
    sans: string
    serif: string
    mono: string
  }
  radius: string
  spacing: 'compact' | 'comfortable' | 'spacious'
  preset: string
}

export const RADIUS_OPTIONS = [
  { label: 'None', value: '0' },
  { label: 'SM', value: '0.25rem' },
  { label: 'MD', value: '0.375rem' },
  { label: 'LG', value: '0.5rem' },
  { label: 'XL', value: '0.75rem' },
  { label: '2XL', value: '1rem' },
  { label: 'Full', value: '9999px' },
] as const

export const SPACING_OPTIONS = ['compact', 'comfortable', 'spacious'] as const

/** Default tokens used when no design system exists */
export function getDefaultTokens(): DesignSystemTokens {
  return {
    colors: {
      light: {
        background: 'oklch(0.985 0.001 106.424)',
        foreground: 'oklch(0.216 0.006 56.043)',
        card: 'oklch(1 0 0)',
        'card-foreground': 'oklch(0.216 0.006 56.043)',
        popover: 'oklch(1 0 0)',
        'popover-foreground': 'oklch(0.216 0.006 56.043)',
        primary: 'oklch(0.216 0.006 56.043)',
        'primary-foreground': 'oklch(0.985 0.001 106.424)',
        secondary: 'oklch(0.970 0.001 106.424)',
        'secondary-foreground': 'oklch(0.216 0.006 56.043)',
        muted: 'oklch(0.970 0.001 106.424)',
        'muted-foreground': 'oklch(0.444 0.011 73.639)',
        accent: 'oklch(0.970 0.001 106.424)',
        'accent-foreground': 'oklch(0.216 0.006 56.043)',
        destructive: 'oklch(0.586 0.253 17.585)',
        'destructive-foreground': 'oklch(0.985 0.001 106.424)',
        border: 'oklch(0.923 0.003 48.717)',
        input: 'oklch(0.923 0.003 48.717)',
        ring: 'oklch(0.553 0.013 58.071)',
      },
      dark: {
        background: 'oklch(0.216 0.006 56.043)',
        foreground: 'oklch(0.985 0.001 106.424)',
        card: 'oklch(0.268 0.007 34.298)',
        'card-foreground': 'oklch(0.985 0.001 106.424)',
        popover: 'oklch(0.268 0.007 34.298)',
        'popover-foreground': 'oklch(0.985 0.001 106.424)',
        primary: 'oklch(0.923 0.003 48.717)',
        'primary-foreground': 'oklch(0.216 0.006 56.043)',
        secondary: 'oklch(0.318 0.008 43.185)',
        'secondary-foreground': 'oklch(0.985 0.001 106.424)',
        muted: 'oklch(0.318 0.008 43.185)',
        'muted-foreground': 'oklch(0.709 0.01 56.259)',
        accent: 'oklch(0.318 0.008 43.185)',
        'accent-foreground': 'oklch(0.985 0.001 106.424)',
        destructive: 'oklch(0.712 0.194 13.428)',
        'destructive-foreground': 'oklch(0.985 0.001 106.424)',
        border: 'oklch(0.370 0.010 67.558)',
        input: 'oklch(0.370 0.010 67.558)',
        ring: 'oklch(0.553 0.013 58.071)',
      },
    },
    typography: {
      sans: 'DM Sans',
      serif: 'Merriweather',
      mono: 'IBM Plex Mono',
    },
    radius: '0.5rem',
    spacing: 'comfortable',
    preset: 'stone',
  }
}
