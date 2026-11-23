# Legacy static site

This folder is the previous GitHub Pages site (HTML, CSS, JavaScript, and images) as it stood before the Next.js redesign.

The custom-domain file `CNAME` is still at the repository root, so this branch does not remove the GitHub Pages domain setting. Restoring the old site means moving these files back to the repository root. The same snapshot is also in git history on `main` before the redesign merge.

Do not serve this folder with GitHub Pages from a Next.js project root. Deploy the new site on Vercel, then point `jamesdolan.info` at that project when you are ready to leave GitHub Pages.
