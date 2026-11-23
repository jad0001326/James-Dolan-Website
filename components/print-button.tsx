"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-semibold text-accent-ink"
    >
      Print or save as PDF
    </button>
  );
}
