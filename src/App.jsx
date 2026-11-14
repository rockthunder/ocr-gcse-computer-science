import { useCallback, useEffect, useState } from 'react';
import { TOPICS } from './data/topics.js';
import { MCQS } from './data/mcq.js';
import { PAPER1 } from './data/paper1.js';
import { PAPER2 } from './data/paper2.js';
import { addResults, loadExam, loadProgress, mastery, saveProgress } from './lib/storage.js';
import { pct } from './lib/util.js';
import QuickFire from './components/QuickFire.jsx';
import DeepDive, { MasteryBar } from './components/DeepDive.jsx';
import Simulation from './components/Simulation.jsx';

const NAV = [
  ['home', 'Home'],
  ['quick', 'Quick-fire'],
  ['deep', 'Deep dive'],
  ['sim', 'Exam simulation'],
];

export default function App() {
  const [view, setView] = useState({ name: 'home' });
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => saveProgress(progress), [progress]);
  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const record = useCallback((results, history) => setProgress((p) => addResults(p, results, history)), []);
  const go = (name, extra = {}) => setView({ name, ...extra });
  const deepDive = (topic) => go('deep', { topic });

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => go('home')}>
          <span className="logo">01</span>
          <span><strong>J277 Exam Trainer</strong><small>OCR GCSE Computer Science</small></span>
        </button>
        <nav>
          {NAV.map(([id, label]) => (
            <button key={id} className={`nav-btn ${view.name === id ? 'on' : ''}`} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>
      </header>
      <main className="main">
        {view.name === 'home' && <Home progress={progress} go={go} onDeepDive={deepDive} onReset={() => setProgress({ topics: {}, history: [] })} />}
        {view.name === 'quick' && <QuickFire onRecord={record} onDeepDive={deepDive} />}
        {view.name === 'deep' && <DeepDive topicId={view.topic} onSelect={(t) => go('deep', { topic: t })} progress={progress} onRecord={record} />}
        {view.name === 'sim' && <Simulation onRecord={record} onDeepDive={deepDive} />}
      </main>
      <footer className="footer">
        Unofficial revision tool for OCR GCSE (9–1) Computer Science J277. Questions are written in the style of OCR papers and are not OCR material.
        Your progress is saved in this browser only.
      </footer>
    </div>
  );
}

function Home({ progress, go, onDeepDive, onReset }) {
  const tried = TOPICS.map((t) => ({ t, m: mastery(progress.topics[t.id]) })).filter((x) => x.m != null);
  const weakest = tried.slice().sort((a, b) => a.m - b.m).slice(0, 3);
  const examInProgress = loadExam()?.phase === 'exam';
  const examMarks = [...PAPER1, ...PAPER2].reduce((t, g) => t + g.parts.reduce((s, p) => s + p.m, 0), 0);

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">OCR GCSE Computer Science · J277</p>
        <h1>Find your gaps. Fix them. Practise under exam conditions.</h1>
        <p className="lede">Start with a quick-fire test to see where you are weak, then dive deep into a topic or sit a timed exam simulation built like the real Paper 1 and Paper 2.</p>
        {examInProgress && (
          <button className="btn primary" onClick={() => go('sim')}>Resume your exam in progress →</button>
        )}
      </section>

      <section className="modes">
        <button className="mode-card" onClick={() => go('quick')}>
          <span className="step">1</span>
          <h3>Quick-fire diagnostic</h3>
          <p>Rapid multiple-choice questions across all 11 topics, with instant feedback and a breakdown of your weakest areas.</p>
          <span className="go">Start →</span>
        </button>
        <button className="mode-card" onClick={() => go('deep')}>
          <span className="step">2</span>
          <h3>Topic deep dive</h3>
          <p>Pick a topic: key points, every practice question for it, and exam-style questions with mark schemes.</p>
          <span className="go">Choose a topic →</span>
        </button>
        <button className="mode-card" onClick={() => go('sim')}>
          <span className="step">3</span>
          <h3>GCSE exam simulation</h3>
          <p>Choose 10 minutes up to a full 1 h 30 paper. The questions scale to the time, then you mark your paper against the mark scheme.</p>
          <span className="go">Set up exam →</span>
        </button>
      </section>

      <section className="card">
        <div className="card-head">
          <h3>Your topic mastery</h3>
          {tried.length > 0 && <button className="btn ghost small" onClick={() => window.confirm('Clear all saved progress?') && onReset()}>Reset progress</button>}
        </div>
        {tried.length === 0 ? (
          <p className="muted">No results yet. Take a quick-fire test to see your strengths and weaknesses.</p>
        ) : (
          <>
            <p>Focus next on: {weakest.map(({ t, m }, i) => (
              <span key={t.id}>{i > 0 && ', '}<button className="link" onClick={() => onDeepDive(t.id)}>{t.name}</button> ({m}%)</span>
            ))}</p>
            <div className="mastery-grid">
              {TOPICS.map((t) => (
                <button key={t.id} className="mastery-item" onClick={() => onDeepDive(t.id)}>
                  <span><span className="topic-id">{t.id}</span> {t.name}</span>
                  <MasteryBar value={mastery(progress.topics[t.id])} />
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {progress.history.length > 0 && (
        <section className="card">
          <h3>Recent activity</h3>
          <ul className="history">
            {progress.history.slice(0, 8).map((h) => (
              <li key={h.at}>
                <span>{h.type}</span>
                <span className="muted small">{new Date(h.at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                <span className="strong">{h.got}/{h.max} ({pct(h.got, h.max)}%)</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="stats">
        <div><strong>{MCQS.length}</strong><span>quick-fire questions</span></div>
        <div><strong>{PAPER1.length + PAPER2.length}</strong><span>exam-style questions</span></div>
        <div><strong>{examMarks}</strong><span>marks of exam practice</span></div>
        <div><strong>{TOPICS.length}</strong><span>specification topics</span></div>
      </section>
    </div>
  );
}
