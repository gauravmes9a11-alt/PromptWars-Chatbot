import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "../data/venues.js";

const STARTERS = [
  "Nearest accessible restroom to Gate C?",
  "When's the next shuttle downtown?",
  "Where can I recycle my cup?",
  "How do I get a wheelchair escort?",
];

export default function ChatAssistant({ venueName, language, gates }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I'm your match-day guide. Ask me about gates, accessibility, transit, or anything around the stadium — I'll answer in your selected language.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text) {
    const question = text ?? input;
    if (!question.trim() || loading) return;
    setInput("");
    const nextMessages = [...messages, { role: "user", text: question }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const langLabel = LANGUAGES.find((l) => l.code === language)?.label || "English";
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          language: langLabel,
          venue: venueName,
          gates,
        }),
      });
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            "I couldn't reach the assistant service. If you're running this locally, set ANTHROPIC_API_KEY on the server — see the README.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-ink-light border border-line rounded-xl flex flex-col h-[420px]">
      <div className="px-4 sm:px-5 py-3 border-b border-line flex items-center justify-between">
        <span className="font-display uppercase tracking-widest2 text-xs text-teal">Fan Assistant</span>
        <span className="font-mono text-[11px] text-paper/45">multilingual · GenAI</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-5 py-3 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] text-sm rounded-lg px-3 py-2 leading-relaxed ${
                m.role === "user" ? "bg-amber text-ink" : "bg-ink text-paper/90 border border-line"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-ink text-paper/50 border border-line rounded-lg px-3 py-2 text-sm font-mono">
              typing…
            </div>
          </div>
        )}
      </div>

      <div className="px-4 sm:px-5 py-2 flex flex-wrap gap-2 border-t border-line">
        {STARTERS.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="text-[11px] font-mono px-2 py-1 rounded border border-line text-paper/60 hover:text-paper hover:border-teal transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="px-4 sm:px-5 py-3 border-t border-line flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question…"
          className="flex-1 bg-ink border border-line rounded-md px-3 py-2 text-sm text-paper placeholder:text-paper/30 focus:outline-none focus:ring-2 focus:ring-teal"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-teal text-ink font-display uppercase tracking-widest2 text-xs px-4 py-2 rounded-md disabled:opacity-50"
        >
          Ask
        </button>
      </form>
    </div>
  );
}
