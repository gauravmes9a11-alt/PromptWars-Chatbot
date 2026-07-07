export default function SustainabilityCard() {
  return (
    <div className="bg-ink-light border border-line rounded-xl p-4 sm:p-5">
      <div className="font-display uppercase tracking-widest2 text-xs text-teal mb-2">
        Sustainability
      </div>
      <p className="text-sm text-paper/80 leading-relaxed mb-3">
        Taking the Rail Connector instead of rideshare for this match saves
        an estimated <span className="text-amber font-semibold">2.1 kg CO₂</span> per fan.
      </p>
      <div className="flex items-center gap-3 text-[11px] font-mono text-paper/50">
        <span>♻ Reusable cup return: Gates B, D</span>
      </div>
    </div>
  );
}
