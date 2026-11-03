// "↗" (U+2197) is emoji-capable: iOS draws it as a blue emoji box. Draw the arrow as an SVG instead.
export function Arrow({ className }: { className?: string }) {
  return <svg className={className ? `arrow-icon ${className}` : "arrow-icon"} aria-hidden="true" focusable="false" viewBox="0 0 12 12" width="12" height="12"><path d="M3 9 9 3M4.25 3H9v4.75" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
