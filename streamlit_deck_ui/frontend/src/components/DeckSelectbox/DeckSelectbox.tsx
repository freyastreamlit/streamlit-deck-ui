
import { useEffect, useState } from "react";
import "./DeckSelectbox.css";

type DeckSelectboxProps = {
  labels: string[];
  value?: string;
  label?: string;
  width?: number;
  labelFontSize?: number;
  valueFontSize?: number;
  padding?: number;
  shell?: boolean;
  onChange?: (value: string) => void;
};

export function DeckSelectbox({
  labels,
  value,
  label = "SELECT",
  width = 240,
  labelFontSize = 16,
  valueFontSize = 28,
  padding = 12,
  shell = true,
  onChange,
}: DeckSelectboxProps) {

  const [selected, setSelected] = useState(
    value ?? labels[0] ?? ""
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(
      value && labels.includes(value)
        ? value
        : labels[0] ?? ""
    );
  }, [value, labels]);

  function selectOption(option: string) {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  }

  return (
    <div
      className={`deck-selectbox ${shell ? "shell" : ""}`}
      style={{
        width: `${width}px`,
        padding: `${padding}px`,
        "--deck-label-size": `${labelFontSize}px`,
        "--deck-value-size": `${valueFontSize}px`,
      }}
    >
      <div
        className="deck-selectbox-label"
        style={{ fontSize: `${labelFontSize}px`, lineHeight: 1.3 }}
      >
        {label}
      </div>

      <button
        type="button"
        className="deck-selectbox-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(!open)}
      >
        <span
          className="deck-selectbox-value"
          style={{ fontSize: `${valueFontSize}px`, lineHeight: 1.2 }}
        >
          {selected}
        </span>

        <span className="deck-selectbox-arrow">⌄</span>
      </button>

      {open && (
        <div className="deck-selectbox-menu" role="listbox">
          {labels.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={selected === option}
              key={option}
              className={`deck-selectbox-option ${
                selected === option ? "active" : ""
              }`}
              onClick={() => selectOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
