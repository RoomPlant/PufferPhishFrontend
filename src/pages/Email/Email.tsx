import React, { useState } from "react";
import { AuthForm } from "../../components/Form/Form";
import "./styles.css"

interface emailProps {
    isEmailAuthed: boolean,
    setIsEmailAuthed: Function
}

export const EmailPage = ({isEmailAuthed, setIsEmailAuthed}:emailProps) => {
    
    
    return (
        <div className="mailWrapper">
            {
                isEmailAuthed ?
                <div>You are in</div>
                :
                <AuthForm setIsAuthed={setIsEmailAuthed}/>
            }
        </div>
    )
}