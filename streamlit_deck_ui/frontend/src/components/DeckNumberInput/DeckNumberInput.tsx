import { useEffect, useState } from "react";
import "./DeckNumberInput.css";

type Props = {
  label?: string;
  value?: number;
  minValue?: number | null;
  maxValue?: number | null;
  step?: number;
  precision?: number;
  integerMode?: boolean;
  width?: number;
  useContainerWidth?: boolean;
  labelFontSize?: number;
  valueFontSize?: number;
  showLimits?: boolean;
  limitsFontSize?: number;
  padding?: number;
  shell?: boolean;
  onChange?: (value: number) => void;
};

export function DeckNumberInput({
  label = "NUMBER", value = 0, minValue = null, maxValue = null,
  step = 1, precision = 0, integerMode = true, width = 240,
  useContainerWidth = true, labelFontSize = 16, valueFontSize = 28,
  showLimits = true, limitsFontSize = 12,
  padding = 12, shell = true, onChange,
}: Props) {
  const format = (n: number) => n.toFixed(precision);
  const [draft, setDraft] = useState(() => format(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDraft(format(value));
  }, [value, precision, focused]);

  const clamp = (n: number) => Math.min(maxValue ?? Infinity, Math.max(minValue ?? -Infinity, n));
  const normalize = (n: number) => {
    const bounded = clamp(n);
    return integerMode ? Math.round(bounded) : Number(bounded.toFixed(precision));
  };

  function commit(raw: string) {
    const parsed = Number(raw);
    if (!raw.trim() || !Number.isFinite(parsed)) {
      setDraft(format(value));
      return;
    }
    const next = normalize(parsed);
    setDraft(format(next));
    if (next !== value) onChange?.(next);
  }

  function nudge(direction: number) {
    const parsed = Number(draft);
    const base = draft.trim() && Number.isFinite(parsed) ? parsed : value;
    const next = normalize(base + direction * step);
    setDraft(format(next));
    if (next !== value) onChange?.(next);
  }

  return (
    <div className={`deck-number-input ${shell ? "shell" : ""}`}
      style={{ width: useContainerWidth ? "100%" : `${width}px`, padding }}>
      <div className="deck-number-label-row">
        <label className="deck-number-label" style={{ fontSize: labelFontSize }}>
          {label}
        </label>
        {showLimits && (minValue !== null || maxValue !== null) && (
          <span className="deck-number-limits" style={{ fontSize: limitsFontSize }}>
            ({minValue ?? "−∞"} – {maxValue ?? "∞"})
          </span>
        )}
      </div>
      <div className="deck-number-row">
        <input
          className="deck-number-value"
          type="text"
          inputMode="decimal"
          aria-label={label}
          value={draft}
          style={{ fontSize: valueFontSize }}
          onFocus={() => setFocused(true)}
          onChange={e => setDraft(e.target.value)}
          onBlur={e => { setFocused(false); commit(e.target.value); }}
          onKeyDown={e => {
            if (e.key === "Enter") e.currentTarget.blur();
            if (e.key === "Escape") { setDraft(format(value)); e.currentTarget.blur(); }
          }}
        />
        <div className="deck-number-steppers">
          <button type="button" aria-label="Increase" onMouseDown={e => e.preventDefault()}
            disabled={maxValue !== null && value >= maxValue}
            onClick={() => nudge(1)}>▲</button>
          <button type="button" aria-label="Decrease" onMouseDown={e => e.preventDefault()}
            disabled={minValue !== null && value <= minValue}
            onClick={() => nudge(-1)}>▼</button>
        </div>
      </div>
    </div>
  );
}
