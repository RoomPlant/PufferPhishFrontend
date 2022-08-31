import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import stateInterface from "../../misc/stateInterface";
import axios from "axios";

export const fetchEmail = createAsyncThunk('email/fetchEmail', async () => {
    try {
        console.log('hui');
        const response = await axios.post('http://localhost:3030/getMail');
        return response.data
    } catch(error) {
        console.log(error);        
    }
})

interface authorizeMailProps {
    email: string,
    passwd: string
}

export const authorizeMail = createAsyncThunk('email/mailAuth', async ({email, passwd}: authorizeMailProps) => {
    try {
        console.log('hui');
        const response = await axios.post('http://localhost:3030/mailAuth', {
            login: email,
            passwd: passwd
        });
    } catch(error) {
        console.log(error);        
    }
})

const initialState = {
    isAnyEmailAuthed: false,
    isAdditional: false,
    emails: [],
    startingNumber: 1,
    emailStatus: 'idle',
    authStatus: 'idle'
}

export const emailsSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
        setAuthed: state => {state.isAnyEmailAuthed = true},
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEmail.pending, (state, action) => {
                state.emailStatus = 'loading'
            })
            .addCase(fetchEmail.fulfilled, (state, action) => {
                state.emailStatus = 'succeeded';
                state.emails = action.payload.reverse()
            })
            .addCase(fetchEmail.rejected, (state, action) => {
                state.emailStatus = 'rejected'
            })
            .addCase(authorizeMail.pending, (state, action) => {
                state.authStatus = 'loading'
            })
            .addCase(authorizeMail.fulfilled, (state, action) => {
                state.authStatus = 'succeeded';
                state.isAnyEmailAuthed = true;
            })
            .addCase(authorizeMail.rejected, (state, action) => {
                state.authStatus = 'rejected'
            })
    }
});

export const selectStartingNumber = (state:stateInterface) =>  state.emails.startingNumber;
export const selectIsEmailAuthed = (state:stateInterface) => state.emails.isAnyEmailAuthed;
export const selectEmails = (state:stateInterface) => state.emails.emails;
export const selectIsAdditional = (state:stateInterface) => state.emails.isAdditional;
export const selectEmailsStatus = (state:stateInterface) => state.emails.emailStatus;
export const selectAuthStatus = (state:stateInterface) => state.emails.authStatus;

export const { setAuthed } = emailsSlice.actions;
export default emailsSlice.reducer;