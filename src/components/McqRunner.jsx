import { useCallback, useEffect, useMemo, useState } from 'react';
import { topicById } from '../data/topics.js';
import { shuffle } from '../lib/util.js';

// Runs a list of multiple choice questions one at a time with instant feedback.
// onFinish receives [{ q, chosen, correct }] where chosen is an option index or null (timed out).
export default function McqRunner({ questions, timeLimit = 0, onFinish, onQuit }) {
  const deck = useMemo(() => questions.map((q) => ({ ...q, order: shuffle(q.options.map((_, i) => i)) })), [questions]);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(undefined);
  const [results, setResults] = useState([]);
  const [left, setLeft] = useState(timeLimit);

  const q = deck[index];
  const answered = chosen !== undefined;

  const answer = useCallback((optionIndex) => {
    if (answered) return;
    setChosen(optionIndex);
    setResults((r) => [...r, { q, chosen: optionIndex, correct: optionIndex === q.answer }]);
  }, [answered, q]);

  const next = useCallback(() => {
    if (!answered) return;
    if (index + 1 >= deck.length) {
      onFinish(results);
      return;
    }
    setIndex(index + 1);
    setChosen(undefined);
    setLeft(timeLimit);
  }, [answered, index, deck.length, onFinish, results, timeLimit]);

  useEffect(() => {
    if (!timeLimit || answered) return undefined;
    if (left <= 0) {
      answer(null);
      return undefined;
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLimit, left, answered, answer]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input, textarea, select')) return;
      const n = Number(e.key);
      if (!answered && n >= 1 && n <= q.order.length) answer(q.order[n - 1]);
      else if (answered && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, answer, next, q]);

  const score = results.filter((r) => r.correct).length;

  return (
    <div className="mcq">
      <div className="mcq-top">
        <span className="muted">Question {index + 1} of {deck.length}</span>
        <span className="muted">Score {score}</span>
        {onQuit && <button className="btn ghost small" onClick={onQuit}>Quit</button>}
      </div>
      <div className="progress"><div style={{ width: `${(index / deck.length) * 100}%` }} /></div>
      {timeLimit > 0 && (
        <div className={`qtimer ${left <= 5 && !answered ? 'urgent' : ''}`}>
          <div style={{ width: `${(left / timeLimit) * 100}%` }} />
        </div>
      )}
      <div className="card mcq-card">
        <span className="chip">{q.topic} {topicById[q.topic].name}</span>
        <h2 className="mcq-q">{q.q}</h2>
        <div className="options">
          {q.order.map((oi, n) => {
            let cls = 'option';
            if (answered) {
              if (oi === q.answer) cls += ' correct';
              else if (oi === chosen) cls += ' wrong';
              else cls += ' dim';
            }
            return (
              <button key={oi} className={cls} onClick={() => answer(oi)} disabled={answered}>
                <span className="key">{n + 1}</span>
                <span>{q.options[oi]}</span>
              </button>
            );
          })}
        </div>
        {answered && (
          <div className={`feedback ${chosen === q.answer ? 'good' : 'bad'}`} role="status">
            <strong>{chosen === q.answer ? 'Correct!' : chosen === null ? 'Out of time.' : 'Not quite.'}</strong> {q.explain}
            <div className="feedback-actions">
              <button className="btn primary" onClick={next} autoFocus>
                {index + 1 >= deck.length ? 'See results' : 'Next'} <span className="kbd">Enter</span>
              </button>
            </div>
          </div>
        )}
        {!answered && <p className="hint">Tip: press 1–{q.order.length} to answer</p>}
      </div>
    </div>
  );
}
