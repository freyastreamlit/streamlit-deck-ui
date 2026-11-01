import { useEffect, useRef } from "react";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import type { ComponentProps } from "streamlit-component-lib";
import { DeckSlider } from "./components/DeckSlider/DeckSlider";
import { DeckButtons } from "./components/DeckButtons/DeckButtons";
import { DeckSelectbox } from "./components/DeckSelectbox/DeckSelectbox";
import { DeckNumberInput } from "./components/DeckNumberInput/DeckNumberInput";

type Args = Record<string, any>;

function Bridge(props: ComponentProps) {
  const args: Args = props.args ?? {};
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const resize = () => {
      const bounds = root.getBoundingClientRect();
      const menu = root.querySelector(".deck-selectbox-menu");
      const menuBottom = menu ? menu.getBoundingClientRect().bottom - bounds.top : 0;
      Streamlit.setFrameHeight(Math.ceil(Math.max(root.scrollHeight, menuBottom) + 12));
    };
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    // Dropdown menus are absolutely positioned, so their size does not
    // change the parent's layout. Observe mutations and measure scroll bounds.
    const mutations = new MutationObserver(() => requestAnimationFrame(resize));
    mutations.observe(root, { childList: true, subtree: true, attributes: true });
    requestAnimationFrame(resize);
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, [args.component]);

  return (
    <div ref={rootRef} style={{
        padding: 12,
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: args.component === "deck_buttons" ? "center" : "flex-start",
        justifyContent: args.component === "deck_buttons" ? "center" : "flex-start",
        fontFamily: "Inter, sans-serif",
        minHeight: args.component === "deck_selectbox" ? 100 : undefined }}>

      {args.component === "deck_slider" && <DeckSliderBridge args={args} />}
      {args.component === "deck_buttons" && <DeckButtonsBridge args={args} />}
      {args.component === "deck_selectbox" && <DeckSelectboxBridge args={args} />}
      {args.component === "deck_number_input" && <DeckNumberInputBridge args={args} />}

    </div>
  );
}

export default withStreamlitConnection(Bridge);

function DeckSliderBridge({ args }: { args: Args }) {
  return <DeckSlider value={args.value ?? 0} min={args.min ?? -1} max={args.max ?? 1} step={args.step ?? 1} label={args.label ?? "SLIDER"} length={args.length ?? 180} thickness={args.thickness ?? 10} shell={args.shell ?? true} padding={args.padding ?? 16} orientation={args.orientation ?? "horizontal"} onChange={v => Streamlit.setComponentValue(v)} />;
}

function DeckButtonsBridge({ args }: { args: Args }) {
  return <DeckButtons labels={args.labels ?? []} value={args.value ?? {}} mode={args.mode ?? "checkbox"} orientation={args.orientation ?? "horizontal"} fontSize={args.fontSize ?? 14} shell={args.shell ?? true} padding={args.padding ?? 12} onChange={v => Streamlit.setComponentValue(v)} />;
}

function DeckSelectboxBridge({ args }: { args: Args }) {
  return <DeckSelectbox labels={args.labels ?? []} value={args.value} label={args.label ?? "SELECT"} width={args.width ?? 240} useContainerWidth={args.useContainerWidth ?? true} labelFontSize={args.labelFontSize ?? 16} valueFontSize={args.valueFontSize ?? 28} padding={args.padding ?? 12} shell={args.shell ?? true} onChange={v => Streamlit.setComponentValue(v)} />;
}

function DeckNumberInputBridge({ args }: { args: Args }) {
  return <DeckNumberInput
    label={args.label ?? "NUMBER"} value={args.value ?? 0}
    minValue={args.minValue ?? null} maxValue={args.maxValue ?? null}
    step={args.step ?? 1} precision={args.precision ?? 0}
    integerMode={args.integerMode ?? true}
    width={args.width ?? 240} useContainerWidth={args.useContainerWidth ?? true}
    labelFontSize={args.labelFontSize ?? 16} valueFontSize={args.valueFontSize ?? 28}
    showLimits={args.showLimits ?? true} limitsFontSize={args.limitsFontSize ?? 12}
    padding={args.padding ?? 12} shell={args.shell ?? true}
    onChange={v => Streamlit.setComponentValue(v)}
  />;
}
