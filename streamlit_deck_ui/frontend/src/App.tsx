import { useState } from "react";

import { DeckSlider } from "./components/DeckSlider/DeckSlider";

export default function App() {

  const [value, setValue] = useState(0);

  return (
    <div
      style={{
        background: "#1a1d20",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >

      <DeckSlider
        value={value}
        min={-1}
        max={1}
        step={0.5}
        label="APP SLIDER"
        orientation="vertical"
        // orientation="horizontal"
        onChange={setValue}
      />

    </div>
  );
}
