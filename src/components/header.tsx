import React from "react";
import { useState } from "react"

type headerProps = {
    headerStyles: string,
    cellStyles: string,
    activeStyle: string
}
enum indexVariants {
    mail,
    socNet,
    messeg,
    calls,
    sites,
    wifi,
}

type indexVariantsStrings = keyof typeof indexVariants;

export const Header = (props: headerProps) => {
    const [cellCheck, setCellCheck] = useState({
        mail: true,
        socNet: false,
        messeg: false,
        calls: false,
        sites: false,
        wifi: false
    })

    const handleClick = (cellName: indexVariantsStrings) => {
        let tempState = {
            mail: false,
            socNet: false,
            messeg: false,
            calls: false,
            sites: false,
            wifi: false
        }
        tempState[cellName] = true;
        setCellCheck(tempState);
    }

    return (
        <div className={props.headerStyles}>
            <div onClick={() => handleClick("mail")} className={props.cellStyles + (cellCheck.mail ? ' ' + props.activeStyle : '')}>Электронная почта</div>
            <div onClick={() => handleClick("socNet")} className={props.cellStyles + (cellCheck.socNet ? ' ' + props.activeStyle : '')}>Соц сети</div>
            <div onClick={() => handleClick("messeg")} className={props.cellStyles + (cellCheck.messeg ? ' ' + props.activeStyle : '')}>Мессенджеры</div>
            <div onClick={() => handleClick("calls")} className={props.cellStyles + (cellCheck.calls ? ' ' + props.activeStyle : '')}>Звонки</div>
            <div onClick={() => handleClick("sites")} className={props.cellStyles + (cellCheck.sites ? ' ' + props.activeStyle : '')}>Сайты</div>
            <div onClick={() => handleClick("wifi")} className={props.cellStyles + (cellCheck.wifi ? ' ' + props.activeStyle : '')}>Wi-Fi</div>
        </div>
    )
}
