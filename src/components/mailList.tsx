import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import { selectEmails, selectEmailsStatus, fetchEmail, selectEmailLoadingStatus, loadMails } from '../features/emails/emailsSlice';
import { AppDispatch } from '../app/store';

interface MailListProps {
	mailStyle: string,
	className: string,
}

export const MailList = ({ mailStyle, className }: MailListProps) => {
	const [mailOpener, setMailOpener] = useState<any>({});
	const dispatch = useDispatch<AppDispatch>();
	const emails = useSelector(selectEmails);
	const emailStatus = useSelector(selectEmailsStatus);
	const emailLoadingStatus = useSelector(selectEmailLoadingStatus);
	const mailListRef = useRef<HTMLDivElement | null>(null)

	let tempMailObj = {};

	useEffect(() => {
		if (emailStatus === 'idle') {
			dispatch(fetchEmail())
			emails.map(mail => {
				tempMailObj = {
					...tempMailObj,
					[mail.uid]: false
				}
			})
			setMailOpener(tempMailObj)
		}
	}, [emailStatus, dispatch])

	const handleScroll = () => {
		if (mailListRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = mailListRef.current;
			if ((scrollTop + clientHeight === scrollHeight) &&
				(emailLoadingStatus === "idle")) {
				dispatch(loadMails());
			}
		}
	};


	return (
		<div onScroll={handleScroll} ref={mailListRef} className={className}>
			{
				emailStatus === 'succeeded' && (
					emails.map((mail) => {
						return (
							<div key={mail.uid}>
								<div onClick={() => {
									setMailOpener({
										...mailOpener,
										[mail.uid]: !mailOpener[mail.uid]
									})
								}}
									className={mailStyle}
								>
									<div>{mail.sender}</div>
									<div className='subject'>{mail.subject}</div>
									<div>{mail.date}</div>
									<div className={mail.isPassed ? 'passed' : 'notPassed'} />
									<div>{mail.uid}</div>
								</div>
								{mailOpener[String(mail.uid)] && <div className='mailContent'>
									{mail.content}
								</div>}
							</div>
						)
					}))
			}
			{
				emailLoadingStatus === 'loading' &&
				<div className='mailLoading'>
					<div className='loadingSpinner' />
				</div>
			}
		</div>
	)
}