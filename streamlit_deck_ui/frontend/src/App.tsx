import { useState } from "react";

import { DeckButtons } from "./components/DeckButtons/DeckButtons";

export default function App() {

  const [buttons, setButtons] = useState<Record<string, boolean>>({

      MASTER: true,
      RAW2: false,
      IQR2: false,
      RG4: false,
      TM1: true,
      LB2R2: false,
      TK600: false,
      IMB50: true,
      EXC25: false,
    });

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

      <DeckButtons
        labels={["MASTER","RAW2","IQR2","RG4","TM1","LB2R2","TK600","IMB50","EXC25"]}

        value={buttons}

        onChange={setButtons}
      />

    </div>
  );
}
