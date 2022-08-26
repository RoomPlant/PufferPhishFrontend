import { createSlice } from "@reduxjs/toolkit";
import stateInterface from "../../misc/stateInterface";

const initialState = {
    isAnyEmailAuthed: false,
    isAdditional: false,
    eMails: [],
    startingNumber: 1,
}

export const emailsSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
        setAuthed: state => {state.isAnyEmailAuthed = true},
        fetchEmails: (state, action) => {
            state.eMails = action.payload;
        }
    }
});

export const selectStartingNumber = (state:stateInterface) =>  state.emails.startingNumber;
export const selectIsEmailAuthed = (state:stateInterface) => state.emails.isAnyEmailAuthed;
export const selectEMails = (state:stateInterface) => state.emails.eMails;
export const selectIsAdditional = (state:stateInterface) => state.emails.isAdditional;

export const { setAuthed, fetchEmails } = emailsSlice.actions;
export default emailsSlice.reducer;