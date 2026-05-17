from pathlib import Path
from typing import Optional

import streamlit.components.v1 as components


_RELEASE = True


if not _RELEASE:

    _component_func = components.declare_component(
        "streamlit_deck_ui",
        url="http://localhost:5173",
    )

else:

    parent_dir = Path(__file__).parent
    build_dir = ( parent_dir / "frontend" / "dist" )
    _component_func = components.declare_component( "streamlit_deck_ui", path=str(build_dir) )



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

def deck_buttons(
    labels: list[str],
    value: dict[str, bool] | None = None,
    key: Optional[str] = None,
):

    return _component_func(
        component="deck_buttons",
        labels=labels,
        value=value or {},
        key=key,
        default=value or {},
    )
