import assert from "node:assert/strict";
import { test } from "node:test";
import { certifications, roles, skills } from "../content/profile";
import { getCaseStudies } from "../lib/content/case-studies";
import { searchDocuments } from "../lib/content/search";
import { getWritingPosts } from "../lib/content/writing";

test("case studies are anonymised placeholders with the three sections", () => {
  const studies = getCaseStudies();
  assert.equal(studies.length, 3);
  for (const study of studies) {
    assert.equal(study.placeholder, true);
    assert.match(study.body, /## Problem/);
    assert.match(study.body, /## Approach/);
    assert.match(study.body, /## Outcome/);
    assert.match(study.body, /<Placeholder>/);
    assert.doesNotMatch(`${study.title} ${study.body} ${study.summary}`, /xsiam/i);
  }
});

test("profile copy does not invent XSIAM or personal details", () => {
  const blob = JSON.stringify({ certifications, roles, skills });
  assert.doesNotMatch(blob, /xsiam/i);
  assert.doesNotMatch(blob, /salary|benefit|spouse|home address/i);
  assert.ok(roles.some((role) => role.current && role.note?.includes("Key Talent")));
  assert.ok(certifications.some((item) => item.shortName === "PCSAE" && item.issued === "January 2024"));
});

test("writing is empty until an MDX post is added, and search can filter it", () => {
  assert.deepEqual(getWritingPosts(), []);
  const documents = [
    { href: "/writing/playbooks", title: "Playbook notes", summary: "How a SOAR branch should fail closed.", kind: "writing" as const },
    { href: "/projects/example", title: "Migration", summary: "Moving a response workflow.", kind: "project" as const },
  ];
  assert.equal(searchDocuments(documents, "soar branch").length, 1);
  assert.equal(searchDocuments(documents, "").length, 2);
});
