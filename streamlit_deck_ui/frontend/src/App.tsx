import { useState } from "react";
import { DeckButtons } from "./components/DeckButtons/DeckButtons";
import { DeckSelectbox } from "./components/DeckSelectbox/DeckSelectbox";
import { DeckNumberInput } from "./components/DeckNumberInput/DeckNumberInput";

const bars = ["MASTER", "RAW2", "IQR2", "RG4", "TM1", "LB2R2", "TK600"];

export default function App() {
  const [buttons, setButtons] = useState<Record<string, boolean>>({ MASTER: true, RAW2: false, IQR2: false, RG4: false, TM1: true, LB2R2: false, TK600: false });
  const [toggle, setToggle] = useState<Record<string, boolean>>({ ENABLED: true });
  const [overlap, setOverlap] = useState("2");
  const [amount, setAmount] = useState(2.5);

  return (
    <div style={{ background: "#1a1d20", minHeight: "100vh", color: "#ebebeb", padding: 28, boxSizing: "border-box", fontFamily: "Inter, sans-serif" }}>
      <h2>Deck UI development preview</h2>
      <section style={{ marginBottom: 28 }}>
        <h3>Deck buttons</h3>
        <DeckButtons labels={bars} value={buttons} mode="checkbox" orientation="horizontal" fontSize={12} shell padding={12} onChange={setButtons} />
        <pre>{JSON.stringify(Object.keys(buttons).filter(k => buttons[k]))}</pre>
      </section>
      <section style={{ marginBottom: 28 }}>
        <h3>Deck toggle (single DeckButtons)</h3>
        <DeckButtons labels={["ENABLED"]} value={toggle} mode="checkbox" orientation="horizontal" fontSize={14} shell padding={12} onChange={setToggle} />
        <pre>{String(Boolean(toggle.ENABLED))}</pre>
      </section>
      <section>
        <h3>Deck selectbox</h3>
        <DeckSelectbox labels={["1", "2", "3", "4", "5"]} value={overlap} label="Minimum metric overlap" width={240} labelFontSize={16} valueFontSize={30} padding={12} shell onChange={setOverlap} />
        <pre>{overlap}</pre>
      </section>
      <section>
        <h3>Deck number input</h3>
        <DeckNumberInput label="Minimum threshold" value={amount} minValue={0} maxValue={10} step={0.25} precision={2} integerMode={false} labelFontSize={16} valueFontSize={30} showLimits limitsFontSize={12} useContainerWidth={false} width={240} onChange={setAmount} />
        <pre>{amount}</pre>
      </section>
    </div>
  );
}
