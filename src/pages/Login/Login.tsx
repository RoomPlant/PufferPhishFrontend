import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button'
import "./styles.css";
import { Input } from "../../components/input";


export let LoginPage = () => {
const [email, setEmail] = useState('');
const [passwd, setPasswd] = useState(''); 

    return (
        <div className="background">
            <div className="formBackground">
                <div className="form">
                    <p className="heading">Авторизация</p>
                    <Input value={email} handleChange={setEmail} type="email" labelStyle="label" inputStyle="input" label="Email"/>
                    <Input value={passwd} handleChange={setPasswd} type="password" labelStyle="label" inputStyle="input" label="Пароль"/>
                    <Button className="button">Войти</Button>
                </div>
            </div>
        </div>
    )
}