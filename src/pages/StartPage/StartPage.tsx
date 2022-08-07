import React from "react";
import { Navigate } from "react-router-dom";

export const StartPage = () => {
    return (
        <Navigate to={"/index/email"}/>    
    )
}