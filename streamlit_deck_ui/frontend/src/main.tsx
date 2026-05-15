import React from "react";
import ReactDOM from "react-dom/client";

import "./components/theme/tokens.css";

import App from "./App";

import Bridge from "./Bridge";

const isDev = window.location.search.includes( "dev=1" );

const RootComponent =
  isDev ? App : Bridge;

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
