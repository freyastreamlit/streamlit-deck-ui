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
    step: float = 1.0,
    label: str = "SLIDER",
    length: int = 180,
    thickness: int = 10,
    shell: bool = True,
    padding: int = 16,
    orientation: str = "horizontal",
    key: Optional[str] = None,
):
    """
    Deck UI custom slider component.

    Parameters
    ----------
    value: Initial slider value.

    min: Minimum slider value.

    max: Maximum slider value.

    step: Step increment.
        Integer steps render integer values.
        Decimal steps render with two decimals.

    label: Slider label.

    length: Rail length.
        Horizontal -> width
        Vertical   -> height

    thickness: Rail thickness.
        Horizontal -> height
        Vertical   -> width

    shell: Enable styled outer shell container.

    padding: Shell inner padding.

    orientation
        "horizontal" or "vertical"

    key: Standard Streamlit component key.

    Returns
    -------
    Current slider value.
    """

    synced_value = _sync_session_value(key,value)

    return _component_func(
        component="deck_slider",
        value=synced_value,
        min=min,
        max=max,
        step=step,
        label=label,
        length=length,
        thickness=thickness,
        shell=shell,
        padding=padding,
        orientation=orientation,
        key=key,
        default=synced_value,
    )



def deck_buttons(
    labels: list[str] | None = None,
    options: dict[str, str | int | float] | None = None,
    value: dict[str, bool] | None = None,
    mode: str = "checkbox",
    orientation: str = "horizontal",
    fontSize: int = 14,
    key: Optional[str] = None,
):
    """
    Deck UI toggle button group.

    Parameters
    ----------
    labels
        Simple list of labels. Returned values are the labels themselves.
        Example:
            deck_buttons(labels=["AS", "EU", "US"])
            # returns ["AS"]


    options
        Mapping of display-label -> semantic value.
        Preferred for filters and selectors.

        Example:
            deck_buttons( options={ "AS (120)": 1, "EU (80)": 2, "US (91)": 4 } )
            # returns [1]

    value: Initial internal toggle state.

    mode
        "checkbox" -> multiple selections (returns list)
        "radio"    -> single selection (returns single value)

    orientation: "horizontal" or "vertical"

    fontSize: Button label font size.

    key: Standard Streamlit component key.

    Returns
    -------
    checkbox mode: list of selected values

    radio mode: selected value
    """
def deck_buttons(
    labels: list[str] | None = None,
    options: dict[str, str | int | float] | None = None,
    value: dict[str, bool] | None = None,
    mode: str = "checkbox",
    orientation: str = "horizontal",
    fontSize: int = 14,
    key: Optional[str] = None,
):
    """
    Deck UI toggle button group.

    Parameters
    ----------
    labels
        Simple list of labels. Returned values are the labels themselves.

    options
        Mapping of display-label -> semantic value.
        Preferred for filters and selectors.

        Example:
            {
                "AS (120)": 1,
                "EU (80)": 2,
                "US (91)": 4
            }

    value
        Initial internal toggle state.

    mode
        "checkbox" -> multiple selections (returns list)
        "radio"    -> single selection (returns single value)

    orientation
        "horizontal" or "vertical"

    fontSize
        Button label font size.

    key
        Standard Streamlit component key.

    Returns
    -------
    checkbox mode:
        list of selected values

    radio mode:
        selected value
    """

    # OPTIONS
    # ==================================================

    if options is not None:

        labels = list(options.keys())

    else:

        options = { label: label for label in labels }

    # DEFAULT RAW STATE
    # ==================================================

    DEFAULT_VALUES = { label: False for label in labels }

    if labels:
        DEFAULT_VALUES[labels[0]] = True

    # INTERNAL RAW STATE KEY
    # ==================================================

    raw_key = ( f"__raw_{key}" if key else None )

    synced_value = _sync_session_value( raw_key, value or DEFAULT_VALUES )

    # COMPONENT
    # ==================================================

    raw = _component_func(
        component="deck_buttons",
        labels=labels,
        value=synced_value,
        mode=mode,
        orientation=orientation,
        fontSize=fontSize,
        key=raw_key,
        default=synced_value,
    )

    if raw is None:
        raw = synced_value

    # RADIO MODE
    # ==================================================

    if mode == "radio":

        selected = next( ( label for label, active in raw.items() if active ), None )

        result = ( options[selected] if selected is not None else None )

    # CHECKBOX MODE
    # ==================================================

    else:

        result = [ options[label] for label, active in raw.items() if active ]

    # PUBLIC SEMANTIC STATE
    # ==================================================

    if key is not None:
        st.session_state[key] = result

    return result
