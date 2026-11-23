"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchDocuments, type SearchDocument } from "@/lib/content/search";

export function WritingSearch({ documents }: { documents: SearchDocument[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchDocuments(documents, query), [documents, query]);

  return (
    <div className="mt-8">
      <label htmlFor="writing-search" className="font-semibold text-ink">
        Search notes
      </label>
      <input
        id="writing-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-line bg-bg px-3 py-3 text-base text-ink"
      />
      <ul className="mt-6 space-y-4">
        {results.map((document) => (
          <li key={document.href}>
            <article className="rounded-3xl border border-line bg-bg-elev p-5">
              <h2 className="font-serif text-2xl text-ink">
                <Link href={document.href} className="text-ink no-underline">
                  {document.title}
                </Link>
              </h2>
              <p className="mt-2 text-muted">{document.summary}</p>
            </article>
          </li>
        ))}
      </ul>
      {results.length === 0 ? <p className="mt-6 text-muted">No notes match that search.</p> : null}
    </div>
  );
}
