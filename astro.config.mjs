// @ts-check
import { defineConfig } from 'astro/config';

// `site` + `base` together produce the canonical URL of the published asset:
// https://svierk.github.io/df26-architects-guide-to-prompt-engineering/
// Everything that points at a file in /public goes through src/lib/paths.ts so
// the base segment is never hard-coded into a component.
export default defineConfig({
  site: 'https://svierk.github.io',
  base: '/df26-architects-guide-to-prompt-engineering',
  trailingSlash: 'always'
});
