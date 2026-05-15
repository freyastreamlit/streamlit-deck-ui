import { useRef, useState } from "react";

import "./SliderChannel.css";

export function SliderChannel() {
  const railRef =
    useRef<HTMLDivElement>(null);

  const [value, setValue] =
    useState(0);

  function updatePosition(clientY: number) {
    if (!railRef.current) return;

    const rect =
      railRef.current.getBoundingClientRect();

    let relative =
      (clientY - rect.top) / rect.height;

    relative =
      Math.max(0, Math.min(1, relative));

    const mapped =
      1 - relative * 2;

    setValue(mapped);
  }

  function handlePointerDown(
    e: React.PointerEvent<HTMLDivElement>
  ) {
    updatePosition(e.clientY);

    const handleMove = (
      ev: PointerEvent
    ) => {
      updatePosition(ev.clientY);
    };

    const handleUp = () => {
      window.removeEventListener(
        "pointermove",
        handleMove
      );

      window.removeEventListener(
        "pointerup",
        handleUp
      );
    };

    window.addEventListener(
      "pointermove",
      handleMove
    );

    window.addEventListener(
      "pointerup",
      handleUp
    );
  }

  return (
    <div className="slider-channel">
      <div
        ref={railRef}
        className="slider-rail"
        onPointerDown={handlePointerDown}
      >
        <div className="slider-center-marker" />

        <div
          className="slider-thumb"
          style={{
            top: `${((1 - value) / 2) * 100}%`,
          }}
        />
      </div>

      <div className="slider-value">
        {value.toFixed(2)}
      </div>
    </div>
  );
}
