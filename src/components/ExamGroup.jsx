import { topicById } from '../data/topics.js';
import { isAuto } from '../lib/marking.js';
import { partsMarks } from '../lib/util.js';

const LETTERS = 'abcdefghijklmnop';
export const partKey = (group, i) => `${group.id}:${i}`;

// One exam question (a context plus lettered parts). mode = 'answer' | 'mark'.
export default function ExamGroup({ group, number, answers, setAnswer, mode, marking, setMarking }) {
  const total = partsMarks(group.parts);
  const got = mode === 'mark' ? group.parts.reduce((t, _, i) => t + (marking[partKey(group, i)]?.score || 0), 0) : null;
  return (
    <section className="card qgroup">
      <header className="qgroup-head">
        <h3>{number != null ? `Question ${number}` : 'Question'}</h3>
        <span className="chip">{group.topic} {topicById[group.topic].name}</span>
        <span className="qgroup-marks">{mode === 'mark' ? `${got} / ${total}` : `${total} marks`}</span>
      </header>
      {group.ctx && <p className="ctx">{group.ctx}</p>}
      {group.code && <pre className="code">{group.code}</pre>}
      {group.data && <DataTable data={group.data} />}
      {group.parts.map((part, i) => {
        const key = partKey(group, i);
        return (
          <div className="part" key={key}>
            <div className="part-head">
              {group.parts.length > 1 && <span className="part-label">({LETTERS[i]})</span>}
              <p className="part-prompt">{part.p}</p>
              <span className="part-marks">[{part.m}]</span>
            </div>
            {mode === 'answer'
              ? <PartInput part={part} value={answers[key]} onChange={(v) => setAnswer(key, v)} />
              : <PartReview part={part} value={answers[key]} mark={marking[key]} onMark={(m) => setMarking(key, m)} />}
          </div>
        );
      })}
    </section>
  );
}

function DataTable({ data }) {
  return (
    <div className="table-wrap">
      <table className="grid">
        <thead><tr>{data.cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{data.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function PartInput({ part, value, onChange }) {
  switch (part.t) {
    case 'short':
      return <input className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="Your answer" spellCheck={false} />;
    case 'mcq':
      return (
        <div className="ticks">
          {part.opts.map((o, i) => (
            <label key={o} className={`tick ${value === i ? 'on' : ''}`}>
              <input type="radio" checked={value === i} onChange={() => onChange(i)} /> {o}
            </label>
          ))}
        </div>
      );
    case 'table':
      return <AnswerTable part={part} value={value || {}} onChange={(k, v) => onChange({ ...(value || {}), [k]: v })} />;
    case 'extended':
      return (
        <textarea className="input area" rows={14} value={value ?? ''} onChange={(e) => onChange(e.target.value)}
          placeholder="Plan briefly, cover several areas, use the scenario, and finish with a conclusion." />
      );
    default:
      return (
        <textarea className={`input area ${part.code ? 'mono' : ''}`} rows={part.code ? Math.max(4, part.m + 3) : Math.max(2, Math.ceil(part.m * 1.5))}
          value={value ?? ''} onChange={(e) => onChange(e.target.value)} spellCheck={!part.code}
          placeholder={part.code ? 'Write your code here (OCR Exam Reference Language or Python)' : 'Your answer'}
          onKeyDown={part.code ? insertTab : undefined} />
      );
  }
}

function insertTab(e) {
  if (e.key !== 'Tab') return;
  e.preventDefault();
  const el = e.currentTarget;
  const { selectionStart: s, selectionEnd: end } = el;
  el.setRangeText('    ', s, end, 'end');
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

function AnswerTable({ part, value, onChange, review }) {
  return (
    <div className="table-wrap">
      <table className="grid">
        <thead><tr>{part.cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {part.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => {
                const k = `${r}-${c}`;
                if (!cell || typeof cell !== 'object') return <td key={k}>{cell}</td>;
                if (review) {
                  const ok = review[k];
                  const expected = Array.isArray(cell.a) ? cell.a[0] : cell.a;
                  return (
                    <td key={k} className={ok ? 'cell-ok' : 'cell-bad'}>
                      {value[k] || <em className="muted">blank</em>} {ok ? '✓' : <span className="expected">→ {expected}</span>}
                    </td>
                  );
                }
                return (
                  <td key={k} className="cell-input">
                    {cell.opts ? (
                      <select className="input" value={value[k] ?? ''} onChange={(e) => onChange(k, e.target.value)}>
                        <option value="">Choose…</option>
                        {cell.opts.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input className="input" value={value[k] ?? ''} onChange={(e) => onChange(k, e.target.value)} aria-label={`${part.cols[c]} row ${r + 1}`} />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const LEVELS = [
  { band: 'Level 3', range: [6, 8], text: 'Thorough knowledge and understanding. Wide range of considerations in relation to the context. Well-developed, consistent and balanced discussion with a reasoned conclusion.' },
  { band: 'Level 2', range: [3, 5], text: 'Reasonable knowledge and understanding. Some consideration of the context. Discussion is partially developed and may lack balance.' },
  { band: 'Level 1', range: [1, 2], text: 'Basic knowledge with limited understanding. Little consideration of the context. Points are mostly descriptive.' },
];

function PartReview({ part, value, mark, onMark }) {
  const score = mark?.score ?? 0;
  const setScore = (s) => onMark({ ...mark, score: Math.max(0, Math.min(part.m, s)) });
  const toggleTick = (i) => {
    const ticks = mark.ticks.map((t, j) => (j === i ? !t : t));
    onMark({ ...mark, ticks, score: part.t === 'extended' ? score : Math.min(part.m, ticks.filter(Boolean).length) });
  };

  return (
    <div className="review">
      <div className="your-answer">
        <span className="label">Your answer</span>
        {part.t === 'table' ? <AnswerTable part={part} value={value || {}} review={mark.cells} />
          : part.t === 'mcq' ? <p>{value != null ? part.opts[value] : <em className="muted">No answer</em>}</p>
            : value ? <pre className={`answer-text ${part.code ? 'mono' : ''}`}>{value}</pre>
              : <p><em className="muted">No answer</em></p>}
      </div>

      {isAuto(part) && (
        <div className="scheme">
          <span className="label">Mark scheme</span>
          {part.t === 'mcq' && <p>Correct answer: <strong>{part.opts[part.ans]}</strong></p>}
          {part.ms && <ul>{part.ms.map((m) => <li key={m}>{m}</li>)}</ul>}
          <p className="small muted">Marked automatically. Adjust if your answer is a valid alternative.</p>
        </div>
      )}

      {(part.t === 'written') && (
        <div className="scheme">
          <span className="label">Mark scheme: tick each point your answer makes (max {part.m})</span>
          {mark.ticks.map((on, i) => (
            <label key={i} className={`check ${on ? 'on' : ''}`}>
              <input type="checkbox" checked={on} onChange={() => toggleTick(i)} /> {part.ms[i]}
            </label>
          ))}
          <p className="small muted">Ticks are pre-suggested from keywords, so check each one honestly. Code answers earn credit for equivalent logic in any language.</p>
        </div>
      )}

      {part.t === 'extended' && (
        <div className="scheme">
          <span className="label">Indicative content: tick the points you covered</span>
          {mark.ticks.map((on, i) => (
            <label key={i} className={`check ${on ? 'on' : ''}`}>
              <input type="checkbox" checked={on} onChange={() => toggleTick(i)} /> {part.ms[i]}
            </label>
          ))}
          <span className="label" style={{ marginTop: 12 }}>Levels of response: choose your mark</span>
          <div className="levels">
            {LEVELS.map((l) => (
              <div key={l.band} className="level">
                <div className="level-head"><strong>{l.band}</strong> <span className="muted">({l.range[0]}–{l.range[1]} marks)</span></div>
                <p className="small">{l.text}</p>
                <div className="level-marks">
                  {Array.from({ length: l.range[1] - l.range[0] + 1 }, (_, k) => l.range[0] + k).map((m) => (
                    <button key={m} className={`btn small ${score === m ? 'primary' : ''}`} onClick={() => setScore(m)}>{m}</button>
                  ))}
                </div>
              </div>
            ))}
            <button className={`btn small ${score === 0 ? 'primary' : ''}`} onClick={() => setScore(0)}>0 – nothing worthy of credit</button>
          </div>
        </div>
      )}

      <div className="mark-row">
        <span className={`badge ${score === part.m ? 'good' : score === 0 ? 'bad' : 'mid'}`}>{score} / {part.m}</span>
        {part.t !== 'written' && part.t !== 'extended' && (
          <span className="stepper">
            <button className="btn small" onClick={() => setScore(score - 1)} disabled={score <= 0} aria-label="Decrease mark">−</button>
            <button className="btn small" onClick={() => setScore(score + 1)} disabled={score >= part.m} aria-label="Increase mark">+</button>
          </span>
        )}
      </div>
    </div>
  );
}
