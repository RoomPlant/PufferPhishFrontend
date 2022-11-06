interface Mail {
	sender: string,
	subject: string,
	date: string,
	content: string,
	uid: number,
	isPassed: boolean
}

interface mailAddress {
	emails: Array<Mail>,
	address: string,
	index: number,
}

export interface emails {
	isAnyEmailAuthed: boolean,
	isAdditional: boolean,
	addressList: mailAddress[],
	index: number,
	emailStatus: 'idle' | 'succeeded' | 'loading' | 'rejected',
	authStatus: 'idle' | 'succeeded' | 'loading' | 'rejected',
	authCheckStatus: 'idle' | 'succeeded' | 'loading' | 'rejected',
	emailLoadingStatus: 'idle' | 'succeeded' | 'loading' | 'rejected',
	emailRefreshingStatus: 'idle' | 'succeeded' | 'loading' | 'rejected',
	deleteMailBoxStatus: 'idle' | 'succeeded' | 'loading' | 'rejected'
}

export default interface stateInterface {
	emails: emails
}