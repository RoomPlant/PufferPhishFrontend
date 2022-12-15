import React from 'react';
import { Header } from '../../components/header'
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAuthCheckStatus, selectAuthStatus, selectKeyStatus } from '../../features/emails/emailsSlice';
import { KeyForm } from '../../components/KeyForm';

export let MainPage = () => {
	const authStatus = useSelector(selectAuthStatus);
	const keyStatus = useSelector(selectKeyStatus);
	const authCheckStatus = useSelector(selectAuthCheckStatus);
	return (
		<div>
			{(authStatus === 'loading' || authCheckStatus === 'loading' || keyStatus === 'loading') &&
				<div className="loading">
					<div className="loadingSpinner" />
				</div>
			}
			<Header activeStyle="active" headerStyles="header" cellStyles="cell" />
			<div className='wrapper'>
				{keyStatus !== 'succeeded' ?
					<KeyForm /> :
					<Outlet />
				}
			</div>
		</div>
	);
}