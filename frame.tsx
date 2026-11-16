import type { CSSProperties, ReactNode } from "react";

export type FrameTheme = Record<string, string>;

// Replaces Dust's FrameRoot: applies the theme as CSS variables on a wrapper element.
export function FrameRoot({ theme, className, children }: { theme?: FrameTheme; className?: string; children?: ReactNode }) {
  return (
    <div className={className} style={theme as CSSProperties}>
      {children}
    </div>
  );
}
