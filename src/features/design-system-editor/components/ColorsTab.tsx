/**
 * Colors tab in the editor panel.
 * Shows preset picker, color role editors grouped by category, and light/dark mode toggle.
 */

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sun, Moon } from 'lucide-react'
import { useEditor } from '../context'
import { COLOR_ROLE_GROUPS } from '../types'
import { PresetPicker } from './PresetPicker'
import { ColorRoleEditor } from './ColorRoleEditor'

export function ColorsTab() {
  const { state, dispatch } = useEditor()

  return (
    <div className="space-y-5">
      {/* Preset picker */}
      <PresetPicker />

      <Separator />

      {/* Light/Dark mode toggle for editing */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          Editing
        </span>
        <div className="flex items-center gap-1 ml-auto">
          <Button
            variant={state.editingMode === 'light' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => dispatch({ type: 'SET_EDITING_MODE', mode: 'light' })}
            className="h-7 px-2 text-xs"
          >
            <Sun className="w-3 h-3 mr-1" strokeWidth={1.5} />
            Light
          </Button>
          <Button
            variant={state.editingMode === 'dark' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => dispatch({ type: 'SET_EDITING_MODE', mode: 'dark' })}
            className="h-7 px-2 text-xs"
          >
            <Moon className="w-3 h-3 mr-1" strokeWidth={1.5} />
            Dark
          </Button>
        </div>
      </div>

      {/* Color role groups */}
      {Object.entries(COLOR_ROLE_GROUPS).map(([groupName, roles]) => (
        <div key={groupName} className="space-y-2">
          <h4 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            {groupName}
          </h4>
          <div className="space-y-1.5">
            {roles.map((role) => (
              <ColorRoleEditor key={role} role={role} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
