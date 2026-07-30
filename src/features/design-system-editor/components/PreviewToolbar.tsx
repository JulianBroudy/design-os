/**
 * Toolbar for the preview panel — toggles between light/dark preview mode.
 */

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEditor } from '../context'

export function PreviewToolbar() {
  const { state, dispatch } = useEditor()

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50">
      <span className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
        Preview
      </span>
      <div className="flex items-center gap-1">
        <Button
          variant={state.previewMode === 'light' ? 'secondary' : 'ghost'}
          size="icon-sm"
          onClick={() => dispatch({ type: 'SET_PREVIEW_MODE', mode: 'light' })}
          title="Light mode preview"
        >
          <Sun className="w-3.5 h-3.5" strokeWidth={1.5} />
        </Button>
        <Button
          variant={state.previewMode === 'dark' ? 'secondary' : 'ghost'}
          size="icon-sm"
          onClick={() => dispatch({ type: 'SET_PREVIEW_MODE', mode: 'dark' })}
          title="Dark mode preview"
        >
          <Moon className="w-3.5 h-3.5" strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  )
}
