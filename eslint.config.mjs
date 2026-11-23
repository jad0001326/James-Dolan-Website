import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const next = require("eslint-config-next/core-web-vitals");

const config = [
  ...next,
  {
    ignores: ["legacy/**", "coverage/**"],
  },
];

export default config;
