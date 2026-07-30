/**
 * Left-side editor panel with tabs for Colors, Typography, and Other settings.
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEditor } from '../context'
import { ColorsTab } from './ColorsTab'
import { TypographyTab } from './TypographyTab'
import { OtherTab } from './OtherTab'

export function EditorPanel() {
  const { state, dispatch } = useEditor()

  return (
    <div className="w-[360px] shrink-0 border-r border-stone-200 dark:border-stone-700 flex flex-col bg-white dark:bg-stone-950">
      <Tabs
        value={state.activeTab}
        onValueChange={(tab) =>
          dispatch({ type: 'SET_ACTIVE_TAB', tab: tab as 'colors' | 'typography' | 'other' })
        }
        className="flex flex-col flex-1 min-h-0"
      >
        <div className="px-4 pt-3 pb-0 shrink-0">
          <TabsList className="w-full">
            <TabsTrigger value="colors" className="flex-1">Colors</TabsTrigger>
            <TabsTrigger value="typography" className="flex-1">Typography</TabsTrigger>
            <TabsTrigger value="other" className="flex-1">Other</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="colors" className="mt-0">
            <ColorsTab />
          </TabsContent>
          <TabsContent value="typography" className="mt-0">
            <TypographyTab />
          </TabsContent>
          <TabsContent value="other" className="mt-0">
            <OtherTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
