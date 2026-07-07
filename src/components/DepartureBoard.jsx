import SplitFlap from "./SplitFlap.jsx";

const CROWD_LABEL = { low: "LOW", moderate: "MODERATE", high: "HIGH" };
const CROWD_TONE = { low: "teal", moderate: "amber", high: "amber" };

export default function DepartureBoard({ gates, shuttles }) {
  return (
    <div className="bg-ink-light border border-line rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display uppercase tracking-widest2 text-xs text-teal">
          Live Gate Board
        </span>
        <span className="font-mono text-[11px] text-paper/50">Auto-refresh · 30s</span>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-y-3 gap-x-3 sm:gap-x-6 items-center">
        {gates.map((g) => (
          <RowFragment key={g.id} gate={g} />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-line">
        <div className="font-display uppercase tracking-widest2 text-xs text-amber mb-3">
          Transit
        </div>
        <div className="space-y-2">
          {shuttles.map((s) => (
            <div key={s.route} className="flex items-center justify-between font-mono text-sm">
              <span className="text-paper/80">{s.route}</span>
              <span className="text-teal">{s.eta} MIN</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RowFragment({ gate }) {
  return (
    <>
      <SplitFlap text={gate.id} size={20} tone="paper" />
      <div className="min-w-0">
        <div className="text-sm text-paper/90 truncate">{gate.note}</div>
        {gate.accessible && (
          <div className="text-[11px] text-teal/80 font-mono">♿ accessible entrance</div>
        )}
      </div>
      <SplitFlap text={`${gate.wait}M`} size={18} tone="amber" />
      <span
        className={`font-mono text-[11px] px-2 py-1 rounded ${
          gate.crowd === "high"
            ? "bg-crimson/20 text-crimson"
            : gate.crowd === "moderate"
            ? "bg-amber/20 text-amber"
            : "bg-teal/20 text-teal"
        }`}
      >
        {CROWD_LABEL[gate.crowd]}
      </span>
    </>
  );
}
