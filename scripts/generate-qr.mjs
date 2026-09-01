// Generates a QR code for the published page URL into `qr-code.svg` at the
// repository root. The output is local only - it is git-ignored and is not part
// of the published site, so nothing on the page depends on it.
//
// Usage: npm run qr:generate   (override the target with QR_URL=... )
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const url = process.env.QR_URL ?? 'https://svierk.github.io/df26-architects-guide-to-prompt-engineering/';
const target = fileURLToPath(new URL('../qr-code.svg', import.meta.url));

// High error correction keeps the code readable when it is resized or printed.
const svg = await QRCode.toString(url, {
  type: 'svg',
  errorCorrectionLevel: 'H',
  margin: 1,
  color: { dark: '#0b0e14', light: '#ffffff' }
});

await writeFile(target, svg, 'utf8');
console.log(`Wrote ${target}\n  -> ${url}`);
