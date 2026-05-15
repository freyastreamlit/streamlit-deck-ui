import { DeckPanel } from "./components/DeckPanel/DeckPanel";

import { ControlBay } from "./components/ControlBay/ControlBay";

import { DeckSlider } from "./components/DeckSlider/DeckSlider";

type DeckSliderDemoProps = {
  value: number;

  min: number;
  max: number;

  onChange: (
    value: number
  ) => void;
};

export function DeckSliderDemo({
  value,

  min,
  max,

  onChange,
}: DeckSliderDemoProps) {
  return (
    <div
      style={{
        background: "#1a1d20",

        minHeight: "100vh",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontFamily:
          "Inter, sans-serif",
      }}
    >
      <DeckPanel title="STREAMLIT DECK UI">
        <ControlBay>
          <DeckSlider
            value={value}
            min={min}
            max={max}
            onChange={onChange}
          />
        </ControlBay>
      </DeckPanel>
    </div>
  );
}

