export const LOGO_C = "M54.04 10.26 A31 31 0 1 0 54.04 51.74 L48.54 46.79 A23.6 23.6 0 1 1 48.54 15.21 Z";
export const LOGO_MOON = "M18.5 22 A17 17 0 0 0 40.5 47 A15 15 0 0 1 18.5 22 Z";
export const LOGO_LETTERS = ["M63.8 3.2H71.2V51.5H100V58.9H63.8Z", "M107.4 59.5L132.9 3.2H141.1L166.6 59.5H158.5L153.5 48.4H120.5L115.5 59.5ZM123.9 41H150.1L137 12.1Z", "M182.8 3.2H202A16.9 16.9 0 0 1 207.6 36.1L222.5 59.5H213.6L199.6 37H190.2V59.5H182.8ZM190.2 10.6V29.6H202A9.5 9.5 0 0 0 202 10.6Z", "M233.8 3.2H241.2V59.5H233.8Z", "M258 3.2H297.5V10.6H281.45V59.5H274.05V10.6H258Z", "M297.7 3.2H307.3L329 29.5L350.7 3.2H360.3L332.7 37.5V59.5H325.3V37.5Z"];
export const LOGO_NAVY = "#0F4C81";
export const LOGO_MOON_BLUE = "#CAF1F8";
// Clarity2027 edition: wordmark in fjord green, crescent moon in clay (matches the site palette)
export const LOGO_FJORD = "#1F5B50";
export const LOGO_CLAY = "#A33D1E";
export const LOGO_BUTTER = "#F1DDA8";

export function logoSvg(fg: string, moon: string, mark = false): string {
  const w = mark ? 62 : 361;
  const letters = mark ? "" : LOGO_LETTERS.map((d) => `<path d="${d}" fill="${fg}" fill-rule="evenodd"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 62" role="img" aria-labelledby="t"><title id="t">Clarity</title><path d="${LOGO_C}" fill="${fg}"/><path d="${LOGO_MOON}" fill="${moon}"/>${letters}</svg>`;
}

export const LOGO_VARIANTS: { id: string; label: string; fg: string; moon: string; mark: boolean; dark: boolean }[] = [
  { id: "clarity2027-logo-fjord", label: "Clarity2027 edition", fg: LOGO_FJORD, moon: LOGO_CLAY, mark: false, dark: false },
  { id: "clarity2027-logo-on-dark", label: "Clarity2027 edition on dark", fg: "#FFFFFF", moon: LOGO_BUTTER, mark: false, dark: true },
  { id: "clarity2027-mark-fjord", label: "Clarity2027 mark", fg: LOGO_FJORD, moon: LOGO_CLAY, mark: true, dark: false },
  { id: "clarity-logo-color", label: "Official colour", fg: LOGO_NAVY, moon: LOGO_MOON_BLUE, mark: false, dark: false },
  { id: "clarity-logo-color-on-dark", label: "Official colour on dark", fg: "#FFFFFF", moon: LOGO_MOON_BLUE, mark: false, dark: true },
  { id: "clarity-logo-navy", label: "Official navy", fg: LOGO_NAVY, moon: LOGO_NAVY, mark: false, dark: false },
  { id: "clarity-logo-black", label: "Black", fg: "#000000", moon: "#000000", mark: false, dark: false },
  { id: "clarity-logo-white", label: "White", fg: "#FFFFFF", moon: "#FFFFFF", mark: false, dark: true },
  { id: "clarity-mark-color", label: "Official mark", fg: LOGO_NAVY, moon: LOGO_MOON_BLUE, mark: true, dark: false },
];
