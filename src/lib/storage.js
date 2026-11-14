const KEY = 'ocr-j277-progress-v1';
const EXAM_KEY = 'ocr-j277-exam-v1';

const empty = () => ({ topics: {}, history: [] });

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty(), ...JSON.parse(raw) } : empty();
  } catch {
    return empty();
  }
}

export function saveProgress(p) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* storage unavailable */ }
}

// results: [{ topic, kind: 'mcq' | 'exam', got, max }]
export function addResults(progress, results, historyEntry) {
  const topics = { ...progress.topics };
  for (const r of results) {
    const t = { mcqGot: 0, mcqMax: 0, examGot: 0, examMax: 0, ...topics[r.topic] };
    if (r.kind === 'mcq') { t.mcqGot += r.got; t.mcqMax += r.max; } else { t.examGot += r.got; t.examMax += r.max; }
    topics[r.topic] = t;
  }
  const history = historyEntry ? [{ ...historyEntry, at: Date.now() }, ...progress.history].slice(0, 30) : progress.history;
  return { topics, history };
}

// Combined mastery for a topic as a percentage, or null if never attempted.
export function mastery(t) {
  if (!t) return null;
  const parts = [];
  if (t.mcqMax) parts.push(t.mcqGot / t.mcqMax);
  if (t.examMax) parts.push(t.examGot / t.examMax);
  return parts.length ? Math.round((parts.reduce((a, b) => a + b, 0) / parts.length) * 100) : null;
}

export function loadExam() {
  try { return JSON.parse(localStorage.getItem(EXAM_KEY)); } catch { return null; }
}
export function saveExam(state) {
  try {
    if (state) localStorage.setItem(EXAM_KEY, JSON.stringify(state));
    else localStorage.removeItem(EXAM_KEY);
  } catch { /* storage unavailable */ }
}
