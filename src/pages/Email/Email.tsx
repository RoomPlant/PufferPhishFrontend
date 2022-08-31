import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthForm } from "../../components/Form/Form";
import { selectIsEmailAuthed, setAuthed } from "../../features/emails/emailsSlice";
import { MailList } from "../../components/mailList"
import "./styles.css"
import { useSelector } from "react-redux";

export const EmailPage = () => {
    const dispatch = useDispatch();
    const isEmailAuthed = useSelector(selectIsEmailAuthed)

    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:3030/checkAuth',
        }).then(resp => {
            if (resp.data == "success") {
                dispatch(setAuthed());
            }
        });
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