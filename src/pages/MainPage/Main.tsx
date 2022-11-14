import React from 'react';
import { Header } from '../../components/header'
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAuthCheckStatus, selectAuthStatus } from '../../features/emails/emailsSlice';

export let MainPage = () => {
	const authStatus = useSelector(selectAuthStatus);
	const authCheckStatus = useSelector(selectAuthCheckStatus);
	return (
		<div>
			{(authStatus === 'loading' || authCheckStatus === 'loading') &&
				<div className="loading">
					<div className="loadingSpinner" />
				</div>
			}
			<Header activeStyle="active" headerStyles="header" cellStyles="cell" />
			<div className='wrapper'><Outlet /></div>
		</div>
	);
}