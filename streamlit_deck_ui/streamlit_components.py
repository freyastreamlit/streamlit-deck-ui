from typing import Optional

import streamlit.components.v1 as components


_component_func = components.declare_component(
    "streamlit_deck_ui",
    url="http://localhost:5173",
)


def deck_slider(
    value: float = 0.0,
    min_value: float = -1.0,
    max_value: float = 1.0,
    step: float = 0.0,
    label: str = "SLIDER",
    orientation: str = "horizontal",
    key: Optional[str] = None,
):

    return _component_func(
        component="deck_slider",
        value=value,
        min_value=min_value,
        max_value=max_value,
        step=step,
        label=label,
        orientation=orientation,
        key=key,
        default=value,
    )

