import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from "react-redux";

import { Input } from "./input";
import { AppDispatch } from "../app/store";
import { selectIsAdditional, authorizeMail, hadleMailAddressAddition, selectAuthStatus } from "../features/emails/emailsSlice";



export const AuthForm = () => {
	const [email, setEmail] = useState('');
	const [passwd, setPasswd] = useState('');

	const isAdditional = useSelector(selectIsAdditional);
	const authStatus = useSelector(selectAuthStatus);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className={"background" + (authStatus !== "loading" ? " backgroundBlur" : "")}>
			<div className="formBackground">
				<div className="form">
					<p className="heading">Добавление почты</p>
					<Input value={email} handleChange={setEmail} type="email" labelStyle="label" inputStyle="input" label="Email" />
					<Input value={passwd} handleChange={setPasswd} type="password" labelStyle="label" inputStyle="input" label="Пароль" />
					<Button onClick={() => dispatch(authorizeMail({ email, passwd }))} className="button">Добавить</Button>
				</div>
				{isAdditional && <div onClick={() => { dispatch(hadleMailAddressAddition()) }} className="closeIcon" />}
			</div>
		</div>
	)
}