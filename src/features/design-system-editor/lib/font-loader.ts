/**
 * Dynamic Google Font loading.
 * Loads font families on demand by injecting <link> tags.
 */

const loadedFonts = new Set<string>()

/**
 * Load a Google Font family with common weights.
 * Idempotent — calling multiple times with the same font is a no-op.
 */
export function loadGoogleFont(fontFamily: string): void {
  if (loadedFonts.has(fontFamily)) return
  loadedFonts.add(fontFamily)

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@400;500;600;700&display=swap`
  document.head.appendChild(link)
}

/**
 * Load multiple fonts at once.
 */
export function loadGoogleFonts(families: string[]): void {
  families.forEach(loadGoogleFont)
}

/**
 * Check if a font has been loaded (or is loading).
 */
export function isFontLoaded(fontFamily: string): boolean {
  return loadedFonts.has(fontFamily)
}
