import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthForm } from "../../components/Form/Form";
import { checkAuth, selectIsEmailAuthed } from "../../features/emails/emailsSlice";
import { MailList } from "../../components/mailList"
import "./styles.css"
import { useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";

export const EmailPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isEmailAuthed = useSelector(selectIsEmailAuthed)

    useEffect(() => {
        dispatch(checkAuth());
    }, [])
    return (
        <div className="mailWrapper">
            {
                isEmailAuthed ?
                <MailList className="mailList" mailStyle = "mail"/>
                :
                <AuthForm/>
            }
        </div>
    )
}