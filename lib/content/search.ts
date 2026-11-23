export type SearchDocument = {
  href: string;
  title: string;
  summary: string;
  kind: "project" | "writing";
};

/** Phase 2 site search. Pure matching so a search box can call it in the browser. */
export function searchDocuments(documents: SearchDocument[], query: string): SearchDocument[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return documents;

  return documents.filter((document) => {
    const haystack = `${document.title} ${document.summary} ${document.kind}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
