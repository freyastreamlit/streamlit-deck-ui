from pathlib import Path
from typing import Optional

import streamlit as st
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


# Helper to synchronise st.session_state[key] with react state
def _sync_session_value( key: Optional[str], value ):

    if key is None:
        return value

    if key not in st.session_state:
        st.session_state[key] = value

    return st.session_state[key]


def deck_slider(
    value: float = 0.0,
    min: float = -1.0,
    max: float = 1.0,
    step: float = 0.0,
    label: str = "SLIDER",
    orientation: str = "horizontal",
    key: Optional[str] = None,
):

    synced_value = _sync_session_value(key,value)

    return _component_func(
        component="deck_slider",
        value=synced_value,
        min=min,
        max=max,
        step=step,
        label=label,
        orientation=orientation,
        key=key,
        default=synced_value,
    )

def deck_buttons(
    labels: list[str],
    value: dict[str, bool] | None = None,
    mode: str = "checkbox",
    orientation: str = "horizontal",
    fontSize: int = 14,
    key: Optional[str] = None,
):

    DEFAULT_VALUES = { label:False for label in labels }
    DEFAULT_VALUES[ labels[0] ] = True  # Default to first button selected for radios
    synced_value = _sync_session_value( key, value or DEFAULT_VALUES )

    return _component_func(
        component="deck_buttons",
        labels=labels,
        value=synced_value,
        mode=mode,
        orientation=orientation,
        fontSize=fontSize,
        key=key,
        default=synced_value,
    )
