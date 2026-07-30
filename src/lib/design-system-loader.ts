/**
 * Design system loading utilities.
 *
 * Supports two formats:
 * 1. New: product/design-system/design-system.json (full DesignSystemTokens)
 * 2. Legacy: product/design-system/colors.json + typography.json (3 colors + 3 fonts)
 *
 * When loading legacy format, converts to full DesignSystemTokens using presets.
 */

import type { DesignSystemTokens } from '@/features/design-system-editor/types'
import type { LegacyColorTokens, LegacyTypographyTokens } from '@/types/product'
import { getDefaultTokens } from '@/features/design-system-editor/types'
import { generatePreset } from '@/features/design-system-editor/lib/presets'

// Load JSON files from product/design-system at build time
const designSystemFiles = import.meta.glob('/product/design-system/*.json', {
  eager: true,
}) as Record<string, { default: Record<string, unknown> }>

/**
 * Load the complete design system, supporting both new and legacy formats.
 * Returns null if no design system files exist.
 */
export function loadDesignSystem(): DesignSystemTokens | null {
  // Try new format first
  const newFormat = loadNewFormat()
  if (newFormat) return newFormat

  // Fall back to legacy format
  return loadLegacyFormat()
}

/**
 * Load from design-system.json (new format).
 */
function loadNewFormat(): DesignSystemTokens | null {
  const module = designSystemFiles['/product/design-system/design-system.json']
  if (!module?.default) return null

  const data = module.default as Record<string, unknown>

  // Validate required fields
  if (!data.colors || typeof data.colors !== 'object') return null

  const colors = data.colors as Record<string, unknown>
  if (!colors.light || !colors.dark) return null

  return data as unknown as DesignSystemTokens
}

/**
 * Load from legacy colors.json + typography.json and convert to new format.
 */
function loadLegacyFormat(): DesignSystemTokens | null {
  const colors = loadLegacyColors()
  const typography = loadLegacyTypography()

  if (!colors && !typography) return null

  // Start with defaults and apply what we have
  const tokens = getDefaultTokens()

  // If colors exist, use the primary color as a preset
  if (colors) {
    const preset = generatePreset(colors.primary)
    tokens.colors = preset
    tokens.preset = colors.primary
  }

  // If typography exists, map the old fields
  if (typography) {
    tokens.typography.sans = typography.heading || typography.body || tokens.typography.sans
    tokens.typography.mono = typography.mono || tokens.typography.mono
    // Legacy format doesn't have serif, keep default
  }

  return tokens
}

function loadLegacyColors(): LegacyColorTokens | null {
  const module = designSystemFiles['/product/design-system/colors.json']
  if (!module?.default) return null

  const colors = module.default as Record<string, string>
  if (!colors.primary || !colors.secondary || !colors.neutral) return null

  return {
    primary: colors.primary,
    secondary: colors.secondary,
    neutral: colors.neutral,
  }
}

function loadLegacyTypography(): LegacyTypographyTokens | null {
  const module = designSystemFiles['/product/design-system/typography.json']
  if (!module?.default) return null

  const typography = module.default as Record<string, string>
  if (!typography.heading || !typography.body) return null

  return {
    heading: typography.heading,
    body: typography.body,
    mono: typography.mono || 'IBM Plex Mono',
  }
}

/**
 * Check if any design system has been defined.
 */
export function hasDesignSystem(): boolean {
  return (
    '/product/design-system/design-system.json' in designSystemFiles ||
    '/product/design-system/colors.json' in designSystemFiles ||
    '/product/design-system/typography.json' in designSystemFiles
  )
}
