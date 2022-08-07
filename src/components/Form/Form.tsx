import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button'
import "./styles.css";
import { Input } from "../input";
import axios from "axios";

interface authProps {
    setIsAuthed: Function,
    isAdditional?: boolean
}

export const AuthForm = ({setIsAuthed, isAdditional}:authProps) => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

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
                    setIsAuthed(true);
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
                {isAdditional && <div onClick={() => setIsAuthed(true)} className="closeIcon"/>}
            </div> 
        </div>
    )
}