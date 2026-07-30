/**
 * Editor for a single color role — shows a color swatch and hex input.
 */

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { useEditor } from '../context'
import type { ColorRole } from '../types'
import { oklchToDisplayHex, displayHexToOklch } from '../lib/color-utils'

interface ColorRoleEditorProps {
  role: ColorRole
  label?: string
}

/** Friendly display labels for color roles */
const ROLE_LABELS: Record<string, string> = {
  'background': 'Background',
  'foreground': 'Foreground',
  'card': 'Card',
  'card-foreground': 'Card Text',
  'popover': 'Popover',
  'popover-foreground': 'Popover Text',
  'primary': 'Primary',
  'primary-foreground': 'Primary Text',
  'secondary': 'Secondary',
  'secondary-foreground': 'Secondary Text',
  'muted': 'Muted',
  'muted-foreground': 'Muted Text',
  'accent': 'Accent',
  'accent-foreground': 'Accent Text',
  'destructive': 'Destructive',
  'destructive-foreground': 'Destructive Text',
  'border': 'Border',
  'input': 'Input Border',
  'ring': 'Focus Ring',
}

export function ColorRoleEditor({ role, label }: ColorRoleEditorProps) {
  const { state, dispatch } = useEditor()
  const oklchValue = state.tokens.colors[state.editingMode][role]
  const hexValue = oklchToDisplayHex(oklchValue)

  const [inputValue, setInputValue] = useState(hexValue)

  // Sync input when external changes happen (preset applied, mode switched)
  useEffect(() => {
    setInputValue(hexValue)
  }, [hexValue])

  const handleHexChange = (newHex: string) => {
    setInputValue(newHex)
    const oklch = displayHexToOklch(newHex)
    if (oklch) {
      dispatch({
        type: 'SET_COLOR',
        role,
        mode: state.editingMode,
        value: oklch,
      })
    }
  }

  const displayLabel = label || ROLE_LABELS[role] || role

  return (
    <div className="flex items-center gap-2">
      {/* Color swatch — also an HTML color input */}
      <div className="relative shrink-0">
        <div
          className="w-8 h-8 rounded-md border border-stone-200 dark:border-stone-600 cursor-pointer"
          style={{ backgroundColor: hexValue }}
        />
        <input
          type="color"
          value={hexValue}
          onChange={(e) => handleHexChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          title={`Pick color for ${displayLabel}`}
        />
      </div>
      {/* Label */}
      <span className="text-xs text-stone-600 dark:text-stone-300 flex-1 min-w-0 truncate">
        {displayLabel}
      </span>
      {/* Hex input */}
      <Input
        value={inputValue}
        onChange={(e) => handleHexChange(e.target.value)}
        className="w-[90px] h-7 text-xs font-mono px-2"
        placeholder="#000000"
      />
    </div>
  )
}
