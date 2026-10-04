import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const assets = fileURLToPath(new URL('../assets/', import.meta.url));
await mkdir(`${assets}/tech`, { recursive: true });

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const mono = 'ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace';
const sans = 'Arial, Helvetica, sans-serif';
const svg = (width, height, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${escape(title)}</title><rect width="${width}" height="${height}" fill="#000"/>${body}</svg>\n`;
const text = (x, y, size, content, extra = '') => `<text x="${x}" y="${y}" font-family="${mono}" font-size="${size}" ${extra.includes('fill=') ? '' : 'fill="#f5f5f5"'} ${extra}>${escape(content)}</text>`;
const rows = (lines, x, y, size, leading, extra = '') => lines.map((line, index) => text(x, y + index * leading, size, line, `xml:space="preserve" ${extra}`)).join('');

const rad = [
  ' ____      _      ____  ',
  '|  _ \\    / \\    |  _ \\ ',
  '| |_) |  / _ \\   | | | |',
  '|  _ <  / ___ \\  | |_| |',
  '|_| \\_\\/_/   \\_\\ |____/ ',
];

// A geometric orbital field rendered with actual ASCII characters.
function orbit(columns = 56, lines = 30) {
  const field = [];
  const ramp = ' .,:;+=xX#%@';
  for (let row = 0; row < lines; row++) {
    let line = '';
    for (let column = 0; column < columns; column++) {
      const x = (column - (columns - 1) / 2) / 23;
      const y = (row - (lines - 1) / 2) / 12;
      const radius = x * x + y * y;
      const ring = Math.abs((x * 0.82 + y * 0.58) ** 2 / 1.8 ** 2 + (y * 0.82 - x * 0.58) ** 2 / 0.34 ** 2 - 1);
      if (radius <= 1) {
        const z = Math.sqrt(1 - radius);
        const light = Math.max(0, x * -0.45 + y * -0.55 + z * 0.72);
        const meridian = Math.abs(Math.sin(Math.atan2(x, z) * 8 + y * 1.2));
        const latitude = Math.abs(Math.sin(Math.asin(y) * 11));
        const intensity = Math.min(1, light * 0.68 + (meridian < 0.16 || latitude < 0.18 ? 0.34 : 0));
        line += ramp[Math.max(1, Math.round(intensity * (ramp.length - 1)))];
      } else if (ring < 0.2) {
        line += ring < 0.07 ? '+' : '.';
      } else {
        line += ' ';
      }
    }
    field.push(line);
  }
  return field;
}

await writeFile(`${assets}/hero.svg`, svg(900, 324, 'Rad — frontend developer and cybersecurity learner. Work Hard, Play Hard.',
  text(32, 35, 12, 'radware0 / README.md', 'fill="#aaa"') +
  text(868, 35, 12, 'always learning_', 'text-anchor="end" fill="#aaa"') +
  '<path d="M32 51H868" stroke="#292929"/>' +
  rows(rad, 42, 102, 24, 28) +
  rows(orbit(), 555, 75, 8.8, 7.2, 'fill="#aaa"') +
  '<path d="M32 278H868" stroke="#292929"/>' +
  text(32, 303, 13, 'WORK HARD, PLAY HARD!') +
  text(868, 303, 12, 'frontend / cybersecurity', 'text-anchor="end" fill="#aaa"')
));

await writeFile(`${assets}/hero-mobile.svg`, svg(420, 286, 'Rad in ASCII lettering. Work Hard, Play Hard.',
  text(24, 30, 12, 'radware0 / README.md', 'fill="#aaa"') +
  '<path d="M24 47H396" stroke="#292929"/>' +
  rows(rad, 35, 92, 23, 26) +
  '<path d="M24 235H396" stroke="#292929"/>' +
  text(210, 264, 13, 'WORK HARD, PLAY HARD!', 'text-anchor="middle"')
));

const ant = [
  '       \\   /       ',
  '        \\ /        ',
  '      .-(o)-.       ',
  '     /  (O)  \\     ',
  '    /  /(@)\\  \\    ',
  '      /   \\        ',
  '     /     \\       ',
];

await writeFile(`${assets}/antwork.svg`, svg(900, 216, 'Antwork — deep work, made visible. React, TypeScript, local-first.',
  '<rect x=".5" y=".5" width="899" height="215" rx="14" fill="none" stroke="#303030"/>' +
  `<text x="32" y="67" font-family="${sans}" font-size="42" font-weight="700" letter-spacing="-1" fill="#fff">antwork</text>` +
  text(32, 103, 18, 'Deep work, made visible.') +
  text(32, 137, 13, 'Lock in. Log hours. Journal. Review.', 'fill="#b8b8b8"') +
  text(32, 185, 12, 'React / TypeScript / Local-first', 'fill="#b8b8b8"') +
  rows(ant, 648, 57, 17, 19, 'fill="#b8b8b8"') +
  '<path d="M845 33h20v20m-20 0 20-20" stroke="#fff" fill="none" stroke-width="2"/>'
));

await writeFile(`${assets}/antwork-mobile.svg`, svg(420, 278, 'Antwork — deep work, made visible. React, TypeScript, local-first.',
  '<rect x=".5" y=".5" width="419" height="277" rx="14" fill="none" stroke="#303030"/>' +
  `<text x="24" y="56" font-family="${sans}" font-size="36" font-weight="700" letter-spacing="-.8" fill="#fff">antwork</text>` +
  text(24, 89, 17, 'Deep work, made visible.') +
  '<path d="M24 111H396" stroke="#292929"/>' +
  rows(['Lock in.', 'Log hours.', 'Journal.', 'Review.'], 24, 146, 15, 25, 'fill="#b8b8b8"') +
  rows(ant, 249, 145, 12, 12, 'fill="#b8b8b8"') +
  text(24, 257, 14, 'React / TypeScript / Local-first', 'fill="#b8b8b8"') +
  '<path d="M369 29h20v20m-20 0 20-20" stroke="#fff" fill="none" stroke-width="2"/>'
));

const icons = {
  html: { label: 'HTML', art: '<path d="m35 14 3 32 12 4 12-4 3-32z" fill="none" stroke="#f5f5f5" stroke-width="2"/><path d="M58 22H43l1 8h13l-1 10-6 2-6-2-.5-5" fill="none" stroke="#f5f5f5" stroke-width="3"/>' },
  css: { label: 'CSS', art: '<path d="m35 14 3 32 12 4 12-4 3-32z" fill="none" stroke="#f5f5f5" stroke-width="2"/><path d="M42 22h16l-1 8H44m13 0-1 10-6 2-6-2-.5-5" fill="none" stroke="#f5f5f5" stroke-width="3"/>' },
  javascript: { label: 'JavaScript', art: `<rect x="33" y="14" width="34" height="34" rx="2" fill="#f5f5f5"/><text x="62" y="42" text-anchor="end" font-family="${sans}" font-weight="700" font-size="22" fill="#000">JS</text>` },
  vscode: { label: 'VS Code', art: '<path d="m59 12 11 5v28l-11 5-24-20-8 6-5-3V27l5-3 8 6 24-18zm0 12L42 31l17 8V24z" fill="#f5f5f5" transform="translate(3 0)"/>' },
  codex: { label: 'Codex', art: '<rect x="30" y="14" width="40" height="34" rx="6" fill="none" stroke="#f5f5f5" stroke-width="2"/><path d="m39 25 7 6-7 6m12 0h10" fill="none" stroke="#f5f5f5" stroke-width="2.5"/>' },
  react: { label: 'React JS', art: '<g fill="none" stroke="#f5f5f5" stroke-width="1.5"><ellipse cx="50" cy="31" rx="23" ry="8"/><ellipse cx="50" cy="31" rx="23" ry="8" transform="rotate(60 50 31)"/><ellipse cx="50" cy="31" rx="23" ry="8" transform="rotate(120 50 31)"/></g><circle cx="50" cy="31" r="4" fill="#f5f5f5"/>' },
  github: { label: 'GitHub', art: '<path fill="#f5f5f5" transform="translate(32 13) scale(1.5)" d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 6.29c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.31c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/>' },
};

for (const [name, { label, art }] of Object.entries(icons)) {
  await writeFile(`${assets}/tech/${name}.svg`, svg(100, 76, label, art +
    `<text x="50" y="67" font-family="${sans}" font-size="12" fill="#e0e0e0" text-anchor="middle">${escape(label)}</text>`
  ));
}

console.log('Built OLED header, mobile header, Antwork card, and seven monochrome tech tiles.');
