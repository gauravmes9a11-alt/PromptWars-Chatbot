import { useState } from "react";
import Header from "./components/Header.jsx";
import DepartureBoard from "./components/DepartureBoard.jsx";
import ChatAssistant from "./components/ChatAssistant.jsx";
import AccessibilityStrip from "./components/AccessibilityStrip.jsx";
import SustainabilityCard from "./components/SustainabilityCard.jsx";
import AlertTicker from "./components/AlertTicker.jsx";
import CrowdPanel from "./components/CrowdPanel.jsx";
import BriefGenerator from "./components/BriefGenerator.jsx";
import TaskBoard from "./components/TaskBoard.jsx";
import { VENUES } from "./data/venues.js";
import { GATE_SEED, SHUTTLES, INCIDENT_SEED } from "./data/gates.js";

export default function App() {
  const [mode, setMode] = useState("fan");
  const [venue, setVenue] = useState(VENUES[0].id);
  const [language, setLanguage] = useState("en");

  const venueName = VENUES.find((v) => v.id === venue)?.name ?? "";

  return (
    <div className="min-h-screen bg-ink text-paper font-body">
      <Header
        mode={mode}
        setMode={setMode}
        venue={venue}
        setVenue={setVenue}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {mode === "fan" ? (
          <FanView venueName={venueName} language={language} />
        ) : (
          <StaffView venueName={venueName} />
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-[11px] font-mono text-paper/30 border-t border-line">
        Concourse · Built for FIFA World Cup 2026 stadium operations · Mock data for demonstration
      </footer>
    </div>
  );
}

function FanView({ venueName, language }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display uppercase text-3xl sm:text-4xl tracking-tight">
          Every gate. Every language.
        </h1>
        <p className="text-paper/50 mt-2 font-mono text-sm">{venueName} · match day</p>
      </div>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
        <div className="space-y-6">
          <DepartureBoard gates={GATE_SEED} shuttles={SHUTTLES} />
          <ChatAssistant venueName={venueName} language={language} gates={GATE_SEED} />
        </div>
        <div className="space-y-6">
          <AccessibilityStrip />
          <SustainabilityCard />
        </div>
      </div>
    </div>
  );
}

function StaffView({ venueName }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display uppercase text-3xl sm:text-4xl tracking-tight">
          Operational Intelligence
        </h1>
        <p className="text-paper/50 mt-2 font-mono text-sm">{venueName} · staff & volunteer console</p>
      </div>

      <div className="space-y-6">
        <AlertTicker incidents={INCIDENT_SEED} />
        <div className="grid lg:grid-cols-2 gap-6">
          <CrowdPanel gates={GATE_SEED} />
          <BriefGenerator gates={GATE_SEED} incidents={INCIDENT_SEED} venueName={venueName} />
        </div>
        <TaskBoard />
      </div>
    </div>
  );
}
