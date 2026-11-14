import { norm } from './util.js';

const STOP = new Set(('the and that this with from into have has are was were will would which what when where there their they them then than ' +
  'each such some more most only also been being does done used uses using must should could about other e.g. etc so as is it its of to in on or a an by be can for not no if all any one two').split(' '));

const stems = (text) =>
  (String(text).toLowerCase().match(/[a-z0-9]+/g) || [])
    .filter((w) => w.length >= 3 && !STOP.has(w))
    .map((w) => w.slice(0, 5));

// Suggest which mark-scheme points an answer probably covers, by keyword overlap.
// Only a starting point: candidates confirm or change every tick themselves.
export function suggestTicks(points, answer) {
  const have = new Set(stems(answer));
  if (have.size === 0) return points.map(() => false);
  return points.map((pt) => {
    const keys = [...new Set(stems(pt.replace(/\(.*?\)/g, ' ')))];
    if (keys.length === 0) return false;
    const hits = keys.filter((k) => have.has(k)).length;
    return hits >= Math.max(1, Math.ceil(keys.length * 0.5));
  });
}

export function tableInputs(part) {
  const cells = [];
  part.rows.forEach((row, r) => row.forEach((cell, c) => {
    if (cell && typeof cell === 'object') cells.push({ key: `${r}-${c}`, cell });
  }));
  return cells;
}

export function cellCorrect(cell, value) {
  const accepted = Array.isArray(cell.a) ? cell.a : [cell.a];
  return value != null && value !== '' && accepted.some((a) => norm(a) === norm(value));
}

// Initial marking state for a part: { score, ticks?, cells? }
export function autoMark(part, value) {
  switch (part.t) {
    case 'short': {
      const ok = value != null && value !== '' && part.a.some((a) => norm(a) === norm(value));
      return { score: ok ? part.m : 0, correct: ok };
    }
    case 'mcq': {
      const ok = value === part.ans;
      return { score: ok ? part.m : 0, correct: ok };
    }
    case 'table': {
      const inputs = tableInputs(part);
      const cells = {};
      let right = 0;
      inputs.forEach(({ key, cell }) => {
        cells[key] = cellCorrect(cell, value?.[key]);
        if (cells[key]) right++;
      });
      return { score: Math.floor((right * part.m) / inputs.length), cells };
    }
    case 'extended': {
      const ticks = suggestTicks(part.ms, value);
      return { score: Math.min(part.m, ticks.filter(Boolean).length), ticks };
    }
    default: {
      const ticks = suggestTicks(part.ms, value);
      return { score: Math.min(part.m, ticks.filter(Boolean).length), ticks };
    }
  }
}

export const isAuto = (part) => part.t === 'short' || part.t === 'mcq' || part.t === 'table';
