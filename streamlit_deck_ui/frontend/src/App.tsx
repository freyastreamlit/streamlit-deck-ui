import { DeckPanel } from "./components/DeckPanel/DeckPanel";

export default function App() {
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
        <div
          style={{
            color:
              "rgba(255,180,80,0.7)",

            fontSize: "24px",

            letterSpacing: "0.08em",
          }}
        >
          SYSTEM ONLINE
        </div>
      </DeckPanel>
    </div>
  );
}
