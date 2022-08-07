import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button'
import "./styles.css";
import { Input } from "../../components/input";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface loginProps {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>, 
    isLoggedIn: boolean,
}

export let LoginPage = (props:loginProps) => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState(''); 

    const onClick = async () => {
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
                    props.setIsLoggedIn(true);
                    window.location.href = '/index/email';
                }
        });
    }

    return (
        <div className="background">
            {props.isLoggedIn ?
                <Navigate to={"/index/email"}/>
                : 
                    <div className="formBackground">
                        <div className="form">
                            <p className="heading">Авторизация</p>
                            <Input value={email} handleChange={setEmail} type="email" labelStyle="label" inputStyle="input" label="Email"/>
                            <Input value={passwd} handleChange={setPasswd} type="password" labelStyle="label" inputStyle="input" label="Пароль"/>
                            <Button onClick={onClick} className="button">Войти</Button>
                        </div>
                    </div> 
            } 
        </div>
    )
}