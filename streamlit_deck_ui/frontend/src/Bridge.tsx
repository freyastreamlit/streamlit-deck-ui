import { useEffect, useState } from "react";

import {
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib";

import type {
  ComponentProps,
} from "streamlit-component-lib";

import { DeckSlider } from "./components/DeckSlider/DeckSlider";

function Bridge( props: ComponentProps ) {

  const args = props.args ?? {};

  const initialValue = args.value ?? 0;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    requestAnimationFrame(() => {
      Streamlit.setFrameHeight(); });
    }, [ args.orientation, value ]);

  function handleChange( v: number ) {
    setValue(v);
    Streamlit.setComponentValue(v);
  }

  return (
    <div
      style={{
        background: "#1a1d20",
        padding: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >

      <DeckSlider
        value={value}
        min={args.min_value ?? -1}
        max={args.max_value ?? 1}
        step={args.step ?? 0}
        label={args.label ?? "SLIDER"}
        orientation={ args.orientation ?? "horizontal" }
        onChange={handleChange}
      />

    </div>
  );
}

export default withStreamlitConnection( Bridge );
