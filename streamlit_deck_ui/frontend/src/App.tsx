import { useState } from "react";

import { DeckPanel } from "./components/DeckPanel/DeckPanel";

import { ControlBay } from "./components/ControlBay/ControlBay";

import { DeckSlider } from "./components/DeckSlider/DeckSlider";

export default function App() {
  const [value, setValue] =
    useState(0);

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
            min={-1}
            max={1}
            onChange={setValue}
          />
        </ControlBay>
      </DeckPanel>
    </div>
  );
}
