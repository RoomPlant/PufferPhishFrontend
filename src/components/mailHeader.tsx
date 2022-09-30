import React from "react";
import { refreshMails, selectEmailRefreshingStatus } from "../features/emails/emailsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useSelector } from "react-redux";

export const MailHeader = () => {
	const dispatch = useDispatch<AppDispatch>()
	const mailsRefreshingStatus = useSelector(selectEmailRefreshingStatus)
	const handleClick = () => {
		if (mailsRefreshingStatus === "idle") {
			dispatch(refreshMails())
		}
	}

	return (
		<div className="mailHeader">
			<div
				onClick={handleClick}
				className={
					"refreshButton" +
					(
						mailsRefreshingStatus === "loading" ? " beingRefreshed" : ""
					)}
			/>
		</div>
	)
}