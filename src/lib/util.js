export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Normalise a short answer for comparison: case, whitespace, quotes, brackets and commas are ignored.
export function norm(s) {
  return String(s ?? '').toLowerCase().replace(/[\s"'“”‘’\[\]{},]/g, '');
}

export const sum = (xs) => xs.reduce((t, x) => t + x, 0);
export const partsMarks = (parts) => sum(parts.map((p) => p.m));

export function pct(got, max) {
  return max > 0 ? Math.round((got / max) * 100) : 0;
}

export function formatTime(secs) {
  const s = Math.max(0, Math.ceil(secs));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

// Rough guide only: real OCR grade boundaries change every series.
const BOUNDARIES = [[80, '9'], [71, '8'], [62, '7'], [53, '6'], [45, '5'], [37, '4'], [27, '3'], [17, '2'], [7, '1']];
export function indicativeGrade(percent) {
  const hit = BOUNDARIES.find(([b]) => percent >= b);
  return hit ? hit[1] : 'U';
}
