import { useEffect, useState } from "react";

import "./DeckButtons.css";

type DeckButtonsProps = {

  labels: string[];

  value?: Record<string, boolean>;

  onChange?: ( value: Record<string, boolean> ) => void;
};

export function DeckButtons({
  labels,

  value = {},

  onChange,
}: DeckButtonsProps) {

  const [state, setState] =
    useState<Record<string, boolean>>({});

  useEffect(() => {

    const initialState:
      Record<string, boolean> = {};

    labels.forEach((label) => {

      initialState[label] =
        value[label] ?? false;
    });

    setState(initialState);

  }, [labels, value]);

  function toggleButton(
    label: string
  ) {

    const nextState = {
      ...state,

      [label]:
        !state[label],
    };

    setState(nextState);

    onChange?.(nextState);
  }

  return (
    <div className="deck-buttons-shell">

      <div className="deck-buttons-row">

        {labels.map((label) => {

          const active =
            state[label];

          return (
            <button
              key={label}

              type="button"

              className={
                `deck-button ${
                  active
                    ? "active"
                    : "inactive"
                }`
              }

              onClick={() =>
                toggleButton(label)
              }
            >

              <div className="deck-button-inner">

                <div className="deck-button-indicator" />

                <div className="deck-button-label">
                  {label}
                </div>

              </div>

            </button>
          );
        })}

      </div>

    </div>
  );
}

