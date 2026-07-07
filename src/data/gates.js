// Mock live-feed seed data. In production this would come from turnstile
// sensors, CCTV crowd-density models, and transit APIs per venue.
export const GATE_SEED = [
  { id: "A", wait: 6, crowd: "low", accessible: true, note: "Nearest to Metro" },
  { id: "B", wait: 14, crowd: "moderate", accessible: false, note: "Family zone" },
  { id: "C", wait: 22, crowd: "high", accessible: true, note: "Accessible drop-off" },
  { id: "D", wait: 9, crowd: "low", accessible: false, note: "Press & staff" },
  { id: "E", wait: 27, crowd: "high", accessible: true, note: "Main plaza" },
  { id: "F", wait: 12, crowd: "moderate", accessible: false, note: "Shuttle bay" },
];

export const SHUTTLES = [
  { route: "Downtown Express", eta: 4 },
  { route: "Fan Zone Loop", eta: 11 },
  { route: "Rail Connector", eta: 2 },
];

export const INCIDENT_SEED = [
  { id: 1, level: "info", text: "Gate C queue exceeding 20 min — recommend overflow to Gate E." },
  { id: 2, level: "warn", text: "Localized crowd surge reported, north concourse near Section 114." },
  { id: 3, level: "info", text: "Shuttle 'Rail Connector' running 3 min behind schedule." },
  { id: 4, level: "critical", text: "Medical assist requested, Gate C accessible entrance." },
];
