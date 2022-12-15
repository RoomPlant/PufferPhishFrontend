import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import Button from 'react-bootstrap/Button';
import { Input } from "./input";
import { submitKey } from "../features/emails/emailsSlice";

export const KeyForm = () => {
	const [key, setKey] = useState('');
	const [isValid, setIsValid] = useState(true)
	const dispatch = useDispatch<AppDispatch>();
	const handleSubmit = () => {
		if (key === '') {
			setIsValid(false)
		} else {
			dispatch(submitKey(key))
		}
	}

	return (
		<div className="keyFormWrapper">
			<div className="keyForm">
				<p className="formText">Введите ваш ключ доступа</p>
				<Input value={key} handleChange={setKey} type="password" labelStyle="label" inputStyle="input" label="Ключ" />
				<Button onClick={handleSubmit} className="button">Подтвердить</Button>
			</div>
		</div>
	)
}