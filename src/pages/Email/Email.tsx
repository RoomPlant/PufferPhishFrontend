import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthForm } from "../../components/Form";
import { checkAuth, selectAuthCheckStatus, selectIsAdditional, selectIsEmailAuthed } from "../../features/emails/emailsSlice";
import { MailList } from "../../components/mailList"
import { useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { MailHeader } from "../../components/mailHeader";

export const EmailPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const isAdditional = useSelector(selectIsAdditional);
	const isEmailAuthed = useSelector(selectIsEmailAuthed);
	const authCheckStatus = useSelector(selectAuthCheckStatus)

	useEffect(() => {
		if (authCheckStatus !== 'succeeded') {
			dispatch(checkAuth());
		}
	}, [])
	return (
		<div className="mailWrapper">
			{
				!(authCheckStatus === "loading") &&
				(isEmailAuthed ?
					(
						<div>
							{isAdditional && <AuthForm />}
							<MailHeader />
							<MailList className="mailList" mailStyle="mail" />
						</div>
					)
					:
					<AuthForm />)
			}
		</div>
	)
}