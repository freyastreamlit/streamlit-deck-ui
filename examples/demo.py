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
    labels=["MASTER","RAW2","IQR2","RG4","TM1","LB2R2","TK600" ],
    # mode='radio',
    mode='checkbox',
    # orientation='horizontal',
    orientation='vertical',
    fontSize=12,
    key="deck_buttons",
)

st.write( st.session_state.deck_buttons )




def deck_filter_buttons(label_map, counts=None, key=None, title=None):

    counts = counts or {}

    if title:
        st.markdown(f"##### {title}")

    labels = { f"{name} ({counts.get(value, 0)})": value for value, name in label_map.items() }

    state = deck_buttons(
        labels=list(labels.keys()),
        value={label: True for label in labels},
        orientation="vertical",
        mode="multi",
        key=key
    )

    return [ labels[label] for label, active in state.items() if active ]


def distribution_selector(DF):

    SESSION_MAP = {1: "AS", 2: "EU", 4: "US"}
    TREND_MAP = {1: "BULL", -1: "BEAR"}

    session_counts = DF["session"].value_counts().to_dict()
    trend_counts = DF["trend"].value_counts().to_dict()


    col1, col2 = st.columns(2)

        # SESSION FILTERS
    # =======================
    with col1:

        # selected_sessions  # [1, 2, 4]
        selected_sessions = deck_filter_buttons(
            SESSION_MAP,
            counts=session_counts,
            key="selected_sessions",
            title="Sessions"
        )

    # TREND FILTERS
    # =======================
    with col2:

        # selected_trends    # [1, -1]
        selected_trends = deck_filter_buttons(
            TREND_MAP,
            counts=trend_counts,
            key="selected_trends",
            title="Trend"
        )


    # session filter
    if selected_sessions:
        df_session = DF[ DF["session"].isin(selected_sessions) ]
    else:
        df_session = DF

    # trend filter
    if selected_trends:
        BARONE = df_session[ df_session["trend"].isin(selected_trends) ]
    else:
        BARONE = df_session
    
    return BARONE
