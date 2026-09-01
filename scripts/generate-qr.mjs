// Regenerates public/qr.svg - the QR code shown on the page and printed on the
// closing slide of the deck. Run `npm run qr:generate` after the published URL
// of the site changes.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const url = process.env.QR_URL ?? 'https://svierk.github.io/df26-architects-guide-to-prompt-engineering/';
const target = fileURLToPath(new URL('../public/qr.svg', import.meta.url));

// High error correction keeps the code scannable from the back of the room,
// even at slide size and through a phone camera at an angle.
const svg = await QRCode.toString(url, {
  type: 'svg',
  errorCorrectionLevel: 'H',
  margin: 1,
  color: { dark: '#0b0e14', light: '#ffffff' }
});

await writeFile(target, svg, 'utf8');
console.log(`Wrote ${target}\n  → ${url}`);
