import React from "react";
import { NavLink } from "react-router-dom";

type headerProps = {
	headerStyles: string,
	cellStyles: string,
	activeStyle: string
}

export const Header = (props: headerProps) => {
	return (
		<div className={props.headerStyles}>
			<NavLink to="/index/email" className={props.cellStyles}>Электронная почта</NavLink>
			<NavLink to="/index/socnet" className={props.cellStyles}>Соц сети</NavLink>
			<NavLink to="/index/messanger" className={props.cellStyles}>Мессенджеры</NavLink>
			<NavLink to="/index/calls" className={props.cellStyles}>Звонки</NavLink>
			<NavLink to="/index/wifi" className={props.cellStyles}>Wi-Fi</NavLink>
		</div>
	)
}
