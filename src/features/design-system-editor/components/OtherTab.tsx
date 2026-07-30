/**
 * Other settings tab — border radius and spacing.
 */

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { SPACING_OPTIONS } from '../types'
import { useEditor } from '../context'
import { RadiusSelector } from './RadiusSelector'

export function OtherTab() {
  const { state, dispatch } = useEditor()

  return (
    <div className="space-y-6">
      <RadiusSelector />

      <Separator />

      {/* Spacing */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          Spacing Density
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {SPACING_OPTIONS.map((option) => {
            const isActive = state.tokens.spacing === option
            return (
              <button
                key={option}
                onClick={() => dispatch({ type: 'SET_SPACING', value: option })}
                className={cn(
                  'px-3 py-2 text-xs font-medium rounded-md transition-all capitalize',
                  'hover:bg-stone-100 dark:hover:bg-stone-800',
                  isActive
                    ? 'ring-2 ring-stone-900 dark:ring-stone-100 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400'
                )}
              >
                {option}
              </button>
            )
          })}
        </div>
        <p className="text-[11px] text-stone-400 dark:text-stone-500">
          Hint for downstream commands when generating component layouts.
        </p>
      </div>
    </div>
  )
}
