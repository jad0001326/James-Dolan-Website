import type { ReactNode } from "react";

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-4 rounded-2xl border border-dashed border-brass bg-bg px-4 py-3" role="note" aria-label="Placeholder content">
      <p className="font-mono text-xs font-medium tracking-[0.14em] text-brass uppercase">Placeholder</p>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </aside>
  );
}
