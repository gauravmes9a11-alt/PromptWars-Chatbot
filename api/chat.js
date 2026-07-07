// Vercel serverless function: multilingual fan assistant.
// Requires ANTHROPIC_API_KEY set in the deployment environment.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, language, venue, gates } = req.body || {};
  if (!question) {
    return res.status(400).json({ error: "question is required" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured on server" });
  }

  const gateSummary = (gates || [])
    .map((g) => `Gate ${g.id}: ${g.wait}min wait, ${g.crowd} crowd, ${g.note}${g.accessible ? " (accessible entrance)" : ""}`)
    .join("\n");

  const systemPrompt = `You are Concourse, a friendly on-site GenAI assistant helping fans at ${venue || "a FIFA World Cup 2026 stadium"} navigate gates, transit, accessibility and general venue questions.
Live gate data:
${gateSummary}

Rules:
- Reply ONLY in ${language || "English"}, regardless of the language the question is asked in.
- Be concise: 2-4 sentences, practical and specific to the gate data above where relevant.
- If asked about something unrelated to the stadium/match day, gently redirect to stadium topics.
- Never invent emergency numbers; for medical emergencies tell the fan to alert the nearest steward or staff member immediately.`;

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
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: "user", content: question }],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ error: "Upstream error", detail: text });
    }

    const data = await response.json();
    const reply = data.content?.find((c) => c.type === "text")?.text || "Sorry, I couldn't generate a response.";
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Failed to reach GenAI service", detail: String(err) });
  }
}
