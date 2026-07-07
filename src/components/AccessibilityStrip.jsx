import { useState } from "react";

const OPTIONS = [
  { key: "contrast", label: "High Contrast", icon: "◐" },
  { key: "text", label: "Large Text", icon: "A+" },
  { key: "route", label: "Step-Free Routes", icon: "♿" },
  { key: "sensory", label: "Sensory Room Finder", icon: "✺" },
];

export default function AccessibilityStrip({ onChange }) {
  const [active, setActive] = useState({});

  function toggle(key) {
    const next = { ...active, [key]: !active[key] };
    setActive(next);
    onChange?.(next);
  }

  return (
    <div className="bg-ink-light border border-line rounded-xl p-4 sm:p-5">
      <div className="font-display uppercase tracking-widest2 text-xs text-amber mb-3">
        Accessibility
      </div>
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map((o) => (
          <button
            key={o.key}
            onClick={() => toggle(o.key)}
            aria-pressed={!!active[o.key]}
            className={`text-left text-sm rounded-lg px-3 py-2 border transition-colors ${
              active[o.key]
                ? "bg-teal text-ink border-teal"
                : "bg-ink border-line text-paper/80 hover:border-teal/60"
            }`}
          >
            <span className="mr-2">{o.icon}</span>
            {o.label}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-paper/40 mt-3 font-mono leading-relaxed">
        Step-free routes are generated live from gate elevator status and current crowd density.
      </p>
    </div>
  );
}
