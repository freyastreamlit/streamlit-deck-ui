import { useRef } from "react";

import "./DeckSlider.css";

type DeckSliderProps = {
  value: number;

  min?: number;
  max?: number;

  step?: number;
  label?: string;

  length?: number;
  thickness?: number;

  orientation?: | "vertical" | "horizontal";

  onChange?: ( value: number ) => void;

};


export function DeckSlider({ value, min=-1, max=1, step=1, label, length = 180, thickness = 10, orientation="vertical", onChange }: DeckSliderProps) {

  const railRef = useRef<HTMLDivElement>(null);

  function updatePosition( clientX: number, clientY: number ) {

    if (!railRef.current) return;

    const rect = railRef.current.getBoundingClientRect();

    let relative = 0;

    if (orientation === "vertical") { relative = (clientY - rect.top) / rect.height }
    else { relative = (clientX - rect.left) / rect.width }

    let mapped = orientation === "vertical"
                ? max - relative * (max - min)
                : min + relative * (max - min);

    if (step > 0) {
      mapped = Math.round(mapped / step) * step;
      mapped = Math.max( min, Math.min(max, mapped) );
    }

    onChange?.(mapped);
  }

  function formatValue(v: number) {
    const hasDecimals = !Number.isInteger(step);
    return hasDecimals ? v.toFixed(2) : v.toFixed(0);
  }

  function handlePointerDown( e: React.PointerEvent<HTMLDivElement> ) {

    updatePosition( e.clientX, e.clientY );

    const handleMove = ( ev: PointerEvent ) => {
      updatePosition( ev.clientX, ev.clientY );
    };

    const handleUp = () => {
      window.removeEventListener( "pointermove", handleMove );
      window.removeEventListener( "pointerup", handleUp );
    };

    window.addEventListener( "pointermove", handleMove );
    window.addEventListener( "pointerup", handleUp );
  }

  const normalized =
    orientation === "vertical" ? (max - value) / (max - min) : (value - min) / (max - min);

  const isVertical = orientation === "vertical";

  return (
    <div className={`deck-slider-shell ${orientation}`} >

      {label &&
        orientation === "horizontal" && (
          <div className="deck-slider-label horizontal">
            {label}
          </div>
        )}

      <div className={`deck-slider ${orientation}`} >

        {label &&
          orientation === "vertical" && (
            <div className="deck-slider-label vertical">
              {label}
            </div>
          )}

        <div className="deck-slider-main">

          <div
            ref={railRef}
            className={`deck-slider-rail ${orientation}`}
            style={ isVertical
                    ? { height: `${length}px`, width: `${thickness}px` }
                    : { width: `${length}px`, height: `${thickness}px` } }
            onPointerDown={handlePointerDown}
          >

            <div className={`deck-slider-min ${orientation}`}> {formatValue(min)} </div>

            <div className={`deck-slider-max ${orientation}`}> {formatValue(max)} </div>

            <div className="deck-slider-center-marker" />

            <div
              className="deck-slider-thumb"
              style={ isVertical ? { top: `${normalized * 100}%` } : { left: `${normalized * 100}%` } }
            />

          </div>

          <div className="deck-slider-value"> {formatValue(value)} </div>

        </div>

      </div>

    </div>
  );
}
