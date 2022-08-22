import { configureStore } from "@reduxjs/toolkit";
import emailsReducer from "../features/emails/emailsSlice"

export const store = configureStore({
    reducer: {
        emails: emailsReducer,
    }
}) 