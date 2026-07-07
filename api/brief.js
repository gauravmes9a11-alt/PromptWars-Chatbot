// Vercel serverless function: operational intelligence brief for staff/volunteers.
// Requires ANTHROPIC_API_KEY set in the deployment environment.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { gates, incidents, venueName } = req.body || {};
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured on server" });
  }

  const gateSummary = (gates || [])
    .map((g) => `Gate ${g.id}: ${g.wait}min wait, ${g.crowd} crowd${g.accessible ? ", accessible entrance" : ""}`)
    .join("\n");
  const incidentSummary = (incidents || []).map((i) => `[${i.level.toUpperCase()}] ${i.text}`).join("\n");

  const prompt = `You are an operational intelligence assistant for stadium staff at ${venueName || "a FIFA World Cup 2026 venue"}.

Live gate data:
${gateSummary}

Current incident reports:
${incidentSummary}

Write a short situation brief (max 120 words) for the duty supervisor covering:
1. Overall status in one line
2. The single highest-priority issue right now and a concrete recommended action
3. One proactive suggestion to prevent escalation

Use plain, direct operational language. No preamble, no headers, just the brief.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ error: "Upstream error", detail: text });
    }

    const data = await response.json();
    const brief = data.content?.find((c) => c.type === "text")?.text || "Could not generate a brief.";
    return res.status(200).json({ brief });
  } catch (err) {
    return res.status(500).json({ error: "Failed to reach GenAI service", detail: String(err) });
  }
}
