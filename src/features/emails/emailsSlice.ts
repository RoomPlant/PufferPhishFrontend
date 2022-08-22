import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAnyEmailAuthed: false,
    isAdditional: false,
}

export const emailsSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
        setAuthed: state => {state.isAnyEmailAuthed = true}
    }
});

export const { setAuthed } = emailsSlice.actions;
export default emailsSlice.reducer;