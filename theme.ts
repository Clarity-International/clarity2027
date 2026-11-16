import type { FrameTheme } from "@dust/frame";

// Clarity brand palette: official navy and moon light blue, with a warm orange reserved for calls to action (white text, 5.2:1 contrast).
export const theme = {
  "--background": "#F6FBFD",
  "--foreground": "#19364B",
  "--card": "#FFFFFF",
  "--card-foreground": "#19364B",
  "--muted": "#E8F2F6",
  "--muted-foreground": "#4C697A",
  "--primary": "#0F4C81",
  "--primary-foreground": "#FFFFFF",
  "--secondary": "#C2410C",
  "--secondary-foreground": "#FFFFFF",
  "--accent": "#CAF1F8",
  "--accent-foreground": "#0F4C81",
  "--border": "#C9DDE5",
  "--chart-1": "#0F4C81",
  "--chart-2": "#C2410C",
  "--chart-3": "#5EA9C6",
  "--chart-4": "#CAF1F8",
  "--chart-5": "#4C697A",
  "--marker": "#CAF1F8",
  "--font-sans": "'Atkinson Hyperlegible', ui-sans-serif, system-ui, sans-serif",
  "--font-serif": "'Manrope', 'Atkinson Hyperlegible', ui-sans-serif, system-ui, sans-serif",
  "--radius": "0.5rem",
} satisfies FrameTheme;

export const highContrast = {
  "--background": "#FFFFFF",
  "--foreground": "#000000",
  "--card": "#FFFFFF",
  "--card-foreground": "#000000",
  "--muted": "#FFFFFF",
  "--muted-foreground": "#000000",
  "--primary": "#000000",
  "--primary-foreground": "#FFFFFF",
  "--secondary": "#5C3014",
  "--secondary-foreground": "#FFFFFF",
  "--accent": "#FFF27A",
  "--accent-foreground": "#000000",
  "--border": "#000000",
  "--marker": "#FFE500",
} satisfies FrameTheme;
