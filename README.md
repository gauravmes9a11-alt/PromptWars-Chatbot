# Concourse — GenAI Stadium Copilot for FIFA World Cup 2026

Concourse is a two-mode web app that treats a World Cup stadium on match day like an
airport terminal: gates, queues, transit, accessibility and incidents all flow into
one live board — read by fans in their own language, and by staff as an
operational brief.

**Problem areas covered:** navigation & wayfinding, multilingual assistance,
accessibility, crowd management, sustainability, and operational intelligence /
real-time decision support.

## How it works

| Mode | Who it's for | What it does |
|---|---|---|
| **Fan** | Attendees | Live departure-board of gate wait times & crowd levels, a GenAI chat assistant that answers in the fan's chosen language using live gate data as context, an accessibility panel (step-free routing, sensory rooms), and a sustainability nudge comparing transit vs. rideshare. |
| **Staff** | Volunteers / venue ops | A scrolling incident ticker, a live crowd-density panel per gate, a one-click **Situation Brief** that asks GenAI to synthesize gate + incident data into a plain-language brief with a recommended action, and a shared task board. |

Gate wait times, crowd levels, incidents and shuttle ETAs are **mock data**
(`src/data/gates.js`, `src/data/venues.js`) standing in for what would, in
production, come from turnstile counters, CCTV-based crowd density models, and
transit APIs. The GenAI layer (chat replies + situation briefs) is real and
live — it calls the Anthropic API.

## Why this design

The visual language borrows from airport/transit signage rather than generic
sports-app styling: a split-flap "departure board" is the signature UI element,
functional colour-coding (amber = wayfinding, teal = live data, red = alerts
only), and a condensed display face for gate numbers/wait times, echoing
scoreboards and gate signage. Fonts are Google Fonts (Oswald / Inter /
JetBrains Mono) chosen for legibility across the many scripts a global
tournament audience will read.

## Tech stack

- **Frontend:** React 19 + Vite + Tailwind CSS
- **Backend:** Vercel serverless functions (`/api/chat`, `/api/brief`) calling
  the Anthropic Messages API
- **No database** — mock JSON data for the demo; swap in real feeds for
  production (see "Extending" below)

## Running locally

You need Node.js 18+.

```bash
npm install
cp .env.example .env      # add your ANTHROPIC_API_KEY
```

The app needs two processes locally (in prod on Vercel, this is automatic):

```bash
# Terminal 1 — frontend
npm run dev

# Terminal 2 — local API server (emulates the /api serverless functions)
export ANTHROPIC_API_KEY=sk-ant-...
npm run dev:api
```

Open the URL Vite prints (usually http://localhost:5173).

> Without `ANTHROPIC_API_KEY` set, the UI still renders and the gate board /
> crowd panel work fully (they're mock data), but the chat assistant and
> Situation Brief will show a friendly "couldn't reach the assistant" message.

## Deploying (Vercel)

1. Push this repo to GitHub.
2. Import it into Vercel (vercel.com/new).
3. Vercel auto-detects the Vite build and the `/api` functions — no config
   needed beyond the `vercel.json` already in this repo.
4. In Project Settings → Environment Variables, add:
   - `ANTHROPIC_API_KEY` = your Anthropic API key
5. Deploy. The chat assistant and Situation Brief will work immediately.

## Project structure

```
├── api/                 # Vercel serverless functions
│   ├── chat.js          # multilingual fan assistant (GenAI)
│   └── brief.js         # staff situation-brief generator (GenAI)
├── server/dev.js         # local Express shim so /api works in `npm run dev`
├── src/
│   ├── components/       # DepartureBoard, ChatAssistant, CrowdPanel, etc.
│   ├── data/              # mock venues, gates, incidents, languages
│   ├── App.jsx
│   └── index.css
└── vercel.json
```

## Extending toward production

- Replace `src/data/gates.js` with a polling hook against real turnstile /
  crowd-sensor feeds (WebSocket or short-interval polling into the same shape).
- Feed live weather, transit-agency APIs, and incident-reporting forms into
  `/api/brief.js`'s prompt for richer situation briefs.
- Add push notifications (web push) for gate-level crowd threshold alerts.
- Cache translated FAQ pairs to reduce repeat GenAI calls for common
  questions ("where's the nearest restroom" etc.) and cut latency/cost.

## License

Built for hackathon submission purposes.
