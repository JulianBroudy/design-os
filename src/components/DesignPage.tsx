import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { StepIndicator, type StepStatus } from '@/components/StepIndicator'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { loadProductData } from '@/lib/product-loader'
import { oklchToDisplayHex } from '@/features/design-system-editor/lib/color-utils'
import { ChevronRight, Layout, Pencil } from 'lucide-react'

/**
 * Determine the status of each step on the Design page
 * Steps: 1. Design Tokens, 2. Shell Design
 */
function getDesignPageStepStatuses(
  hasDesignSystem: boolean,
  hasShell: boolean
): StepStatus[] {
  const statuses: StepStatus[] = []

  // Step 1: Design Tokens
  if (hasDesignSystem) {
    statuses.push('completed')
  } else {
    statuses.push('current')
  }

  // Step 2: Shell
  if (hasShell) {
    statuses.push('completed')
  } else if (hasDesignSystem) {
    statuses.push('current')
  } else {
    statuses.push('upcoming')
  }

  return statuses
}

export function DesignPage() {
  const productData = useMemo(() => loadProductData(), [])
  const designSystem = productData.designSystem
  const shell = productData.shell

  const hasDesignSystem = !!designSystem
  const hasShell = !!shell?.spec
  const allStepsComplete = hasDesignSystem && hasShell

  const stepStatuses = getDesignPageStepStatuses(hasDesignSystem, hasShell)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Design System
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Define the visual foundation and application shell for your product.
          </p>
        </div>

        {/* Step 1: Design Tokens */}
        <StepIndicator step={1} status={stepStatuses[0]}>
          {!designSystem ? (
            <EmptyState type="design-system" />
          ) : (
            <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    Design Tokens
                  </CardTitle>
                  <Link to="/design/editor">
                    <Button variant="outline" size="sm" className="h-8">
                      <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      Open Editor
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Color preview */}
                <div>
                  <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-3">
                    Colors
                    {designSystem.preset && designSystem.preset !== 'custom' && (
                      <span className="ml-2 text-xs font-normal normal-case text-stone-400 dark:text-stone-500">
                        ({designSystem.preset} preset)
                      </span>
                    )}
                  </h4>
                  <div className="flex gap-1.5">
                    {(['primary', 'secondary', 'accent', 'destructive', 'muted', 'background', 'foreground', 'border'] as const).map(
                      (role) => {
                        const lightValue = designSystem.colors.light[role]
                        if (!lightValue) return null
                        const hex = oklchToDisplayHex(lightValue)
                        return (
                          <div key={role} className="flex flex-col items-center gap-1">
                            <div
                              className="w-8 h-8 rounded-md border border-stone-200 dark:border-stone-600"
                              style={{ backgroundColor: hex }}
                              title={`${role}: ${hex}`}
                            />
                            <span className="text-[9px] text-stone-400 dark:text-stone-500 capitalize">
                              {role.replace('-', ' ')}
                            </span>
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>

                {/* Typography */}
                <div>
                  <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-3">
                    Typography
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Sans</p>
                      <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                        {designSystem.typography.sans}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Serif</p>
                      <p className="text-stone-900 dark:text-stone-100 text-sm">
                        {designSystem.typography.serif}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Mono</p>
                      <p className="font-mono text-stone-900 dark:text-stone-100 text-sm">
                        {designSystem.typography.mono}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Radius & Spacing */}
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Radius</p>
                    <p className="text-sm text-stone-900 dark:text-stone-100 font-mono">
                      {designSystem.radius}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Spacing</p>
                    <p className="text-sm text-stone-900 dark:text-stone-100 capitalize">
                      {designSystem.spacing}
                    </p>
                  </div>
                </div>

                {/* Edit hint */}
                <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Run <code className="font-mono text-stone-700 dark:text-stone-300">/design-tokens</code> to update or{' '}
                    <Link to="/design/editor" className="text-stone-700 dark:text-stone-300 underline">
                      open the visual editor
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </StepIndicator>

        {/* Step 2: Application Shell */}
        <StepIndicator step={2} status={stepStatuses[1]} isLast={!allStepsComplete}>
          {!shell?.spec ? (
            <EmptyState type="shell" />
          ) : (
            <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Application Shell
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Overview */}
                {shell.spec.overview && (
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                    {shell.spec.overview}
                  </p>
                )}

                {/* Navigation items */}
                {shell.spec.navigationItems.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
                      Navigation
                    </h4>
                    <ul className="space-y-1">
                      {shell.spec.navigationItems.map((item, index) => {
                        // Parse markdown-style bold: **text** → <strong>text</strong>
                        const parts = item.split(/\*\*([^*]+)\*\*/)
                        return (
                          <li key={index} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                            <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                            {parts.map((part, i) =>
                              i % 2 === 1 ? (
                                <strong key={i} className="font-semibold">{part}</strong>
                              ) : (
                                <span key={i}>{part}</span>
                              )
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {/* View Shell Design Link */}
                {shell.hasComponents && (
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                    <Link
                      to="/shell/design"
                      className="flex items-center justify-between gap-4 py-2 hover:text-stone-900 dark:hover:text-stone-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                          <Layout className="w-4 h-4 text-stone-600 dark:text-stone-300" strokeWidth={1.5} />
                        </div>
                        <span className="font-medium text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100">
                          View Shell Design
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
                    </Link>
                  </div>
                )}

                {/* Edit hint */}
                <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Run <code className="font-mono text-stone-700 dark:text-stone-300">/design-shell</code> to update
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </StepIndicator>

        {/* Next Phase Button - shown when all steps complete */}
        {allStepsComplete && (
          <StepIndicator step={3} status="current" isLast>
            <NextPhaseButton nextPhase="sections" />
          </StepIndicator>
        )}
      </div>
    </AppLayout>
  )
}
