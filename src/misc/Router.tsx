import React from "react"
import { Route, Routes, } from "react-router-dom"
import { LoginPage } from "../pages/Login/Login"
import { MainPage } from "../pages/MainPage/Main"

export let Router = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/index" element={<MainPage/>}>
                
            </Route>    
        </Routes>
        )
}
