import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import stateInterface from "../../misc/stateInterface";
import axios from "axios";

export const fetchEmail = createAsyncThunk('email/fetchEmail', async () => {
    try {
        const response = await axios.post('http://localhost:3030/getMail');
        return response.data
    } catch(error) {
        console.log(error);        
    }
})

export const checkAuth = createAsyncThunk('email/checkAuth', async () => {
    try {
        const response = await axios.post('http://localhost:3030/checkAuth');
        return response.data;
    } catch(error) {
        console.log(error);        
    }
})

export const loadMails = createAsyncThunk('email/loadMails', async () => {
    try {
        const response = await axios.post('http://localhost:3030/loadMails');
        return response.data;
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
    emailStatus: 'idle',
    authStatus: 'idle',
    authCheckStatus: 'idle',
    emailLoadingStatus: 'idle',
}

export const emailsSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEmail.pending, (state, action) => {
                state.emailStatus = 'loading';
            })
            .addCase(fetchEmail.fulfilled, (state, action) => {
                state.emailStatus = 'succeeded';
                state.emails = action.payload;
            })
            .addCase(fetchEmail.rejected, (state, action) => {
                state.emailStatus = 'rejected';
            })
            .addCase(loadMails.pending, (state, action) => {
                state.emailLoadingStatus = 'loading';
            })
            .addCase(loadMails.fulfilled, (state, action) => {
                if (action.payload === "finished")  {
                    state.emailLoadingStatus = 'succeeded';
                } else {
                    state.emailLoadingStatus = 'idle';
                    state.emails = action.payload;
                }
            })
            .addCase(loadMails.rejected, (state, action) => {
                state.emailLoadingStatus = 'rejected';
            })
            .addCase(authorizeMail.pending, (state, action) => {
                state.authStatus = 'loading';
            })
            .addCase(authorizeMail.fulfilled, (state, action) => {
                state.authStatus = 'succeeded';
                state.isAnyEmailAuthed = true;
            })
            .addCase(authorizeMail.rejected, (state, action) => {
                state.authStatus = 'rejected';
            })
            .addCase(checkAuth.pending, (state, action) => {
                state.authCheckStatus = 'loading';
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.authCheckStatus = 'succeeded';
                if (action.payload == "success") {
                    state.isAnyEmailAuthed = true;
                }
                
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.authCheckStatus = 'rejected';
            })
    }
});

export const selectIsEmailAuthed = (state:stateInterface) => state.emails.isAnyEmailAuthed;
export const selectEmails = (state:stateInterface) => state.emails.emails;
export const selectIsAdditional = (state:stateInterface) => state.emails.isAdditional;
export const selectEmailsStatus = (state:stateInterface) => state.emails.emailStatus;
export const selectEmailLoadingStatus = (state:stateInterface) => state.emails.emailLoadingStatus;
export const selectAuthStatus = (state:stateInterface) => state.emails.authStatus;

export default emailsSlice.reducer;