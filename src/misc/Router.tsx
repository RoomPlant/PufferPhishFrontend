import React from "react"
import { Route, Routes, } from "react-router-dom"
import { EmailPage } from "../pages/Email/Email"
import { MainPage } from "../pages/MainPage/Main"
import { StartPage } from "../pages/StartPage/StartPage"
import { WIP } from "../pages/WIP/WIP"

export let Router = () => {

    return (
        <Routes>
            {/* <Route path="/login" element={<LoginPage setIsLoggedIn={props.setIsLoggedIn} isLoggedIn={props.isLoggedIn}/>}/> */}
            <Route path="/" element={<StartPage/>}/>
            <Route path="/index" element={<MainPage/>}>
                <Route path="/index/email" element={<EmailPage/>}/>
                <Route path="/index/socnet" element={<WIP/>}/>
                <Route path="/index/message" element={<WIP/>}/>
                <Route path="/index/calls" element={<WIP/>}/>
                <Route path="/index/sites" element={<WIP/>}/>
                <Route path="/index/wifi" element={<WIP/>}/>
            </Route>
        </Routes>
        )
}
