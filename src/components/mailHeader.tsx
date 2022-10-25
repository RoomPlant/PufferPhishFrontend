import React from "react";
import { refreshMails, selectEmailRefreshingStatus, selectIndex } from "../features/emails/emailsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useSelector } from "react-redux";

export const MailHeader = () => {
	const index = useSelector(selectIndex)
	const dispatch = useDispatch<AppDispatch>()
	const mailsRefreshingStatus = useSelector(selectEmailRefreshingStatus)
	const handleClick = () => {
		if (mailsRefreshingStatus === "idle") {
			dispatch(refreshMails(index))
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