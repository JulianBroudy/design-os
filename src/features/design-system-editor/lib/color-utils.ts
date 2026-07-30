/**
 * Color utility functions for oklch <-> hex conversion and auto-foreground generation.
 *
 * All internal operations use oklch for perceptual uniformity.
 * Hex is supported for user input/display only.
 */

export interface OklchColor {
  l: number // Lightness: 0 to 1
  c: number // Chroma: 0 to ~0.4
  h: number // Hue: 0 to 360
}

// --- oklch string parsing/formatting ---

export function parseOklch(value: string): OklchColor | null {
  const match = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/)
  if (!match) return null
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  }
}

export function formatOklch(color: OklchColor): string {
  return `oklch(${color.l.toFixed(3)} ${color.c.toFixed(3)} ${color.h.toFixed(3)})`
}

// --- Hex <-> oklch conversion ---

/**
 * Convert hex color to oklch.
 * Goes through sRGB -> linear RGB -> OKLAB -> OKLCH.
 */
export function hexToOklch(hex: string): OklchColor {
  const rgb = hexToRgb(hex)
  const [lr, lg, lb] = rgb.map(srgbToLinear)

  // Linear RGB to OKLAB
  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb

  const l_cbrt = Math.cbrt(l_)
  const m_cbrt = Math.cbrt(m_)
  const s_cbrt = Math.cbrt(s_)

  const L = 0.2104542553 * l_cbrt + 0.793617785 * m_cbrt - 0.0040720468 * s_cbrt
  const a = 1.9779984951 * l_cbrt - 2.428592205 * m_cbrt + 0.4505937099 * s_cbrt
  const b = 0.0259040371 * l_cbrt + 0.7827717662 * m_cbrt - 0.808675766 * s_cbrt

  // OKLAB to OKLCH
  const C = Math.sqrt(a * a + b * b)
  let H = (Math.atan2(b, a) * 180) / Math.PI
  if (H < 0) H += 360

  return { l: L, c: C, h: C < 0.001 ? 0 : H }
}

/**
 * Convert oklch to hex.
 * Goes through OKLCH -> OKLAB -> linear RGB -> sRGB.
 */
export function oklchToHex(color: OklchColor): string {
  const { l: L, c: C, h: H } = color

  // OKLCH to OKLAB
  const hRad = (H * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)

  // OKLAB to linear RGB
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  const l_cubed = l_ * l_ * l_
  const m_cubed = m_ * m_ * m_
  const s_cubed = s_ * s_ * s_

  const lr = 4.0767416621 * l_cubed - 3.3077115913 * m_cubed + 0.2309699292 * s_cubed
  const lg = -1.2684380046 * l_cubed + 2.6097574011 * m_cubed - 0.3413193965 * s_cubed
  const lb = -0.0041960863 * l_cubed - 0.7034186147 * m_cubed + 1.707614701 * s_cubed

  const rgb = [lr, lg, lb].map(linearToSrgb).map((v) => Math.round(clamp(v, 0, 1) * 255))

  return `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

// --- Auto-foreground generation ---

/**
 * Given a background color in oklch, return a suitable foreground color
 * that ensures readable contrast (APCA-inspired lightness threshold).
 */
export function autoForeground(bgOklch: string, lightFg: string, darkFg: string): string {
  const bg = parseOklch(bgOklch)
  if (!bg) return darkFg
  // Use lightness threshold: bright backgrounds get dark text, dark backgrounds get light text
  return bg.l > 0.55 ? darkFg : lightFg
}

/**
 * Adjust lightness of an oklch color.
 */
export function adjustLightness(oklchStr: string, newLightness: number): string {
  const color = parseOklch(oklchStr)
  if (!color) return oklchStr
  return formatOklch({ ...color, l: clamp(newLightness, 0, 1) })
}

/**
 * Desaturate an oklch color (reduce chroma).
 */
export function desaturate(oklchStr: string, factor: number): string {
  const color = parseOklch(oklchStr)
  if (!color) return oklchStr
  return formatOklch({ ...color, c: color.c * clamp(factor, 0, 1) })
}

// --- Display helpers ---

/**
 * Get a display-friendly hex string from an oklch value.
 */
export function oklchToDisplayHex(oklchStr: string): string {
  const color = parseOklch(oklchStr)
  if (!color) return '#000000'
  return oklchToHex(color)
}

/**
 * Convert a user-entered hex value to an oklch string.
 */
export function displayHexToOklch(hex: string): string | null {
  const cleaned = hex.replace(/^#/, '')
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return null
  const color = hexToOklch(`#${cleaned}`)
  return formatOklch(color)
}

/**
 * Validate if a string is a valid oklch value.
 */
export function isValidOklch(value: string): boolean {
  return parseOklch(value) !== null
}

// --- Internal helpers ---

function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace(/^#/, '')
  return [
    parseInt(cleaned.slice(0, 2), 16) / 255,
    parseInt(cleaned.slice(2, 4), 16) / 255,
    parseInt(cleaned.slice(4, 6), 16) / 255,
  ]
}

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
