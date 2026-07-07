const CROWD_HEIGHT = { low: "35%", moderate: "65%", high: "92%" };
const CROWD_COLOR = { low: "bg-teal", moderate: "bg-amber", high: "bg-crimson" };

export default function CrowdPanel({ gates }) {
  return (
    <div className="bg-ink-light border border-line rounded-xl p-4 sm:p-5">
      <div className="font-display uppercase tracking-widest2 text-xs text-teal mb-4">
        Concourse Density
      </div>
      <div className="flex items-end gap-3 h-32">
        {gates.map((g) => (
          <div key={g.id} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div className="w-full bg-ink rounded-t-md flex-1 flex items-end overflow-hidden">
              <div
                className={`w-full rounded-t-md ${CROWD_COLOR[g.crowd]} transition-all`}
                style={{ height: CROWD_HEIGHT[g.crowd] }}
              />
            </div>
            <span className="font-mono text-[11px] text-paper/60">GATE {g.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
