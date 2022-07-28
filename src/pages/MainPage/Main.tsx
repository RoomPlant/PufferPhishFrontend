import React from 'react';
import './styles.css'
import { Header } from '../../components/header'
import { Outlet } from 'react-router';

export let MainPage = () => {
    return (
        <div>
            <Header activeStyle="active" headerStyles="header" cellStyles="cell"/>
            <Outlet />
        </div>
    );
}