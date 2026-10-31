"""Deck UI interactive demo: streamlit run examples/demo.py"""
import streamlit as st
from streamlit_deck_ui import deck_slider, deck_buttons, deck_toggle, deck_selectbox, deck_number_input

st.set_page_config(page_title="Deck UI Test", layout="wide")
st.title("Deck UI Test")

st.subheader("Slider")
slider_value = deck_slider(
    value=0.0, 
    min=-1, 
    max=1, 
    step=0.5, 
    label="DECK SLIDER",
    orientation="horizontal",
    key="demo_slider")
st.write("Returned:", slider_value)
st.divider()

st.subheader("Buttons — radio")
radio_value = deck_buttons(
    labels=["MASTER", "RAW2", "IQR2", "RG4", "TM1"],
    title="BARS",
    mode="radio",
    orientation="horizontal",
    fontSize=12,
    shell=True,
    key="demo_radio")
st.write("Returned:", radio_value)

st.subheader("Buttons — checkbox")
checkbox_value = deck_buttons(
    options={"AS (120)": 1, "EU (80)": 2, "US (91)": 4},
    title="SESSIONS",
    mode="checkbox",
    orientation="horizontal",
    fontSize=12,
    shell=True,
    key="demo_checkbox")
st.write("Returned:", checkbox_value)
st.divider()

st.subheader("Toggle")
toggle_value = deck_toggle(
    label="ENABLED",
    value=True,
    title="FEATURE",
    fontSize=14,
    shell=True,
    padding=12,
    key="demo_toggle")
st.write("Returned:", toggle_value)
st.divider()

st.subheader("Selectbox")
selected = deck_selectbox(
    label="Minimum metric overlap",
    options=range(1, 6),
    index=1,
    label_font_size=16,
    value_font_size=30,
    border=True, padding=12,
    width=240,
    use_container_width=True,
    key="demo_selectbox")
st.write("Returned:", selected, "(type:", type(selected).__name__, ")")

st.subheader("Selectbox — formatted semantic values")
trend = deck_selectbox(
    label="Trend",
    options=[None, 1, -1],
    index=0, format_func=lambda x: {None: "BOTH", 1: "BULL", -1: "BEAR"}[x],
    label_font_size=14,
    value_font_size=24,
    width=220,
    use_container_width=False,
    key="demo_trend")
st.write("Returned:", trend)


st.divider()
st.subheader("Number input — integer")
quantity = deck_number_input(
    label="Minimum metric overlap",
    value=2,
    min_value=1,
    max_value=10,
    step=1,
    label_font_size=16,
    value_font_size=30,
    show_limits=True,
    limits_font_size=12,
    use_container_width=True,
    key="demo_number_int",
)
st.write("Returned:", quantity, "(type:", type(quantity).__name__, ")")

st.subheader("Number input — decimal, fixed width")
threshold = deck_number_input(
    label="Minimum threshold",
    value=2.5,
    min_value=0.0,
    max_value=10.0,
    step=0.25,
    label_font_size=16,
    value_font_size=30,
    show_limits=True,
    limits_font_size=12,
    width=240,
    use_container_width=False,
    key="demo_number_float",
)
st.write("Returned:", threshold, "(type:", type(threshold).__name__, ")")
