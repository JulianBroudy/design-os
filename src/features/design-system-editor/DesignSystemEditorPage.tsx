/**
 * Design System Editor — interactive theme builder page.
 *
 * Split layout: editor controls on the left, live component preview on the right.
 * Loads existing tokens from product/design-system/ on mount.
 */

import { useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { loadDesignSystem } from '@/lib/design-system-loader'
import { getDefaultTokens } from './types'
import { EditorProvider, useEditor } from './context'
import { EditorPanel } from './components/EditorPanel'
import { PreviewPanel } from './components/PreviewPanel'
import { loadGoogleFonts } from './lib/font-loader'

function EditorHeader() {
  const navigate = useNavigate()
  const { state } = useEditor()

  return (
    <header className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shrink-0 z-50">
      <div className="px-4 py-2 flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/design')}
          className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Back
        </Button>
        <div className="h-4 w-px bg-stone-200 dark:bg-stone-700" />
        <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
          Design System Editor
        </span>

        <div className="ml-auto flex items-center gap-3">
          {/* Save status */}
          {state.isDirty ? (
            <span className="text-xs text-stone-400 dark:text-stone-500">
              Unsaved changes
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500">
              <Check className="w-3 h-3" strokeWidth={2} />
              Saved
            </span>
          )}
          <SaveButton />
        </div>
      </div>
    </header>
  )
}

function SaveButton() {
  const { state, dispatch } = useEditor()

  const handleSave = async () => {
    try {
      // Write the design system JSON to the product directory
      const json = JSON.stringify(state.tokens, null, 2)
      const response = await fetch('/api/save-design-system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json,
      })

      if (response.ok) {
        dispatch({ type: 'MARK_SAVED' })
      }
    } catch {
      // If the API doesn't exist (no server-side save endpoint),
      // fall back to copying to clipboard and showing instructions
      const json = JSON.stringify(state.tokens, null, 2)
      await navigator.clipboard.writeText(json)
      dispatch({ type: 'MARK_SAVED' })
      alert(
        'Design system JSON copied to clipboard.\n\n' +
        'Save it to: product/design-system/design-system.json\n\n' +
        'Then restart the dev server to see changes in shell/screen previews.'
      )
    }
  }

  return (
    <Button
      size="sm"
      onClick={handleSave}
      disabled={!state.isDirty}
      className="h-8"
    >
      <Save className="w-3.5 h-3.5" strokeWidth={1.5} />
      Save
    </Button>
  )
}

function EditorLayout() {
  const { state } = useEditor()

  // Load product fonts on mount and when they change
  useEffect(() => {
    const { sans, serif, mono } = state.tokens.typography
    loadGoogleFonts([sans, serif, mono].filter(Boolean))
  }, [state.tokens.typography])

  return (
    <div className="h-screen flex flex-col bg-stone-50 dark:bg-stone-900 animate-fade-in">
      <EditorHeader />
      <div className="flex-1 flex min-h-0">
        <EditorPanel />
        <PreviewPanel />
      </div>
    </div>
  )
}

export function DesignSystemEditorPage() {
  const initialTokens = useMemo(() => {
    return loadDesignSystem() ?? getDefaultTokens()
  }, [])

  return (
    <EditorProvider initialTokens={initialTokens}>
      <EditorLayout />
    </EditorProvider>
  )
}
