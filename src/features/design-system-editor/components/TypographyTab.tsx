/**
 * Typography tab — font family pickers for sans, serif, and mono.
 */

import { useEditor } from '../context'
import { FontFamilyPicker } from './FontFamilyPicker'

export function TypographyTab() {
  const { state, dispatch } = useEditor()

  return (
    <div className="space-y-6">
      <FontFamilyPicker
        role="sans"
        label="Sans-Serif (Primary)"
        value={state.tokens.typography.sans}
        onChange={(value) => dispatch({ type: 'SET_FONT', role: 'sans', value })}
      />
      <FontFamilyPicker
        role="serif"
        label="Serif"
        value={state.tokens.typography.serif}
        onChange={(value) => dispatch({ type: 'SET_FONT', role: 'serif', value })}
      />
      <FontFamilyPicker
        role="mono"
        label="Monospace"
        value={state.tokens.typography.mono}
        onChange={(value) => dispatch({ type: 'SET_FONT', role: 'mono', value })}
      />
    </div>
  )
}
