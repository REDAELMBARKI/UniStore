import { palette } from "@/theme/palette";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    colors: palette.light
};

export  const themeSlice = createSlice({
    name : 'theme',
    initialState   ,
    reducers : {
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            state.colors = state.mode === "light"
                ? palette.light
                : palette.dark;
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
            state.colors = action.payload === "light"
                ? palette.light
                : palette.dark;
        }
    }
});

export  const {toggleTheme , setTheme}  = themeSlice.actions ;
export default themeSlice.reducer ;