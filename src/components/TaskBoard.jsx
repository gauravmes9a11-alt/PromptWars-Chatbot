import { useState } from "react";

const SEED = [
  { id: 1, text: "Redirect overflow queue from Gate C to Gate E", done: false },
  { id: 2, text: "Confirm accessible shuttle bay staffing at Gate C", done: false },
  { id: 3, text: "Check signage batteries, north concourse", done: true },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(SEED);

  function toggle(id) {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  }

  return (
    <div className="bg-ink-light border border-line rounded-xl p-4 sm:p-5">
      <div className="font-display uppercase tracking-widest2 text-xs text-amber mb-3">
        Volunteer Tasks
      </div>
      <div className="space-y-2">
        {tasks.map((t) => (
          <label
            key={t.id}
            className="flex items-center gap-3 text-sm cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
              className="accent-teal w-4 h-4"
            />
            <span className={t.done ? "line-through text-paper/35" : "text-paper/85"}>
              {t.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
