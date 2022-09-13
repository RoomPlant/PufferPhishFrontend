import React from 'react';
import './styles.css'
import { Header } from '../../components/header'
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../../features/emails/emailsSlice';

export let MainPage = () => {
    const authStatus = useSelector(selectAuthStatus);
    return (
        <div>
            {(authStatus === 'loading')&&
                <div className="loading">
                    <div className="loadingSpinner"/>
                </div>
            }
            <div className='mainBackgound'/>
            <Header activeStyle="active" headerStyles="header" cellStyles="cell"/>
            <div className='wrapper'><Outlet/></div>
        </div>
    );
}