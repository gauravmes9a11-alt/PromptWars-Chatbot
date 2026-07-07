const TONE = {
  info: "text-teal",
  warn: "text-amber",
  critical: "text-crimson",
};

export default function AlertTicker({ incidents }) {
  const items = [...incidents, ...incidents];
  return (
    <div className="bg-ink-light border border-line rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-line">
        <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
        <span className="font-display uppercase tracking-widest2 text-xs">Live Ops Ticker</span>
      </div>
      <div className="relative overflow-hidden py-3">
        <div className="ticker-track flex gap-10 whitespace-nowrap w-max px-4">
          {items.map((it, i) => (
            <span key={i} className={`font-mono text-sm ${TONE[it.level]}`}>
              ● {it.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
