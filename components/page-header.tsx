export function PageHeader({ kicker, title, lede }: { kicker: string; title: string; lede: string }) {
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-xs font-medium tracking-[0.16em] text-brass uppercase">{kicker}</p>
      <h1 className="mt-3 font-serif text-4xl leading-[1.12] text-ink sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
    </header>
  );
}
