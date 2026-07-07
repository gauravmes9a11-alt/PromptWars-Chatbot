import { useState } from "react";

export default function BriefGenerator({ gates, incidents, venueName }) {
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gates, incidents, venueName }),
      });
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      setBrief(data.brief);
    } catch (err) {
      setError(
        "Couldn't reach the assistant service. Set ANTHROPIC_API_KEY on the server to enable this — see README."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-ink-light border border-line rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display uppercase tracking-widest2 text-xs text-crimson">
          Situation Brief
        </span>
        <button
          onClick={generate}
          disabled={loading}
          className="bg-amber text-ink font-display uppercase tracking-widest2 text-xs px-3 py-1.5 rounded-md disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate"}
        </button>
      </div>
      {!brief && !error && (
        <p className="text-sm text-paper/50 font-mono">
          Synthesize live gate, crowd and incident signals into a plain-language brief with recommended actions.
        </p>
      )}
      {error && <p className="text-sm text-crimson">{error}</p>}
      {brief && (
        <div className="text-sm text-paper/85 leading-relaxed whitespace-pre-wrap font-body">
          {brief}
        </div>
      )}
    </div>
  );
}
