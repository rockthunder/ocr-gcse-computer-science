import { PAPER1 } from '../data/paper1.js';
import { PAPER2 } from '../data/paper2.js';
import { shuffle, partsMarks, sum } from './util.js';

// Real papers: 80 marks in 90 minutes.
export const MARKS_PER_MINUTE = 80 / 90;
export const TIME_OPTIONS = [10, 15, 20, 30, 45, 60, 90];

export const targetMarks = (minutes) => Math.max(6, Math.round(minutes * MARKS_PER_MINUTE));

const bankOrder = new Map([...PAPER1, ...PAPER2].map((g, i) => [g.id, i]));

// Pick question groups whose marks fill `budget` as closely as possible, spreading across topics.
// When no whole question fits the remaining marks, the longest fitting run of opening parts is used,
// so later parts never appear without the earlier ones they build on.
function pick(groups, budget) {
  const pool = shuffle(groups);
  const chosen = [];
  const used = {};
  let remaining = budget;

  while (remaining > 0 && pool.length) {
    const ranked = pool.slice().sort((a, b) => (used[a.topic] || 0) - (used[b.topic] || 0));
    let group = ranked.find((g) => partsMarks(g.parts) <= remaining);
    let parts = group?.parts;
    if (!group) {
      let best = null;
      for (const g of ranked) {
        let n = 0;
        while (n < g.parts.length && partsMarks(g.parts.slice(0, n + 1)) <= remaining) n++;
        const marks = partsMarks(g.parts.slice(0, n));
        if (n > 0 && (!best || marks > best.marks)) best = { g, parts: g.parts.slice(0, n), marks };
      }
      if (!best) break;
      group = best.g;
      parts = best.parts;
    }
    chosen.push({ ...group, parts });
    remaining -= partsMarks(parts);
    used[group.topic] = (used[group.topic] || 0) + 1;
    pool.splice(pool.indexOf(group), 1);
  }
  return chosen;
}

const byBank = (a, b) => a.topic.localeCompare(b.topic) || bankOrder.get(a.id) - bankOrder.get(b.id);

function buildPaper1(budget) {
  const standard = PAPER1.filter((g) => !g.extended);
  // Like the real paper, longer sittings finish with one 8-mark extended response.
  if (budget >= 35) {
    const ext = shuffle(PAPER1.filter((g) => g.extended))[0];
    return [...pick(standard, budget - partsMarks(ext.parts)).sort(byBank), { ...ext }];
  }
  return pick(standard, budget).sort(byBank);
}

function buildPaper2(budget) {
  const secA = PAPER2.filter((g) => g.section !== 'B');
  const secB = PAPER2.filter((g) => g.section === 'B');
  // Real paper: Section A 50 marks, Section B 30 marks.
  const bBudget = budget >= 18 ? Math.round((budget * 30) / 80) : 0;
  const b = bBudget ? pick(secB, bBudget) : [];
  const a = pick(secA, budget - sum(b.map((g) => partsMarks(g.parts)))).sort(byBank);
  const sections = [{ title: 'Section A', groups: a }];
  if (b.length) {
    sections.push({
      title: 'Section B',
      note: 'Some questions in this section require you to write code. You may answer using the OCR Exam Reference Language or a high-level programming language you have studied (e.g. Python).',
      groups: b.sort(byBank),
    });
  }
  return sections;
}

export function buildExam(paper, minutes) {
  const target = targetMarks(minutes);
  let sections;
  if (paper === 1) sections = [{ title: 'Paper 1 – Computer systems', groups: buildPaper1(target) }];
  else if (paper === 2) sections = buildPaper2(target).map((s) => ({ ...s, title: `Paper 2 – ${s.title}` }));
  else {
    const p1 = Math.round(target / 2);
    sections = [
      { title: 'Paper 1 – Computer systems', groups: buildPaper1(p1) },
      ...buildPaper2(target - p1).map((s) => ({ ...s, title: `Paper 2 – ${s.title}` })),
    ];
  }
  let n = 0;
  sections.forEach((s) => s.groups.forEach((g) => { g.number = ++n; }));
  sections = sections.filter((s) => s.groups.length);
  const total = sum(sections.flatMap((s) => s.groups.map((g) => partsMarks(g.parts))));
  return { paper, minutes, target, total, sections, createdAt: Date.now() };
}
