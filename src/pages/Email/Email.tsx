import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { AuthForm } from "../../components/Form/Form";
import { setAuthed } from "../../features/emails/emailsSlice";
import stateInterface from "../../misc/stateInterface"
import "./styles.css"

export const EmailPage = () => {
    const isEmailAuthed = useSelector((state:stateInterface) => state.emails.isAnyEmailAuthed)
    const dispatch = useDispatch();
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:3030/checkAuth',
        }).then(resp => {
            if (resp.data == "success") {
                dispatch(setAuthed());
                axios({
                    method: 'post',
                    url: 'http://localhost:3030/getMail',
                }).then(resp =>{
                    console.log(resp.data)
                })
            }
        });
    }, [])
    return (
        <div className="mailWrapper">
            {
                isEmailAuthed ?
                <div>You are in</div>
                :
                <AuthForm/>
            }
        </div>
    )
}