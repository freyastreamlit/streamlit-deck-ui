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
    min=-1,
    max=1,
    step=0.5,
    label="DECK SLIDER",
    orientation="horizontal",
    key="deck_slider",
)

st.write( "deck_slider:",
    st.session_state.deck_slider
)

st.divider()

# ==========================================
# BUTTONS
# ==========================================


buttons_value = deck_buttons(
    labels=["MASTER","RAW2","IQR2","RG4","TM1","LB2R2","TK600","IMB50","EXC25" ],
    key="deck_buttons",
)

st.write( st.session_state.deck_buttons )
