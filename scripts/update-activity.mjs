import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const login = process.env.PROFILE_USERNAME || 'radware0';
const query = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date weekday contributionCount contributionLevel } }
      }
    }
  }
}`;

async function loadCalendar() {
  // Local generation uses the already authenticated GitHub CLI. CI uses its token.
  if (!process.env.GITHUB_TOKEN) {
    const result = JSON.parse(execFileSync('gh', ['api', 'graphql', '-f', `query=${query}`, '-f', `login=${login}`], { encoding: 'utf8' }));
    if (result.errors) throw new Error(result.errors.map(error => error.message).join('; '));
    if (!result.data?.user) throw new Error(`GitHub user ${login} was not found.`);
    return result.data.user.contributionsCollection.contributionCalendar;
  }
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'radware0-profile-activity' },
    body: JSON.stringify({ query, variables: { login } }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`GitHub contribution request failed (${response.status}).`);
  const result = await response.json();
  if (result.errors) throw new Error(result.errors.map(error => error.message).join('; '));
  if (!result.data?.user) throw new Error(`GitHub user ${login} was not found.`);
  return result.data.user.contributionsCollection.contributionCalendar;
}

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const colors = { NONE: '#181818', FIRST_QUARTILE: '#555555', SECOND_QUARTILE: '#888888', THIRD_QUARTILE: '#bbbbbb', FOURTH_QUARTILE: '#f5f5f5' };
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const assets = fileURLToPath(new URL('../assets/', import.meta.url));
await mkdir(assets, { recursive: true });
const calendar = await loadCalendar();
if (!Array.isArray(calendar.weeks) || calendar.weeks.length === 0) throw new Error('GitHub returned an empty contribution calendar.');

function render(weeks, width, mobile = false) {
  const height = mobile ? 236 : 246;
  const left = mobile ? 42 : 48;
  const right = 24;
  const pitch = (width - left - right) / weeks.length;
  const cell = Math.min(pitch - 3, 13);
  const y = 87;
  const lastDay = weeks.flatMap(week => week.contributionDays).at(-1).date;
  let body = `<rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" rx="14" fill="#000" stroke="#303030"/>`;
  const text = (x, y, value, extra = '') => `<text x="${x}" y="${y}" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" ${extra.includes('font-size=') ? '' : `font-size="${mobile ? 14 : 12}"`} ${extra.includes('fill=') ? '' : 'fill="#b8b8b8"'} ${extra}>${escape(value)}</text>`;
  body += text(24, 33, `${calendar.totalContributions} contributions in the past year`, 'fill="#f5f5f5"');
  body += text(24, 53, mobile ? 'Recent 6 months' : 'The daily build log.');
  let previousMonth = '';
  let previousLabelX = -100;
  for (const [weekIndex, week] of weeks.entries()) {
    const firstDay = week.contributionDays[0];
    const monthKey = firstDay.date.slice(0, 7);
    const x = left + weekIndex * pitch;
    if (monthKey !== previousMonth && x - previousLabelX > 32 && x < width - 42) {
      body += text(x, y - 13, months[Number(firstDay.date.slice(5, 7)) - 1], `font-size="${mobile ? 14 : 10}"`);
      previousLabelX = x;
    }
    previousMonth = monthKey;
    for (const day of week.contributionDays) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isInteger(day.contributionCount) || !Number.isInteger(day.weekday) || day.weekday < 0 || day.weekday > 6 || !colors[day.contributionLevel]) throw new Error('GitHub returned an invalid contribution day.');
      const count = day.contributionCount;
      body += `<rect x="${x.toFixed(2)}" y="${y + day.weekday * 16}" width="${cell.toFixed(2)}" height="13" rx="2" fill="${colors[day.contributionLevel]}"><title>${escape(day.date)}: ${count} contribution${count === 1 ? '' : 's'}</title></rect>`;
    }
  }
  const small = `font-size="${mobile ? 14 : 10}"`;
  body += text(13, y + 16 + 10, 'M', small) + text(13, y + 48 + 10, 'W', small) + text(13, y + 80 + 10, 'F', small);
  body += text(24, height - 18, `Through ${lastDay}`, small);
  const legendX = width - (mobile ? 142 : 152);
  body += text(legendX - (mobile ? 42 : 35), height - 18, 'Less', small);
  Object.values(colors).forEach((color, index) => { body += `<rect x="${legendX + index * 16}" y="${height - 29}" width="12" height="12" rx="2" fill="${color}"/>`; });
  body += text(width - 24, height - 18, 'More', `${small} text-anchor="end"`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc"><title id="title">${escape(login)}'s GitHub contribution heatmap</title><desc id="desc">${calendar.totalContributions} contributions in the past year. ${mobile ? 'Shows the recent six months.' : 'Shows the past year.'} Dark squares mean no contributions; brighter squares mean more contributions. Data through ${lastDay}.</desc>${body}</svg>\n`;
}

// Fetch and validate before replacing either existing image.
const desktop = render(calendar.weeks, 900);
const mobile = render(calendar.weeks.slice(-26), 420, true);
for (const [name, output] of [['activity.svg', desktop], ['activity-mobile.svg', mobile]]) {
  const target = `${assets}/${name}`;
  const previous = await readFile(target, 'utf8').catch(error => { if (error.code !== 'ENOENT') throw error; return ''; });
  if (previous !== output) await writeFile(target, output);
}
console.log(`Generated real activity for ${login}: ${calendar.totalContributions} contributions, ${calendar.weeks.length} weeks.`);
