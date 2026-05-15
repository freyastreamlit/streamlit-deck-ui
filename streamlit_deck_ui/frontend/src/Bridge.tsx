import { useEffect, useState } from "react";

import {
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib";

import type {
  ComponentProps,
} from "streamlit-component-lib";

import { DeckPanel } from "./components/DeckPanel/DeckPanel";

import { ControlBay } from "./components/ControlBay/ControlBay";

import { DeckSlider } from "./components/DeckSlider/DeckSlider";

export function BridgeInner(
  props?: Partial<ComponentProps>
) {
  const args = props?.args ?? {};

  const [value, setValue] =
    useState(args.value ?? 0);

  useEffect(() => {
    try {
      Streamlit.setFrameHeight(400);
    } catch {}
  }, []);

  function handleChange(v: number) {
    setValue(v);

    try {
      Streamlit.setComponentValue(v);
    } catch {}
  }

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
            min={args.min_value ?? -1}
            max={args.max_value ?? 1}
            onChange={handleChange}
          />
        </ControlBay>
      </DeckPanel>
    </div>
  );
}

const StreamlitBridge =
  withStreamlitConnection(
    BridgeInner
  );

export default StreamlitBridge;
