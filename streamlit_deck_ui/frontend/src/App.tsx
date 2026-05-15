import { useState } from "react";

import { DeckSliderDemo } from "./DeckSliderDemo";

export default function App() {
  const [value, setValue] =
    useState(0);

  return (
    <DeckSliderDemo
      value={value}
      min={-1}
      max={1}
      onChange={setValue}
    />
  );
}