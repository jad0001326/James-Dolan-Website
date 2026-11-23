import fs from "node:fs";
import path from "node:path";

export const cvPdfHref = "/cv/james-dolan.pdf";

/** True once public/cv/james-dolan.pdf is added. Evaluated when the server starts or the site is built. */
export const cvPdfAvailable = fs.existsSync(path.join(process.cwd(), "public", "cv", "james-dolan.pdf"));
