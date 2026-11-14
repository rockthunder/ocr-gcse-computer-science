import { topicById } from '../data/topics.js';
import { pct } from '../lib/util.js';

// Per-topic score bars, weakest first. rows: [{ topic, got, max }]
export default function TopicBars({ rows, onDeepDive }) {
  const sorted = rows.slice().sort((a, b) => pct(a.got, a.max) - pct(b.got, b.max));
  return (
    <div className="bars">
      {sorted.map((r) => {
        const p = pct(r.got, r.max);
        const level = p >= 70 ? 'good' : p >= 45 ? 'mid' : 'bad';
        return (
          <div className="bar-row" key={r.topic}>
            <div className="bar-label">
              <span className="topic-id">{r.topic}</span> {topicById[r.topic].name}
            </div>
            <div className="bar-track"><div className={`bar-fill ${level}`} style={{ width: `${Math.max(p, 2)}%` }} /></div>
            <div className="bar-value">{r.got}/{r.max}</div>
            {onDeepDive && (
              <button className={`btn small ${level === 'bad' ? 'primary' : ''}`} onClick={() => onDeepDive(r.topic)}>Deep dive</button>
            )}
          </div>
        );
      })}
    </div>
  );
}
