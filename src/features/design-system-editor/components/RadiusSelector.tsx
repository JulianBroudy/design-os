/**
 * Visual border radius selector.
 */

import { cn } from '@/lib/utils'
import { RADIUS_OPTIONS } from '../types'
import { useEditor } from '../context'

export function RadiusSelector() {
  const { state, dispatch } = useEditor()

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
        Border Radius
      </label>
      <div className="grid grid-cols-4 gap-1.5">
        {RADIUS_OPTIONS.map((option) => {
          const isActive = state.tokens.radius === option.value
          return (
            <button
              key={option.value}
              onClick={() => dispatch({ type: 'SET_RADIUS', value: option.value })}
              className={cn(
                'flex flex-col items-center gap-1.5 p-2 rounded-md transition-all',
                'hover:bg-stone-100 dark:hover:bg-stone-800',
                isActive && 'ring-2 ring-stone-900 dark:ring-stone-100 bg-stone-100 dark:bg-stone-800'
              )}
            >
              <div
                className="w-8 h-8 border-2 border-stone-400 dark:border-stone-500 bg-stone-100 dark:bg-stone-700"
                style={{ borderRadius: option.value === '9999px' ? '9999px' : option.value }}
              />
              <span className="text-[10px] text-stone-500 dark:text-stone-400">
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
