import React from "react";
import { changeIndex, deleteMailBox, hadleMailAddressAddition, refreshMails, selectAddressList, selectAllStatuses, selectEmailRefreshingStatus, selectIndex } from "../features/emails/emailsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import crossIcon from "../styles/media/x.svg"

export const MailHeader = () => {
	const index = useSelector(selectIndex);
	const addressList = useSelector(selectAddressList);
	const allStatuses = useSelector(selectAllStatuses);
	const dispatch = useDispatch<AppDispatch>();
	const mailsRefreshingStatus = useSelector(selectEmailRefreshingStatus);
	const handleRefresh = () => {
		if (mailsRefreshingStatus === "idle") {
			dispatch(refreshMails(index))
		}
	}

	return (
		<div className="mailHeader">
			<div className="mailAddresses">
				{
					addressList.map((address, index) => (
						<div key={address.address} className="address" onClick={() => { dispatch(changeIndex(index)) }}>
							{address.address}
							<img onClick={() => {
								if (allStatuses.every((status => status !== "loading"))) {
									dispatch(deleteMailBox(index))
								}
							}} className="delete" src={crossIcon} />
						</div>
					))
				}
				<div className="addButton" onClick={() => dispatch(hadleMailAddressAddition())} />
			</div>
			<div
				onClick={handleRefresh}
				className={
					"refreshButton" +
					(
						mailsRefreshingStatus === "loading" ? " beingRefreshed" : ""
					)}
			/>
		</div>
	)
}