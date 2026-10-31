from pathlib import Path
from typing import Optional

import streamlit as st
import streamlit.components.v1 as components


_RELEASE = False


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
# st.write("raw_key:", raw_key)
# st.write("stored:", st.session_state.get(raw_key, "MISSING"))
# st.write("synced:", synced_value)
def _sync_session_value(key: Optional[str], value):

    if key is None:
        return value

    if key not in st.session_state or st.session_state[key] is None:
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
    title: str | None = None,
    mode: str = "checkbox",
    orientation: str = "horizontal",
    fontSize: int = 14,
    shell: bool = True,
    padding: int = 12,
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

    title: Optional title on top as st.markdown(f"##### {title}")

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

    # OPTIONS
    # ==================================================

    if options is not None: labels = list(options.keys())
    else: options = { label: label for label in labels }

    # DEFAULT RAW STATE
    # ==================================================

    DEFAULT_VALUES = { label: False for label in labels }

    if mode == "radio" and labels:
        DEFAULT_VALUES[labels[0]] = True

    elif mode == "checkbox":
        DEFAULT_VALUES = { label: True for label in labels }


    # INTERNAL RAW STATE KEY
    # ==================================================

    raw_key = ( f"__raw_{key}" if key else None )

    synced_value = _sync_session_value( raw_key, value or DEFAULT_VALUES )

    # COMPONENT
    # ==================================================
    if title:
        st.markdown(f"##### {title}")

    raw = _component_func(
        component="deck_buttons",
        labels=labels,
        value=synced_value,
        mode=mode,
        orientation=orientation,
        fontSize=fontSize,
        shell=shell,
        padding=padding,
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


def deck_toggle(
    label: str = "TOGGLE",
    value: bool = False,
    title: str | None = None,
    fontSize: int = 14,
    shell: bool = True,
    padding: int = 12,
    key: Optional[str] = None,
):
    """
    Deck UI boolean toggle using a single deck_buttons button.

    Returns
    -------
    bool
        True when active, False when inactive.
    """

    raw_value = {
        label: value,
    }

    result = deck_buttons(
        labels=[label],
        value=raw_value,
        title=title,
        mode="checkbox",
        orientation="horizontal",
        fontSize=fontSize,
        shell=shell,
        padding=padding,
        key=key,
    )

    return label in result



import streamlit as st


def deck_selectbox(
    label: str,
    options,
    index: int = 0,
    label_font_size: int = 16,
    value_font_size: int = 28,
    border: bool = True,
    padding: int = 12,
    width: int = 240,
    use_container_width: bool = True,
    key: Optional[str] = None,
    format_func=None,
):
    """React metric-style selectbox. No explicit session-state access."""
    options = list(options)
    if not options:
        return None
    if not 0 <= index < len(options):
        raise ValueError("index out of range")

    formatter = format_func or str
    labels = [str(formatter(option)) for option in options]
    if len(set(labels)) != len(labels):
        raise ValueError("Selectbox labels must be unique")

    default_label = labels[index]
    raw_key = f"__raw_{key}" if key else None

    current = default_label
    if raw_key is not None:
        current = st.session_state.get(raw_key, default_label)
        if current not in labels:
            current = default_label
            st.session_state[raw_key] = current

    selected_label = _component_func(
        component="deck_selectbox",
        labels=labels,
        value=current,
        label=label,
        width=width,
        useContainerWidth=use_container_width,
        labelFontSize=label_font_size,
        valueFontSize=value_font_size,
        padding=padding,
        shell=border,
        key=raw_key,
        default=current,
    )

    if selected_label not in labels:
        selected_label = default_label

    selected = options[labels.index(selected_label)]
    if raw_key is not None:
        st.session_state[key] = selected

    return selected


def deck_number_input(
    label: str,
    value: int | float = 0,
    min_value: int | float | None = None,
    max_value: int | float | None = None,
    step: int | float = 1,
    label_font_size: int = 16,
    value_font_size: int = 28,
    show_limits: bool = True,
    limits_font_size: int = 12,
    border: bool = True,
    padding: int = 12,
    width: int = 240,
    use_container_width: bool = True,
    key: Optional[str] = None,
):
    """Metric-style React numeric input. Returns int or float based on numeric arguments."""
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise TypeError("value must be an int or float")
    if isinstance(step, bool) or not isinstance(step, (int, float)) or step <= 0:
        raise ValueError("step must be positive")
    if min_value is not None and max_value is not None and min_value > max_value:
        raise ValueError("min_value must not exceed max_value")

    integer_mode = all(
        isinstance(x, int) and not isinstance(x, bool)
        for x in (value, step, min_value, max_value) if x is not None
    )
    precision = 0 if integer_mode else min(10, max(
        len(str(x).split(".")[1]) if "." in str(x) and "e" not in str(x).lower() else 0
        for x in (value, step, min_value, max_value) if x is not None
    ))
    default_value = value
    raw_key = f"__raw_{key}" if key else None
    current = st.session_state.get(raw_key, default_value) if raw_key else default_value
    if not isinstance(current, (int, float)) or isinstance(current, bool):
        current = default_value
    if min_value is not None and current < min_value:
        current = min_value
    if max_value is not None and current > max_value:
        current = max_value
    if raw_key is not None and st.session_state.get(raw_key) != current:
        st.session_state[raw_key] = current  # before widget instantiation

    result = _component_func(
        component="deck_number_input", value=current,
        label=label, minValue=min_value, maxValue=max_value,
        step=step, precision=precision, integerMode=integer_mode,
        labelFontSize=label_font_size, valueFontSize=value_font_size,
        showLimits=show_limits, limitsFontSize=limits_font_size,
        shell=border, padding=padding, width=width,
        useContainerWidth=use_container_width,
        key=raw_key, default=current,
    )
    if not isinstance(result, (int, float)) or isinstance(result, bool):
        result = current
    if min_value is not None:
        result = max(min_value, result)
    if max_value is not None:
        result = min(max_value, result)
    result = int(result) if integer_mode else float(result)
    if key is not None:
        st.session_state[key] = result  # public semantic key only
    return result
