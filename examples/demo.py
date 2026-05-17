import streamlit as st

from streamlit_deck_ui import (
    deck_slider,
    deck_buttons,
)

# pip install -e .

st.set_page_config( layout="centered" )

st.title("Deck UI Test")

# ==========================================
# SLIDER
# ==========================================

if "gain" not in st.session_state:
    st.session_state.gain = 0.0

slider_value = deck_slider(
    value=st.session_state.gain,
    min_value=-1,
    max_value=1,
    step=0.5,
    label="DECK SLIDER",
    orientation="horizontal",
    key="gain_slider",
)

if slider_value is not None:
    st.session_state.gain = slider_value

st.write(
    "Gain:",
    st.session_state.gain
)

st.divider()

# ==========================================
# BUTTONS
# ==========================================

DEFAULT_BUTTONS = {
    "MASTER": True,
    "RAW2": False,
    "IQR2": False,
    "RG4": False,
    "TM1": True,
    "LB2R2": False,
    "TK600": False,
    "IMB50": True,
    "EXC25": False,
}

if "deck_buttons" not in st.session_state:
    st.session_state.deck_buttons = DEFAULT_BUTTONS

buttons_value = deck_buttons(
    labels=["MASTER","RAW2","IQR2","RG4","TM1","LB2R2","TK600","IMB50","EXC25" ],
    value=st.session_state.deck_buttons,
    key="deck_buttons_component",
)

if buttons_value is not None:
    st.session_state.deck_buttons = buttons_value

st.write( st.session_state.deck_buttons )
