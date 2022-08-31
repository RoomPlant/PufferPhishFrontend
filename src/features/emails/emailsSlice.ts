import { createSlice } from "@reduxjs/toolkit";
import stateInterface from "../../misc/stateInterface";

const initialState = {
    isAnyEmailAuthed: true,
    isAdditional: false,
    eMails: [
        {
            sender: "chel1",
            subject: "otchislenie1",
            date: "29.01"
        },
        {
            sender: "chel2",
            subject: "otchislenie2",
            date: "29.02"
        },
        {
            sender: "chel3",
            subject: "otchislenie3",
            date: "29.03"
        },
        {
            sender: "chel4",
            subject: "otchislenie4",
            date: "29.04"
        },
        {
            sender: "chel5",
            subject: "otchislenie5",
            date: "29.05"
        }
    ],
    startingNumber: 1,
}

export const emailsSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
        setAuthed: state => {state.isAnyEmailAuthed = true},
    }
});

export const selectStartingNumber = (state:stateInterface) =>  state.emails.startingNumber;
export const selectIsEmailAuthed = (state:stateInterface) => state.emails.isAnyEmailAuthed;
export const selectEMails = (state:stateInterface) => state.emails.eMails;
export const selectIsAdditional = (state:stateInterface) => state.emails.isAdditional;

export const { setAuthed } = emailsSlice.actions;
export default emailsSlice.reducer;