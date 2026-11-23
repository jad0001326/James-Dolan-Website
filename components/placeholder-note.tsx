import type { ReactNode } from "react";

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-4 border border-dashed border-brass bg-bg px-4 py-3" role="note" aria-label="Placeholder content">
      <p className="tag tag-warn">placeholder</p>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </aside>
  );
}
