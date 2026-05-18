import { useEffect } from "react";

import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";

import type { ComponentProps } from "streamlit-component-lib";

import { DeckSlider } from "./components/DeckSlider/DeckSlider";

import { DeckButtons } from "./components/DeckButtons/DeckButtons";

function Bridge( props: ComponentProps ) {

  const args = props.args ?? {};

  useEffect(() => { requestAnimationFrame(() => { Streamlit.setFrameHeight() }) }, [args]);

  const component = args.component;

  return (
    <div
      style={{
        padding: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >

      {component === "deck_slider" && ( <DeckSliderBridge args={args} /> )}

      {component === "deck_buttons" && ( <DeckButtonsBridge args={args} /> )}

    </div>
  );
}

export default withStreamlitConnection( Bridge );


function DeckSliderBridge({ args }: { args: any; }) {

  return (
    <DeckSlider
      value={args.value ?? 0}

      min={args.min ?? -1}
      max={args.max ?? 1}

      step={args.step ?? 0}

      label={args.label ?? "SLIDER"}

      orientation={ args.orientation ?? "horizontal" }

      onChange={(v) => { Streamlit.setComponentValue(v); }}
    />
  );
}

function DeckButtonsBridge({ args }: { args: any; }) {

  return (
    <DeckButtons
      labels={args.labels ?? []}

      value={args.value ?? {}}

      onChange={(v) => {

        Streamlit.setComponentValue(v);

      }}
    />
  );
}


