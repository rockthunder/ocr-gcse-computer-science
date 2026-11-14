import { useState } from 'react';
import { MCQS } from '../data/mcq.js';
import { TOPICS, topicById } from '../data/topics.js';
import { shuffle, pct } from '../lib/util.js';
import McqRunner from './McqRunner.jsx';
import TopicBars from './TopicBars.jsx';

const LENGTHS = [
  { per: 2, label: 'Short', note: '22 questions, about 5 minutes' },
  { per: 3, label: 'Standard', note: '33 questions, about 8 minutes' },
  { per: 5, label: 'Thorough', note: '55 questions, about 15 minutes' },
];

function buildDeck(per) {
  const picked = TOPICS.flatMap((t) => shuffle(MCQS.filter((q) => q.topic === t.id)).slice(0, per));
  return shuffle(picked);
}

export default function QuickFire({ onRecord, onDeepDive }) {
  const [per, setPer] = useState(2);
  const [timed, setTimed] = useState(true);
  const [deck, setDeck] = useState(null);
  const [results, setResults] = useState(null);

  if (deck && !results) {
    return (
      <McqRunner questions={deck} timeLimit={timed ? 20 : 0} onQuit={() => setDeck(null)}
        onFinish={(r) => {
          setResults(r);
          const byTopic = summarise(r);
          onRecord(byTopic.map((t) => ({ ...t, kind: 'mcq' })), {
            type: 'Quick-fire', got: r.filter((x) => x.correct).length, max: r.length,
          });
        }} />
    );
  }

  if (results) {
    const byTopic = summarise(results);
    const got = results.filter((r) => r.correct).length;
    const weak = byTopic.filter((t) => pct(t.got, t.max) < 60).sort((a, b) => pct(a.got, a.max) - pct(b.got, b.max));
    const wrong = results.filter((r) => !r.correct);
    return (
      <div className="stack">
        <div className="card result-hero">
          <div>
            <p className="eyebrow">Quick-fire results</p>
            <h2 className="big-score">{got} / {results.length} <span className="muted">({pct(got, results.length)}%)</span></h2>
            <p>{weak.length
              ? <>Your weakest areas: <strong>{weak.slice(0, 3).map((t) => topicById[t.topic].name).join(', ')}</strong>. Pick one for a deep dive below.</>
              : 'No weak topics this time. Try a timed exam simulation to test your written answers.'}</p>
          </div>
          <div className="row">
            <button className="btn primary" onClick={() => { setResults(null); setDeck(buildDeck(per)); }}>Try again</button>
            <button className="btn" onClick={() => { setResults(null); setDeck(null); }}>Change settings</button>
          </div>
        </div>
        <div className="card">
          <h3>Topic breakdown (weakest first)</h3>
          <TopicBars rows={byTopic} onDeepDive={onDeepDive} />
        </div>
        {wrong.length > 0 && (
          <div className="card">
            <h3>Review your mistakes</h3>
            <ul className="review-list">
              {wrong.map(({ q, chosen }) => (
                <li key={q.id}>
                  <p className="strong">{q.q}</p>
                  {chosen != null ? <p className="bad-text">✗ {q.options[chosen]}</p> : <p className="bad-text">✗ Out of time</p>}
                  <p className="good-text">✓ {q.options[q.answer]}</p>
                  <p className="small muted">{q.explain}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="stack narrow">
      <div className="card">
        <p className="eyebrow">Quick-fire diagnostic</p>
        <h2>Find your weak spots</h2>
        <p className="muted">These multiple-choice questions cover every topic on both J277 papers. You get instant feedback after each one, then a topic-by-topic breakdown showing where to focus.</p>
        <h4>Length</h4>
        <div className="choice-grid">
          {LENGTHS.map((l) => (
            <button key={l.per} className={`choice ${per === l.per ? 'on' : ''}`} onClick={() => setPer(l.per)}>
              <strong>{l.label}</strong><span>{l.note}</span>
            </button>
          ))}
        </div>
        <label className="switch">
          <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
          <span>20 seconds per question</span>
        </label>
        <button className="btn primary wide" onClick={() => setDeck(buildDeck(per))}>Start quick-fire</button>
      </div>
    </div>
  );
}

function summarise(results) {
  const map = {};
  for (const r of results) {
    const t = (map[r.q.topic] ||= { topic: r.q.topic, got: 0, max: 0 });
    t.max++;
    if (r.correct) t.got++;
  }
  return Object.values(map);
}
