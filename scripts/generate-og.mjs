// Regenerates the social preview image (public/og-image.png) that LinkedIn,
// Slack and X show when the page URL is shared. Run `npm run og:generate`
// after the session title or the published URL changes.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const url = 'svierk.github.io/df26-architects-guide-to-prompt-engineering';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4da3ff"/>
      <stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.85" cy="0" r="0.7">
      <stop offset="0" stop-color="#4da3ff" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#4da3ff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0" cy="1" r="0.75">
      <stop offset="0" stop-color="#22d3ee" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#0b0e14"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <rect y="622" width="1200" height="8" fill="url(#accent)"/>

  <text x="80" y="132" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700"
        letter-spacing="4" fill="#22d3ee">DREAMFORCE '26 · SAN FRANCISCO</text>

  <text x="80" y="248" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="700"
        fill="#e6e9ef">An Architect's Guide to</text>
  <text x="80" y="336" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="700"
        fill="url(#accent)">Prompt Engineering</text>

  <text x="80" y="410" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#9aa3b2">
    Prompting isn't wording - it's the controls around the model.</text>

  ${['CONTEXT', 'CONSTRAINTS', 'TOOLS', 'OUTPUT'].reduce((acc, label, index) => {
    const width = [190, 268, 148, 176][index];
    const x = 80 + [0, 210, 498, 666][index];
    return `${acc}
  <rect x="${x}" y="462" width="${width}" height="52" rx="12" fill="#151a25" stroke="#2f3849"/>
  <text x="${x + width / 2}" y="495" text-anchor="middle" font-family="Menlo, monospace" font-size="21"
        font-weight="700" fill="#4da3ff">${label}</text>`;
  }, '')}

  <text x="80" y="580" font-family="Menlo, monospace" font-size="22" fill="#6b7688">${url}</text>
</svg>`;

const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

await writeFile(out('og-image.svg'), svg, 'utf8');

// LinkedIn and most other unfurlers ignore SVG, so a PNG is what ships.
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
await writeFile(out('og-image.png'), png);

console.log(`Wrote ${out('og-image.png')} (${(png.length / 1024).toFixed(0)} kB)`);
