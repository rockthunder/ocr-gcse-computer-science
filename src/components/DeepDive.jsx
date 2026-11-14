import { useMemo, useState } from 'react';
import { MCQS } from '../data/mcq.js';
import { PAPER1 } from '../data/paper1.js';
import { PAPER2 } from '../data/paper2.js';
import { PAPERS, TOPICS, topicById } from '../data/topics.js';
import { autoMark } from '../lib/marking.js';
import { mastery } from '../lib/storage.js';
import { pct, partsMarks, shuffle } from '../lib/util.js';
import ExamGroup, { partKey } from './ExamGroup.jsx';
import McqRunner from './McqRunner.jsx';

const ALL_GROUPS = [...PAPER1, ...PAPER2];

export default function DeepDive({ topicId, onSelect, progress, onRecord }) {
  if (!topicId) return <TopicPicker onSelect={onSelect} progress={progress} />;
  return <TopicDive key={topicId} topic={topicById[topicId]} onBack={() => onSelect(null)} onRecord={onRecord} />;
}

function TopicPicker({ onSelect, progress }) {
  return (
    <div className="stack">
      <div>
        <p className="eyebrow">Deep dive</p>
        <h2>Choose a topic</h2>
        <p className="muted">Each topic has key revision points, every multiple-choice question for that topic, and exam-style questions with mark schemes.</p>
      </div>
      {[1, 2].map((paper) => (
        <div key={paper}>
          <h3>{PAPERS[paper].code} {PAPERS[paper].name}</h3>
          <div className="topic-grid">
            {TOPICS.filter((t) => t.paper === paper).map((t) => {
              const m = mastery(progress.topics[t.id]);
              return (
                <button key={t.id} className="topic-tile" onClick={() => onSelect(t.id)}>
                  <span className="topic-id">{t.id}</span>
                  <span className="topic-name">{t.name}</span>
                  <MasteryBar value={m} />
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function MasteryBar({ value }) {
  if (value == null) return <span className="mastery muted small">Not tried yet</span>;
  const level = value >= 70 ? 'good' : value >= 45 ? 'mid' : 'bad';
  return (
    <span className="mastery">
      <span className="bar-track"><span className={`bar-fill ${level}`} style={{ width: `${Math.max(value, 2)}%` }} /></span>
      <span className="small">{value}%</span>
    </span>
  );
}

function TopicDive({ topic, onBack, onRecord }) {
  const [tab, setTab] = useState('notes');
  const mcqs = useMemo(() => MCQS.filter((q) => q.topic === topic.id), [topic.id]);
  const groups = useMemo(() => ALL_GROUPS.filter((g) => g.topic === topic.id), [topic.id]);

  return (
    <div className="stack">
      <div>
        <button className="btn ghost small" onClick={onBack}>← All topics</button>
        <p className="eyebrow">{PAPERS[topic.paper].code} · Topic {topic.id}</p>
        <h2>{topic.name}</h2>
      </div>
      <div className="tabs" role="tablist">
        {[['notes', 'Key points'], ['mcq', `Practice (${mcqs.length})`], ['exam', `Exam questions (${groups.length})`]].map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} className={`tab ${tab === id ? 'on' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>
      {tab === 'notes' && (
        <div className="card">
          <ul className="notes">{topic.notes.map((n) => <li key={n}>{n}</li>)}</ul>
          <button className="btn primary" onClick={() => setTab('mcq')}>Test yourself →</button>
        </div>
      )}
      {tab === 'mcq' && <Practice mcqs={mcqs} topic={topic} onRecord={onRecord} onExam={() => setTab('exam')} />}
      {tab === 'exam' && groups.map((g, i) => <GroupPractice key={g.id} group={g} number={i + 1} onRecord={onRecord} />)}
    </div>
  );
}

function Practice({ mcqs, topic, onRecord, onExam }) {
  const [round, setRound] = useState(0);
  const [result, setResult] = useState(null);
  const deck = useMemo(() => shuffle(mcqs), [mcqs, round]); // eslint-disable-line react-hooks/exhaustive-deps

  if (result) {
    const got = result.filter((r) => r.correct).length;
    return (
      <div className="card">
        <h3>{got} / {result.length} correct ({pct(got, result.length)}%)</h3>
        <p className="muted">{pct(got, result.length) >= 80 ? 'Strong! Now try the exam-style questions.' : 'Re-read the key points, then try again.'}</p>
        <div className="row">
          <button className="btn primary" onClick={() => { setResult(null); setRound(round + 1); }}>Try again</button>
          <button className="btn" onClick={onExam}>Exam questions →</button>
        </div>
      </div>
    );
  }
  return (
    <McqRunner key={round} questions={deck} onFinish={(r) => {
      setResult(r);
      onRecord([{ topic: topic.id, kind: 'mcq', got: r.filter((x) => x.correct).length, max: r.length }],
        { type: `Deep dive ${topic.id} practice`, got: r.filter((x) => x.correct).length, max: r.length });
    }} />
  );
}

function GroupPractice({ group, number, onRecord }) {
  const [answers, setAnswers] = useState({});
  const [marking, setMarking] = useState(null);
  const [saved, setSaved] = useState(false);

  const check = () => {
    const m = {};
    group.parts.forEach((p, i) => { m[partKey(group, i)] = autoMark(p, answers[partKey(group, i)]); });
    setMarking(m);
  };
  const got = marking ? group.parts.reduce((t, _, i) => t + marking[partKey(group, i)].score, 0) : 0;
  const max = partsMarks(group.parts);

  return (
    <div>
      <ExamGroup group={group} number={number} answers={answers} mode={marking ? 'mark' : 'answer'}
        setAnswer={(k, v) => setAnswers((a) => ({ ...a, [k]: v }))}
        marking={marking || {}} setMarking={(k, v) => setMarking((m) => ({ ...m, [k]: v }))} />
      <div className="row group-actions">
        {!marking && <button className="btn primary" onClick={check}>Check my answers</button>}
        {marking && !saved && (
          <button className="btn primary" onClick={() => {
            setSaved(true);
            onRecord([{ topic: group.topic, kind: 'exam', got, max }], null);
          }}>Save mark ({got}/{max})</button>
        )}
        {marking && (
          <button className="btn" onClick={() => { setAnswers({}); setMarking(null); setSaved(false); }}>Reset question</button>
        )}
        {saved && <span className="good-text">Saved to your progress ✓</span>}
      </div>
    </div>
  );
}
