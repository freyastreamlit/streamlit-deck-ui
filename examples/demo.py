import streamlit as st

from streamlit_deck_ui import deck_slider

# pip install -e .

st.set_page_config( layout="centered" )

st.title("Deck UI Test")

if "gain" not in st.session_state:
    st.session_state.gain = 0.0

value = deck_slider(
    value=st.session_state.gain,
    min_value=-1,
    max_value=1,
    step=0.5,
    label='DECK SLIDER',
    orientation='horizontal',
    key="gain_slider",
)

st.session_state.gain = value

st.write( "Gain:", st.session_state.gain )

