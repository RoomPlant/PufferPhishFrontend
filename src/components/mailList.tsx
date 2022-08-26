import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { selectEMails, fetchEmails, selectStartingNumber } from '../features/emails/emailsSlice';

export const MailList = () => {
    const dispatch = useDispatch()
    const eMails = useSelector(selectEMails)
    const startingNumber = useSelector(selectStartingNumber)

    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:3030/getMail',
            data: {
                number: startingNumber
            }
        }).then(resp =>{
            dispatch(fetchEmails(resp.data));
        })
    }, [])

    return (
        <div></div>
    )
}