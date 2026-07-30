/**
 * Product types for Design OS v2
 */

// =============================================================================
// Product Overview
// =============================================================================

export interface Problem {
  title: string
  solution: string
}

export interface ProductOverview {
  name: string
  description: string
  problems: Problem[]
  features: string[]
}

// =============================================================================
// Product Roadmap
// =============================================================================

export interface Section {
  id: string // slug derived from title
  title: string
  description: string
  order: number
}

export interface ProductRoadmap {
  sections: Section[]
}

// =============================================================================
// Data Shape
// =============================================================================

export interface Entity {
  name: string
  description: string
}

export interface DataShape {
  entities: Entity[]
  relationships: string[]
}

// =============================================================================
// Design System
// =============================================================================

// Re-export the canonical design system types from the editor module
export type { DesignSystemTokens, ColorTokens, ColorRole } from '@/features/design-system-editor/types'
import type { DesignSystemTokens } from '@/features/design-system-editor/types'

/** Legacy format — used only for backward compat in the loader */
export interface LegacyColorTokens {
  primary: string
  secondary: string
  neutral: string
}

/** Legacy format — used only for backward compat in the loader */
export interface LegacyTypographyTokens {
  heading: string
  body: string
  mono: string
}

export type DesignSystem = DesignSystemTokens

// =============================================================================
// Application Shell
// =============================================================================

export interface ShellSpec {
  raw: string
  overview: string
  navigationItems: string[]
  layoutPattern: string
}

export interface ShellInfo {
  spec: ShellSpec | null
  hasComponents: boolean
}

// =============================================================================
// Combined Product Data
// =============================================================================

export interface ProductData {
  overview: ProductOverview | null
  roadmap: ProductRoadmap | null
  dataShape: DataShape | null
  designSystem: DesignSystem | null
  shell: ShellInfo | null
}
