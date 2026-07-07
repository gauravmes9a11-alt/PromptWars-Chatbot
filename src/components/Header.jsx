import { VENUES, LANGUAGES } from "../data/venues.js";

export default function Header({ mode, setMode, venue, setVenue, language, setLanguage }) {
  return (
    <header className="border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-amber flex items-center justify-center font-display font-bold text-ink text-lg">
            C
          </div>
          <div>
            <div className="font-display uppercase tracking-widest2 text-sm leading-none">Concourse</div>
            <div className="text-[11px] text-paper/45 font-mono leading-none mt-1">FIFA World Cup 2026 · Stadium Copilot</div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <select
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="bg-ink-light border border-line text-paper text-sm rounded-md px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-teal"
          >
            {VENUES.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-ink-light border border-line text-paper text-sm rounded-md px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-teal"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>

          <div className="flex bg-ink-light border border-line rounded-md p-1">
            {["fan", "staff"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded text-xs font-display uppercase tracking-widest2 transition-colors ${
                  mode === m ? "bg-amber text-ink" : "text-paper/60 hover:text-paper"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
