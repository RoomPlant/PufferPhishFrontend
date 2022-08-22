import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import "./styles.css";
import { Input } from "../input";
import stateInterface from "../../misc/stateInterface";
import { setAuthed } from "../../features/emails/emailsSlice";



export const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const isAdditional = useSelector((state:stateInterface) => state.emails.isAdditional);
    const dispatch = useDispatch();

    const handleAuth = async () => {
        axios({
            method: 'post',
            url: 'http://localhost:3030/mailAuth',
            data: {
                "login": email,
                "passwd": passwd
            }
       })
            .then(resp => {
                if (resp.data == "success") {
                    dispatch(setAuthed());
                }
        });
    }

    return (
        <div className="background">
            <div className="formBackground">
                <div className="form">
                    <p className="heading">Добавление почты</p>
                    <Input value={email} handleChange={setEmail} type="email" labelStyle="label" inputStyle="input" label="Email"/>
                    <Input value={passwd} handleChange={setPasswd} type="password" labelStyle="label" inputStyle="input" label="Пароль"/>
                    <Button onClick={handleAuth} className="button">Добавить</Button>
                </div>
                {isAdditional && <div onClick={() => dispatch(setAuthed())} className="closeIcon"/>}
            </div> 
        </div>
    )
}