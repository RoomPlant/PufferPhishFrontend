import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import { selectEmails, selectEmailsStatus, fetchEmail } from '../features/emails/emailsSlice';
import { AppDispatch } from '../app/store';

interface MailListProps {
    mailStyle: string,
    className: string,
}

export const MailList = ({ mailStyle, className }:MailListProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const emails = useSelector(selectEmails);
    const emailStatus = useSelector(selectEmailsStatus);

    useEffect(() => {
        if (emailStatus === 'idle') {
            dispatch(fetchEmail())
        }
    }, [emailStatus, dispatch])


    return (
        <div className={className}>
            {
                emailStatus === 'succeeded' ? (
                    emails.map((mail) => (
                        <div key={mail.uid}>
                            <div className={mailStyle}>
                                <div>{mail.sender}</div>
                                <div>{mail.subject}</div>
                                <div>{mail.date}</div>
                            </div>
                            <div>
                                {mail.content}
                            </div>
                        </div>
                ))) 
                : (
                    <div className="loading">
                        <div className="loadingSpinner"/>
                    </div>
                )
            }
        </div>
    )
}