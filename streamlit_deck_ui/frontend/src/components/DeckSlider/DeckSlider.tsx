import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import "./DeckSlider.css";

type DeckSliderProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  length?: number;
  thickness?: number;
  shell?: boolean;
  padding?: number;
  orientation?: "vertical" | "horizontal";
  onChange?: (value: number) => void;
};

export function DeckSlider({
  value, min = -1, max = 1, step = 1, label,
  length = 180, thickness = 10, shell = true, padding = 16,
  orientation = "vertical", onChange,
}: DeckSliderProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const latestRef = useRef(value);
  const [displayValue, setDisplayValue] = useState(value);

  // Accept Streamlit updates, but do not interrupt an active drag.
  useEffect(() => {
    if (!draggingRef.current) {
      latestRef.current = value;
      setDisplayValue(value);
    }
  }, [value]);

  function positionValue(clientX: number, clientY: number): number {
    const rect = railRef.current?.getBoundingClientRect();
    if (!rect || max <= min) return latestRef.current;
    const relative = orientation === "vertical"
      ? (clientY - rect.top) / rect.height
      : (clientX - rect.left) / rect.width;
    const fraction = Math.max(0, Math.min(1, relative));
    const raw = orientation === "vertical"
      ? max - fraction * (max - min)
      : min + fraction * (max - min);
    const snapped = step > 0 ? min + Math.round((raw - min) / step) * step : raw;
    const clamped = Math.max(min, Math.min(max, snapped));
    return Number(clamped.toFixed(10));
  }

  function updatePosition(clientX: number, clientY: number) {
    const next = positionValue(clientX, clientY);
    latestRef.current = next;
    setDisplayValue(next); // React only; no Streamlit rerun.
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.button !== 0 || draggingRef.current) return;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX, e.clientY);
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    updatePosition(e.clientX, e.clientY);
  }

  function handlePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    updatePosition(e.clientX, e.clientY);
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const finalValue = positionValue(e.clientX, e.clientY);
    if (finalValue !== value) onChange?.(finalValue); // One Streamlit update.
  }

  function handlePointerCancel() {
    draggingRef.current = false;
    latestRef.current = value;
    setDisplayValue(value);
  }

  function formatValue(v: number) {
    return Number.isInteger(step) ? v.toFixed(0) : v.toFixed(2);
  }

  const normalized = max > min
    ? (orientation === "vertical" ? (max - displayValue) / (max - min) : (displayValue - min) / (max - min))
    : 0;
  const position = `${Math.max(0, Math.min(1, normalized)) * 100}%`;
  const isVertical = orientation === "vertical";

  return (
    <div
      className={shell ? `deck-slider-shell ${orientation}` : `deck-slider-shell-none ${orientation}`}
      style={shell ? { padding: `${padding}px` } : undefined}
    >
      <div className={`deck-slider ${orientation}`}>
        {label && <div className={`deck-slider-label ${orientation}`}>{label}</div>}
        <div className="deck-slider-main">
          <div
            ref={railRef}
            className={`deck-slider-rail ${orientation}`}
            style={{
              ...(isVertical
                ? { height: `${length}px`, width: `${thickness}px` }
                : { width: `${length}px`, height: `${thickness}px` }),
              touchAction: "none",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div className={`deck-slider-min ${orientation}`}>{formatValue(min)}</div>
            <div className={`deck-slider-max ${orientation}`}>{formatValue(max)}</div>
            <div className="deck-slider-center-marker" />
            <div className="deck-slider-thumb" style={isVertical ? { top: position } : { left: position }} />
          </div>
          <div className="deck-slider-value">{formatValue(displayValue)}</div>
        </div>
      </div>
    </div>
  );
}
