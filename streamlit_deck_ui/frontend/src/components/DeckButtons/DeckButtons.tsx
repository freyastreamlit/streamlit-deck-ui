import { useEffect, useState } from "react";

import "./DeckButtons.css";

type DeckButtonsMode = | "multi" | "radio";

type DeckButtonsProps = {
  labels: string[];
  value?: Record<string, boolean>;
  mode?: DeckButtonsMode;
  onChange?: ( value: Record<string, boolean> ) => void;
};

export function DeckButtons({ labels, value = {}, mode = "multi", onChange }: DeckButtonsProps) {

  const [state, setState] = useState<Record<string, boolean>>({});

  useEffect(() => {

    const initialState: Record<string, boolean> = {};

    labels.forEach((label) => { initialState[label] = value[label] ?? false });

    setState(initialState);

  }, [labels, value]);

  function toggleButton( label: string ) {

    let nextState: Record<string, boolean> = {};

    if (mode === "radio") { labels.forEach( (item) => { nextState[item] = item === label } ) }
    else { nextState = { ...state, [label]: !state[label] } }

    setState(nextState);

    onChange?.(nextState);
  }

  return (
    <div className="deck-buttons-shell">

      <div className="deck-buttons-row">

        {labels.map((label) => {

          const active = state[label];

          return (

            <button
              key={label}
              type="button"
              className={ `deck-button ${ active ? "active" : "inactive" }` }
              onClick={() => toggleButton(label) }
            >

              <div className="deck-button-inner">

                <div className="deck-button-label"> {label} </div>

              </div>

            </button>

          );
        })}

      </div>

    </div>
  );
}
