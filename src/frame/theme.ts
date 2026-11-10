import type { FrameTheme } from "@dust/frame";

// Nordic hygge, refined: linen, oat, birch, fjord green, sage, a single clay note.
export const theme = {
  "--background": "#F4F1EA",
  "--foreground": "#2A2925",
  "--card": "#FBFAF6",
  "--card-foreground": "#2A2925",
  "--muted": "#EAE5DB",
  "--muted-foreground": "#5F5A51",
  "--primary": "#1F5B50",
  "--primary-foreground": "#FBFAF6",
  "--secondary": "#A33D1E",
  "--secondary-foreground": "#FFFFFF",
  "--accent": "#D4E6D6",
  "--accent-foreground": "#1F5B50",
  "--border": "#DAD3C6",
  "--chart-1": "#1F5B50",
  "--chart-2": "#A33D1E",
  "--chart-3": "#8DB49A",
  "--chart-4": "#CDBE9E",
  "--chart-5": "#5F5A51",
  "--marker": "#F1DDA8",
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
