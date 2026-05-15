import { useEffect, useState } from "react";

import {
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib";

import type {
  ComponentProps,
} from "streamlit-component-lib";

import { DeckSliderDemo } from "./DeckSliderDemo";

function Bridge(
  props: ComponentProps
) {
  const args = props.args ?? {};

  const [value, setValue] = useState(args.value ?? 0);

  useEffect(() => { setValue(args.value ?? 0); }, [args.value]);

  useEffect(() => { Streamlit.setFrameHeight(400); }, []);

  function handleChange(v: number) {
    setValue(v);
    Streamlit.setComponentValue(v);
  }

  return (
    <DeckSliderDemo
      value={value}
      min={args.min_value ?? -1}
      max={args.max_value ?? 1}
      onChange={handleChange}
    />
  );
}

export default withStreamlitConnection(
  Bridge
);
