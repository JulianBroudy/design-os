/**
 * Grid of Tailwind color family buttons for quick preset selection.
 */

import { PRESET_NAMES, generatePreset, getPresetDisplayColor } from '../lib/presets'
import { useEditor } from '../context'
import { oklchToDisplayHex } from '../lib/color-utils'
import { cn } from '@/lib/utils'

export function PresetPicker() {
  const { state, dispatch } = useEditor()

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
        Color Presets
      </label>
      <div className="grid grid-cols-5 gap-1.5">
        {PRESET_NAMES.map((name) => {
          const displayColor = getPresetDisplayColor(name)
          const hex = oklchToDisplayHex(displayColor)
          const isActive = state.tokens.preset === name

          return (
            <button
              key={name}
              onClick={() => {
                const colors = generatePreset(name)
                dispatch({ type: 'APPLY_PRESET', preset: name, colors })
              }}
              className={cn(
                'flex flex-col items-center gap-1 p-1.5 rounded-md transition-all',
                'hover:bg-stone-100 dark:hover:bg-stone-800',
                isActive && 'ring-2 ring-stone-900 dark:ring-stone-100 bg-stone-100 dark:bg-stone-800'
              )}
              title={name}
            >
              <div
                className="w-6 h-6 rounded-full border border-stone-200 dark:border-stone-600"
                style={{ backgroundColor: hex }}
              />
              <span className="text-[10px] text-stone-500 dark:text-stone-400 capitalize leading-none">
                {name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
