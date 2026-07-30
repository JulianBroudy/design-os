/**
 * Right-side preview panel showing live component showcase.
 */

import { useEditor } from '../context'
import { DesignSystemPreviewScope } from './DesignSystemPreviewScope'
import { ComponentShowcase } from './ComponentShowcase'
import { PreviewToolbar } from './PreviewToolbar'

export function PreviewPanel() {
  const { state } = useEditor()

  return (
    <div className="flex-1 flex flex-col min-w-0 border-l border-stone-200 dark:border-stone-700">
      <PreviewToolbar />
      <div className="flex-1 overflow-auto">
        <DesignSystemPreviewScope
          tokens={state.tokens}
          mode={state.previewMode}
          className="min-h-full"
        >
          <ComponentShowcase />
        </DesignSystemPreviewScope>
      </div>
    </div>
  )
}
