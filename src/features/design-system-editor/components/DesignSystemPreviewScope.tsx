/**
 * Wraps children in a div with CSS custom properties set from design tokens.
 * This scopes the product's design system to the preview panel only,
 * without affecting Design OS's own UI (stone/lime theme).
 */

import { useMemo, type ReactNode } from 'react'
import type { DesignSystemTokens } from '../types'
import { tokensToCSSProperties } from '@/lib/design-system-css'
import { cn } from '@/lib/utils'

interface DesignSystemPreviewScopeProps {
  tokens: DesignSystemTokens
  mode: 'light' | 'dark'
  children: ReactNode
  className?: string
}

export function DesignSystemPreviewScope({
  tokens,
  mode,
  children,
  className,
}: DesignSystemPreviewScopeProps) {
  const style = useMemo(
    () => tokensToCSSProperties(tokens, mode),
    [tokens, mode]
  )

  return (
    <div
      style={style as React.CSSProperties}
      className={cn(mode === 'dark' && 'dark', className)}
    >
      <div className="bg-background text-foreground font-sans transition-colors duration-200">
        {children}
      </div>
    </div>
  )
}
