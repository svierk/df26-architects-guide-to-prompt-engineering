/**
 * Joins a path in /public with the configured `base` of the site, so nothing
 * has to hard-code the `/df26-architects-guide-to-prompt-engineering` segment.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
