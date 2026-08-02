import type { MouseEvent } from "react";

/**
 * Feeds the cursor position into an element styled with the `.spotlight` class
 * (see globals.css). Writes CSS custom properties directly on the node, so it
 * never triggers a React re-render — safe to attach to items inside long lists.
 */
export function onSpotlightMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--my", `${e.clientY - rect.top}px`);
}
