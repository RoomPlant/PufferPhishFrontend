import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { selectEMails, selectStartingNumber } from '../features/emails/emailsSlice';

interface MailListProps {
    mailStyle: string,
    className: string,
}

export const MailList = ({ mailStyle, className }:MailListProps) => {
    const dispatch = useDispatch()
    const eMails = useSelector(selectEMails)
    //const startingNumber = useSelector(selectStartingNumber)

    // useEffect(() => {
    //     axios({
    //         method: 'post',
    //         url: 'http://localhost:3030/getMail',
    //         data: {
    //             number: startingNumber
    //         }
    //     }).then(resp =>{
    //     })
    // }, [])

    return (
        <div className={className}>
            {eMails.map((mail) => (
                <div className={mailStyle}>
                    <div>{mail.sender}</div>
                    <div>{mail.subject}</div>
                    <div>{mail.date}</div>
                </div>
            ))}
        </div>
    )
}