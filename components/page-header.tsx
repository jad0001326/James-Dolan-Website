export function PageHeader({ kicker, title, lede }: { kicker: string; title: string; lede: string }) {
  const path = kicker.toLowerCase().replace(/\s+/g, "-");
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-sm text-cyan">
        <span className="text-muted">james@soc</span>
        <span className="text-accent">:</span>
        <span className="text-ink">~</span>
        <span className="text-muted">$ </span>
        cat ./{path}
      </p>
      <h1 className="mt-4 font-mono text-3xl leading-tight text-ink sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
    </header>
  );
}
