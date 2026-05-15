import React from "react";
import ReactDOM from "react-dom/client";

import "./components/theme/tokens.css";

import App from "./App";

import Bridge, {
  BridgeInner,
} from "./Bridge";

const isStreamlit =
  window.location.search.includes(
    "streamlit=1"
  );

const RootComponent =
  isStreamlit
    ? Bridge
    : App;

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
