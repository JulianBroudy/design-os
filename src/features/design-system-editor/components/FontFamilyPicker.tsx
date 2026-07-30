/**
 * Font family picker — a searchable dropdown of Google Fonts.
 */

import { useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { getFontsForRole } from '../lib/font-list'
import { loadGoogleFont } from '../lib/font-loader'

interface FontFamilyPickerProps {
  role: 'sans' | 'serif' | 'mono'
  value: string
  onChange: (value: string) => void
  label: string
}

export function FontFamilyPicker({ role, value, onChange, label }: FontFamilyPickerProps) {
  const fonts = getFontsForRole(role)

  // Load the currently selected font
  useEffect(() => {
    if (value) {
      loadGoogleFont(value)
    }
  }, [value])

  const handleChange = (newValue: string) => {
    loadGoogleFont(newValue)
    onChange(newValue)
  }

  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider">
        {label}
      </Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="h-9">
          <SelectValue placeholder={`Select ${role} font`} />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font.name} value={font.name}>
              <span style={{ fontFamily: `"${font.name}", system-ui` }}>
                {font.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Font preview */}
      <p
        className="text-sm text-stone-700 dark:text-stone-300 pt-1"
        style={{ fontFamily: `"${value}", system-ui` }}
      >
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  )
}
