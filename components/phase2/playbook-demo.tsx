const steps = [
  { name: "Trigger", detail: "An alert arrives from the SIEM, EDR, or a ticket." },
  { name: "Enrich", detail: "Look up the observable and add threat intelligence." },
  { name: "Decide", detail: "Branch on severity, asset, and what the enrichment returned." },
  { name: "Respond", detail: "Open the case, notify the analyst, or take the approved action." },
];

/**
 * Phase 2 replaces this static outline with an in-browser SOAR playbook
 * the reader can step through. Keep the component at this path.
 */
export function PlaybookDemo() {
  return (
    <section aria-labelledby="playbook-demo-title" className="mt-14 rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
      <p className="font-mono text-xs font-medium tracking-[0.16em] text-brass uppercase">Phase 2</p>
      <h2 id="playbook-demo-title" className="mt-3 font-serif text-3xl text-ink">
        Playbook demo
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        An in-browser walkthrough of a SOAR playbook will live here. The seam is{" "}
        <code className="font-mono text-sm text-ink">components/phase2/playbook-demo.tsx</code>. Until then, this is the shape of the demo, not a running automation.
      </p>
      <ol className="mt-6 grid gap-4 sm:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.name} className="rounded-2xl border border-line bg-bg p-4">
            <p className="font-mono text-xs text-brass">0{index + 1}</p>
            <h3 className="mt-2 font-serif text-xl text-ink">{step.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
