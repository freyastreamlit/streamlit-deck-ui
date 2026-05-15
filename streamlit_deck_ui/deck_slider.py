from typing import Optional

import streamlit.components.v1 as components


_component_func = components.declare_component(
    "streamlit_deck_ui",
    url="http://localhost:5173/?streamlit=1",
)


def deck_slider(
    value: float = 0.0,
    min_value: float = -1.0,
    max_value: float = 1.0,
    key: Optional[str] = None,
):
    return _component_func(
        component="deck_slider",

        value=value,

        min_value=min_value,
        max_value=max_value,

        key=key,

        default=value,
    )
