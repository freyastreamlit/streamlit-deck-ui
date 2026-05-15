import * as Slider from "@radix-ui/react-slider";
import "./DeckSlider.css";

type DeckSliderProps = {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  orientation?: "horizontal" | "vertical";
  onChange?: (value: number) => void;
};

export function DeckSlider({
  label,
  value,
  min = -1,
  max = 1,
  step = 0.01,
  orientation = "vertical",
  onChange,
}: DeckSliderProps) {
  return (
    <div className="deck-slider-container">
      {label && (
        <div className="deck-slider-label">
          {label}
        </div>
      )}

      <Slider.Root
        className={`deck-slider-root ${orientation}`}
        min={min}
        max={max}
        step={step}
        value={[value]}
        orientation={orientation}
        onValueChange={(v) => {
          onChange?.(v[0]);
        }}
      >
        <Slider.Track className="deck-slider-track">
          <Slider.Range className="deck-slider-range" />
        </Slider.Track>

        <Slider.Thumb
          className="deck-slider-thumb"
          aria-label={label || "slider"}
        />
      </Slider.Root>

      <div className="deck-slider-value">
        {value.toFixed(2)}
      </div>
    </div>
  );
}
