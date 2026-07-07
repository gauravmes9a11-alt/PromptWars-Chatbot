import { useEffect, useRef, useState } from "react";

/**
 * Signature component: an airport/stadium departure-board style
 * split-flap character cell. Re-renders each character with a
 * flip-in animation whenever its value changes.
 */
function FlapChar({ char, size = 22 }) {
  const [display, setDisplay] = useState(char);
  const prev = useRef(char);
  const [flip, setFlip] = useState(0);

  useEffect(() => {
    if (prev.current !== char) {
      prev.current = char;
      setDisplay(char);
      setFlip((f) => f + 1);
    }
  }, [char]);

  return (
    <span
      className="flap-cell"
      style={{ width: size, height: size * 1.35, fontSize: size * 0.72 }}
    >
      <span key={flip} className="flap-char">{display}</span>
    </span>
  );
}

export default function SplitFlap({ text, size = 22, className = "", tone = "paper" }) {
  const chars = text.toUpperCase().split("");
  const toneClass = tone === "amber" ? "text-amber" : tone === "teal" ? "text-teal" : "text-paper";
  return (
    <span className={`inline-flex gap-[3px] ${className}`}>
      {chars.map((c, i) => (
        <span key={i} className={toneClass}>
          <FlapChar char={c === " " ? "\u00A0" : c} size={size} />
        </span>
      ))}
    </span>
  );
}
