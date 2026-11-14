import { useEffect, useMemo, useState } from 'react';
import { PAPERS } from '../data/topics.js';
import { buildExam, targetMarks, TIME_OPTIONS } from '../lib/generate.js';
import { autoMark } from '../lib/marking.js';
import { loadExam, saveExam } from '../lib/storage.js';
import { formatTime, indicativeGrade, partsMarks, pct } from '../lib/util.js';
import ExamGroup, { partKey } from './ExamGroup.jsx';
import TopicBars from './TopicBars.jsx';

const PAPER_CHOICES = [
  { id: 1, label: 'Paper 1', note: PAPERS[1].name },
  { id: 2, label: 'Paper 2', note: PAPERS[2].name },
  { id: 'mixed', label: 'Mixed', note: 'Half Paper 1, half Paper 2' },
];

const allGroups = (exam) => exam.sections.flatMap((s) => s.groups);

export default function Simulation({ onRecord, onDeepDive }) {
  // state: { phase: 'exam' | 'marking' | 'done', exam, answers, endsAt, submittedAt, marking }
  const [state, setState] = useState(() => loadExam());
  useEffect(() => saveExam(state), [state]);

  if (!state) return <Setup onStart={(paper, minutes) => setState({
    phase: 'exam', exam: buildExam(paper, minutes), answers: {}, endsAt: Date.now() + minutes * 60_000,
  })} />;

  if (state.phase === 'exam') {
    const submit = () => setState((s) => {
      if (s.phase !== 'exam') return s;
      const marking = {};
      allGroups(s.exam).forEach((g) => g.parts.forEach((p, i) => { marking[partKey(g, i)] = autoMark(p, s.answers[partKey(g, i)]); }));
      return { ...s, phase: 'marking', marking, submittedAt: Math.min(Date.now(), s.endsAt) };
    });
    return <ExamRoom state={state} setState={setState} onSubmit={submit} />;
  }

  if (state.phase === 'marking') {
    return <MarkingRoom state={state} setState={setState} onFinish={(byTopic, got, max) => {
      onRecord(byTopic.map((t) => ({ ...t, kind: 'exam' })), {
        type: `Exam simulation (${paperLabel(state.exam.paper)}, ${state.exam.minutes} min)`, got, max,
      });
      setState((s) => ({ ...s, phase: 'done' }));
    }} />;
  }

  return <Results state={state} onNew={() => setState(null)} onDeepDive={(t) => { setState(null); onDeepDive(t); }} />;
}

const paperLabel = (p) => (p === 'mixed' ? 'Mixed' : `Paper ${p}`);

function Setup({ onStart }) {
  const [paper, setPaper] = useState(1);
  const [minutes, setMinutes] = useState(15);
  const marks = targetMarks(minutes);
  return (
    <div className="stack narrow">
      <div className="card">
        <p className="eyebrow">GCSE exam simulation</p>
        <h2>Sit a timed mini paper</h2>
        <p className="muted">The questions are built in the style of OCR J277 past papers, with scenario-based questions in lettered parts, command words, marks in brackets, trace tables, logic, and Section B programming. The number of questions scales with the time you choose, at the real-exam rate of 80 marks in 90 minutes.</p>
        <h4>Paper</h4>
        <div className="choice-grid">
          {PAPER_CHOICES.map((c) => (
            <button key={c.id} className={`choice ${paper === c.id ? 'on' : ''}`} onClick={() => setPaper(c.id)}>
              <strong>{c.label}</strong><span>{c.note}</span>
            </button>
          ))}
        </div>
        <h4>Time</h4>
        <div className="chips">
          {TIME_OPTIONS.map((m) => (
            <button key={m} className={`chip-btn ${minutes === m ? 'on' : ''}`} onClick={() => setMinutes(m)}>
              {m === 90 ? '1 h 30 (full paper)' : m >= 60 ? `${m / 60} h` : `${m} min`}
            </button>
          ))}
        </div>
        <p className="summary-line">≈ <strong>{marks} marks</strong> in <strong>{minutes} minutes</strong>, so aim for about 1 minute per mark.
          {paper !== 2 && marks >= 35 && ' Includes an 8-mark extended response.'}
          {paper !== 1 && marks >= 18 && ' Includes Section B programming questions.'}</p>
        <button className="btn primary wide" onClick={() => onStart(paper, minutes)}>Start exam</button>
      </div>
    </div>
  );
}

function ExamRoom({ state, setState, onSubmit }) {
  const { exam, answers, endsAt } = state;
  const [now, setNow] = useState(Date.now());
  const left = (endsAt - now) / 1000;

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, []);
  useEffect(() => { if (left <= 0) onSubmit(); }, [left, onSubmit]);

  const setAnswer = (k, v) => setState((s) => ({ ...s, answers: { ...s.answers, [k]: v } }));
  const answeredCount = useMemo(() => Object.values(answers).filter((v) => v !== '' && v != null).length, [answers]);
  const partCount = allGroups(exam).reduce((t, g) => t + g.parts.length, 0);

  return (
    <div className="stack">
      <div className="exam-bar">
        <div>
          <strong>{paperLabel(exam.paper)}</strong> <span className="muted">· {exam.total} marks · {answeredCount}/{partCount} parts answered</span>
        </div>
        <div className={`clock ${left < 60 ? 'urgent' : left < 300 ? 'warn' : ''}`} aria-live="off">⏱ {formatTime(left)}</div>
        <button className="btn primary small" onClick={() => {
          if (window.confirm('Finish the exam now and move to marking?')) onSubmit();
        }}>Finish exam</button>
      </div>
      <div className="card cover">
        <h3>Instructions</h3>
        <ul>
          <li>Answer <strong>all</strong> the questions. The total mark for this paper is <strong>{exam.total}</strong> and you have <strong>{exam.minutes} minutes</strong>.</li>
          <li>The marks for each question are shown in brackets [ ]. Use the marks as a guide to how much to write.</li>
          <li>When time runs out, your paper is collected automatically and you mark it against the mark scheme.</li>
        </ul>
      </div>
      {exam.sections.map((s) => (
        <div key={s.title} className="stack">
          <h3 className="section-title">{s.title}</h3>
          {s.note && <p className="section-note">{s.note}</p>}
          {s.groups.map((g) => (
            <ExamGroup key={g.id} group={g} number={g.number} answers={answers} setAnswer={setAnswer} mode="answer" />
          ))}
        </div>
      ))}
      <div className="end-paper">
        <p className="muted">END OF QUESTION PAPER</p>
        <button className="btn primary" onClick={() => {
          if (window.confirm('Finish the exam now and move to marking?')) onSubmit();
        }}>Finish exam and mark</button>
      </div>
    </div>
  );
}

function tally(exam, marking) {
  const byTopic = {};
  let got = 0;
  for (const g of allGroups(exam)) {
    const t = (byTopic[g.topic] ||= { topic: g.topic, got: 0, max: 0 });
    g.parts.forEach((p, i) => {
      const s = marking[partKey(g, i)]?.score || 0;
      t.got += s;
      t.max += p.m;
      got += s;
    });
  }
  return { byTopic: Object.values(byTopic), got, max: exam.total };
}

function MarkingRoom({ state, setState, onFinish }) {
  const { exam, answers, marking } = state;
  const { byTopic, got, max } = tally(exam, marking);
  const setMark = (k, v) => setState((s) => ({ ...s, marking: { ...s.marking, [k]: v } }));
  return (
    <div className="stack">
      <div className="exam-bar">
        <div><strong>Marking</strong> <span className="muted">· go through each answer against the mark scheme</span></div>
        <div className="clock">{got} / {max}</div>
        <button className="btn primary small" onClick={() => onFinish(byTopic, got, max)}>See results</button>
      </div>
      <div className="card cover">
        <p>Short answers, tick boxes and tables are marked automatically. For written answers, tick each mark-scheme point you <em>genuinely</em> made, because examiners only credit what is actually written. Suggested ticks are a starting point only.</p>
      </div>
      {exam.sections.map((s) => (
        <div key={s.title} className="stack">
          <h3 className="section-title">{s.title}</h3>
          {s.groups.map((g) => (
            <ExamGroup key={g.id} group={g} number={g.number} answers={answers} mode="mark" marking={marking} setMarking={setMark} />
          ))}
        </div>
      ))}
      <div className="end-paper">
        <button className="btn primary" onClick={() => onFinish(byTopic, got, max)}>Finish marking: {got} / {max}</button>
      </div>
    </div>
  );
}

function Results({ state, onNew, onDeepDive }) {
  const { exam, marking, submittedAt, endsAt } = state;
  const { byTopic, got, max } = tally(exam, marking);
  const p = pct(got, max);
  const usedSecs = exam.minutes * 60 - Math.max(0, (endsAt - submittedAt) / 1000);
  const groups = allGroups(exam);
  const weakest = byTopic.slice().sort((a, b) => pct(a.got, a.max) - pct(b.got, b.max))[0];
  return (
    <div className="stack">
      <div className="card result-hero">
        <div>
          <p className="eyebrow">Exam simulation · {paperLabel(exam.paper)} · {exam.minutes} minutes</p>
          <h2 className="big-score">{got} / {max} <span className="muted">({p}%)</span></h2>
          <p>Indicative grade: <strong className="grade">{indicativeGrade(p)}</strong>{' '}
            <span className="small muted">(rough guide only, because real boundaries change every year)</span></p>
          <p className="muted">Time used: {formatTime(usedSecs)} of {exam.minutes}:00 · {groups.length} questions</p>
        </div>
        <div className="row">
          <button className="btn primary" onClick={onNew}>New simulation</button>
          {weakest && <button className="btn" onClick={() => onDeepDive(weakest.topic)}>Deep dive: weakest topic</button>}
        </div>
      </div>
      <div className="card">
        <h3>Marks by topic (weakest first)</h3>
        <TopicBars rows={byTopic} onDeepDive={onDeepDive} />
      </div>
      <div className="card">
        <h3>Marks by question</h3>
        <div className="table-wrap">
          <table className="grid">
            <thead><tr><th>Question</th><th>Topic</th><th>Mark</th></tr></thead>
            <tbody>
              {groups.map((g) => {
                const s = g.parts.reduce((t, _, i) => t + (marking[partKey(g, i)]?.score || 0), 0);
                return <tr key={g.id}><td>{g.number}</td><td>{g.topic}</td><td>{s} / {partsMarks(g.parts)}</td></tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
