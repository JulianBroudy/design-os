# Design Tokens

You are helping the user define the visual design system for their product. This includes colors, typography, border radius, and spacing. These tokens generate a complete shadcn/ui-compatible theme that is applied across all screen designs and the application shell.

## Step 1: Check Prerequisites

Read `/product/product-overview.md` to understand what the product is.

If it doesn't exist:

"Before defining your design system, you'll need to establish your product vision. Please run `/product-vision` first."

Stop here if the prerequisite is missing.

## Step 2: Conversational Discovery

Ask the user about their visual preferences in a natural, conversational way (1-2 questions at a time):

**Brand & Vibe:**
- "What vibe are you going for with **[Product Name]**? Professional, playful, modern, minimal, bold, warm, clinical?"
- "Any existing brand colors or fonts, or starting fresh?"
- "Any colors you want to avoid?"

**Functional Preferences:**
- "How much rounding do you want? Sharp corners, subtle rounding, or very rounded (pill-shaped)?"
- "Dense layout (more content per screen) or spacious (more breathing room)?"

Don't ask all at once — be conversational. 2-3 exchanges max.

## Step 3: Generate the Design System

Based on the conversation, generate a complete `design-system.json` file. Use the Tailwind color palette presets as a starting point, then customize if the user expressed specific preferences.

**File:** `/product/design-system/design-system.json`

The schema uses shadcn/ui-compatible semantic color roles in oklch format, with both light and dark mode values:

```json
{
  "colors": {
    "light": {
      "background": "oklch(...)",
      "foreground": "oklch(...)",
      "card": "oklch(...)",
      "card-foreground": "oklch(...)",
      "popover": "oklch(...)",
      "popover-foreground": "oklch(...)",
      "primary": "oklch(...)",
      "primary-foreground": "oklch(...)",
      "secondary": "oklch(...)",
      "secondary-foreground": "oklch(...)",
      "muted": "oklch(...)",
      "muted-foreground": "oklch(...)",
      "accent": "oklch(...)",
      "accent-foreground": "oklch(...)",
      "destructive": "oklch(...)",
      "destructive-foreground": "oklch(...)",
      "border": "oklch(...)",
      "input": "oklch(...)",
      "ring": "oklch(...)"
    },
    "dark": {
      "background": "oklch(...)",
      "foreground": "oklch(...)",
      "card": "oklch(...)",
      "card-foreground": "oklch(...)",
      "popover": "oklch(...)",
      "popover-foreground": "oklch(...)",
      "primary": "oklch(...)",
      "primary-foreground": "oklch(...)",
      "secondary": "oklch(...)",
      "secondary-foreground": "oklch(...)",
      "muted": "oklch(...)",
      "muted-foreground": "oklch(...)",
      "accent": "oklch(...)",
      "accent-foreground": "oklch(...)",
      "destructive": "oklch(...)",
      "destructive-foreground": "oklch(...)",
      "border": "oklch(...)",
      "input": "oklch(...)",
      "ring": "oklch(...)"
    }
  },
  "typography": {
    "sans": "Inter",
    "serif": "Merriweather",
    "mono": "JetBrains Mono"
  },
  "radius": "0.5rem",
  "spacing": "comfortable",
  "preset": "blue"
}
```

### How to Generate Color Values

Use these Tailwind color palettes as a base. The `preset` field records which palette was used.

**Strategy for mapping a Tailwind palette to semantic roles:**

**Light mode:**
- `background`: neutral-50 (very light)
- `foreground`: neutral-900 (very dark)
- `card`: white (`oklch(1 0 0)`)
- `card-foreground`: neutral-900
- `popover`: white
- `popover-foreground`: neutral-900
- `primary`: palette-600 (the main accent)
- `primary-foreground`: white or neutral-50 (readable on primary)
- `secondary`: neutral-100
- `secondary-foreground`: neutral-900
- `muted`: neutral-100
- `muted-foreground`: neutral-500
- `accent`: neutral-100
- `accent-foreground`: neutral-900
- `destructive`: rose-600
- `destructive-foreground`: white
- `border`: neutral-200
- `input`: neutral-200
- `ring`: palette-600

**Dark mode:**
- `background`: neutral-950
- `foreground`: neutral-50
- `card`: neutral-900
- `card-foreground`: neutral-50
- `popover`: neutral-900
- `popover-foreground`: neutral-50
- `primary`: palette-400 (lighter for dark backgrounds)
- `primary-foreground`: neutral-950
- `secondary`: neutral-800
- `secondary-foreground`: neutral-50
- `muted`: neutral-800
- `muted-foreground`: neutral-400
- `accent`: neutral-800
- `accent-foreground`: neutral-50
- `destructive`: rose-400
- `destructive-foreground`: neutral-950
- `border`: neutral-700
- `input`: neutral-700
- `ring`: palette-400

Use `stone` as the neutral palette for warm products, `slate` for cool/professional, `zinc` for neutral.

### Radius Options
- `0` (none/sharp)
- `0.25rem` (sm)
- `0.375rem` (md)
- `0.5rem` (lg — default)
- `0.75rem` (xl)
- `1rem` (2xl)
- `9999px` (full/pill)

### Spacing Options
- `compact` — dense information layouts
- `comfortable` — balanced (default)
- `spacious` — generous whitespace

### Typography

Choose from popular Google Fonts:

**Sans-Serif:** Inter, DM Sans, Plus Jakarta Sans, Nunito Sans, Poppins, Montserrat, Work Sans, Outfit, Manrope, Space Grotesk, Sora, Figtree, Raleway
**Serif:** Merriweather, Lora, Playfair Display, Source Serif 4, Libre Baskerville, DM Serif Display, Crimson Pro
**Monospace:** IBM Plex Mono, JetBrains Mono, Fira Code, Source Code Pro, Roboto Mono, Space Mono, DM Mono

## Step 4: Confirm and Direct to Visual Editor

After saving the file:

"I've saved your design system to `/product/design-system/design-system.json`.

**Summary:**
- **Colors:** [preset name] palette — [primary color] for accents, [neutral] for backgrounds
- **Typography:** [sans font] for headings & body, [mono font] for code
- **Radius:** [value] — [description]
- **Spacing:** [value]

You can now **open the visual editor** to see your design system applied to real components and fine-tune any colors, fonts, or settings:

👉 Navigate to **Design System → Open Editor** (or go to `/design/editor` in the browser)

The editor shows a live preview of buttons, cards, forms, tables, and more — all responding to your tokens in real-time. You can adjust individual colors, switch between light/dark mode preview, try different fonts, and more.

When you're happy with the design system, run `/design-shell` to design your application's navigation and layout."

## Important Notes

- Always generate BOTH light and dark mode values
- Use oklch format for all colors (e.g., `oklch(0.586 0.253 17.585)`)
- Ensure foreground colors contrast well with their paired backgrounds
- Design tokens apply to screen designs only — the Design OS app keeps its own stone/lime aesthetic
- If the user already has `colors.json`/`typography.json` (legacy format), the system automatically converts them — but generating the new `design-system.json` is preferred
- Remove old `colors.json` and `typography.json` files when generating the new format
