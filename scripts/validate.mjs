// Sanity-checks the question banks and the exam generator. Run: npm run validate
import { TOPICS } from '../src/data/topics.js';
import { MCQS } from '../src/data/mcq.js';
import { PAPER1 } from '../src/data/paper1.js';
import { PAPER2 } from '../src/data/paper2.js';
import { buildExam, TIME_OPTIONS, targetMarks } from '../src/lib/generate.js';
import { autoMark } from '../src/lib/marking.js';
import { partsMarks } from '../src/lib/util.js';

const errors = [];
const fail = (msg) => errors.push(msg);
const topicIds = new Set(TOPICS.map((t) => t.id));

for (const q of MCQS) {
  if (!topicIds.has(q.topic)) fail(`${q.id}: unknown topic ${q.topic}`);
  if (q.options.length !== 4) fail(`${q.id}: expected 4 options`);
  if (new Set(q.options).size !== q.options.length) fail(`${q.id}: duplicate options`);
}

const ids = new Set();
for (const g of [...PAPER1, ...PAPER2]) {
  if (ids.has(g.id)) fail(`duplicate group id ${g.id}`);
  ids.add(g.id);
  if (!topicIds.has(g.topic)) fail(`${g.id}: unknown topic`);
  g.parts.forEach((p, i) => {
    const where = `${g.id}[${i}]`;
    if (!p.m || !p.p || !p.t) fail(`${where}: missing m/p/t`);
    if (p.t === 'short' && !p.a?.length) fail(`${where}: short answer needs accepted answers`);
    if (p.t === 'mcq' && (p.ans == null || !p.opts?.[p.ans])) fail(`${where}: bad mcq`);
    if ((p.t === 'written' || p.t === 'extended') && !p.ms?.length) fail(`${where}: needs mark scheme`);
    if (p.t === 'table') {
      const inputs = p.rows.flat().filter((c) => c && typeof c === 'object');
      if (!inputs.length) fail(`${where}: table has no inputs`);
      // a fully correct answer must score full marks
      const value = {};
      p.rows.forEach((row, r) => row.forEach((c, ci) => { if (c && typeof c === 'object') value[`${r}-${ci}`] = Array.isArray(c.a) ? c.a[0] : c.a; }));
      if (autoMark(p, value).score !== p.m) fail(`${where}: correct table answer does not score full marks`);
      inputs.forEach((c) => { if (c.opts && !c.opts.includes(c.a)) fail(`${where}: answer ${c.a} not in options`); });
    }
    if (p.t === 'short' && autoMark(p, p.a[0]).score !== p.m) fail(`${where}: accepted answer does not score`);
  });
}

console.log('Exam generator (target vs actual marks, 200 runs each):');
for (const paper of [1, 2, 'mixed']) {
  for (const minutes of TIME_OPTIONS) {
    let worst = 0;
    let qs = 0;
    for (let run = 0; run < 200; run++) {
      const exam = buildExam(paper, minutes);
      const total = exam.sections.flatMap((s) => s.groups).reduce((t, g) => t + partsMarks(g.parts), 0);
      worst = Math.max(worst, Math.abs(total - exam.target));
      qs = exam.sections.flatMap((s) => s.groups).length;
      if (total > exam.target) fail(`paper ${paper} ${minutes}m: over target (${total}/${exam.target})`);
    }
    console.log(`  paper ${String(paper).padEnd(5)} ${String(minutes).padStart(2)} min → target ${String(targetMarks(minutes)).padStart(2)} marks, worst shortfall ${worst}, ~${qs} questions`);
    if (worst > 2) fail(`paper ${paper} ${minutes}m: shortfall ${worst}`);
  }
}

const count = (bank) => bank.reduce((t, g) => t + partsMarks(g.parts), 0);
console.log(`\nMCQs: ${MCQS.length}; Paper 1: ${PAPER1.length} questions / ${count(PAPER1)} marks; Paper 2: ${PAPER2.length} questions / ${count(PAPER2)} marks`);
for (const t of TOPICS) {
  const m = MCQS.filter((q) => q.topic === t.id).length;
  const e = [...PAPER1, ...PAPER2].filter((g) => g.topic === t.id).length;
  console.log(`  ${t.id} ${t.name.padEnd(48)} ${String(m).padStart(3)} MCQs, ${e} exam questions`);
}

if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n - ${errors.join('\n - ')}`);
  process.exit(1);
}
console.log('\nAll checks passed.');
