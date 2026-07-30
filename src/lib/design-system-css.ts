/**
 * Utilities for applying design system tokens as CSS custom properties.
 *
 * Used by:
 * - Design system editor preview (scoped div)
 * - Shell/screen design fullscreen pages (document root)
 */

import type { DesignSystemTokens, ColorTokens } from '@/features/design-system-editor/types'
import { loadGoogleFonts } from '@/features/design-system-editor/lib/font-loader'

/**
 * Generate a CSS custom properties object from design system tokens.
 * Returns a React-compatible style object.
 */
export function tokensToCSSProperties(
  tokens: DesignSystemTokens,
  mode: 'light' | 'dark'
): Record<string, string> {
  const colorTokens: ColorTokens = mode === 'dark' ? tokens.colors.dark : tokens.colors.light
  const style: Record<string, string> = {}

  // Color variables
  for (const [key, value] of Object.entries(colorTokens)) {
    style[`--${key}`] = value
  }

  // Radius
  style['--radius'] = tokens.radius

  // Typography (font family stacks)
  style['--font-sans'] = `"${tokens.typography.sans}", system-ui, sans-serif`
  style['--font-serif'] = `"${tokens.typography.serif}", Georgia, serif`
  style['--font-mono'] = `"${tokens.typography.mono}", ui-monospace, monospace`

  return style
}

/**
 * Apply design system tokens to document.documentElement.
 * Used by fullscreen preview pages (shell, screen designs) running in iframes.
 */
export function applyDesignSystemToDocument(
  tokens: DesignSystemTokens,
  isDark: boolean
): void {
  const style = tokensToCSSProperties(tokens, isDark ? 'dark' : 'light')
  const root = document.documentElement

  for (const [key, value] of Object.entries(style)) {
    root.style.setProperty(key, value)
  }

  // Load the product's fonts
  loadGoogleFonts([
    tokens.typography.sans,
    tokens.typography.serif,
    tokens.typography.mono,
  ])
}

/**
 * Remove product design system overrides from document.documentElement.
 * Restores Design OS's default theme.
 */
export function removeDesignSystemFromDocument(tokens: DesignSystemTokens): void {
  const root = document.documentElement
  const colorTokens = tokens.colors.light // Use either mode, we just need the keys

  for (const key of Object.keys(colorTokens)) {
    root.style.removeProperty(`--${key}`)
  }
  root.style.removeProperty('--radius')
  root.style.removeProperty('--font-sans')
  root.style.removeProperty('--font-serif')
  root.style.removeProperty('--font-mono')
}
