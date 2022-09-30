interface Mail {
	sender: string,
	subject: string,
	date: string,
	content: string,
	uid: number,
	isPassed: boolean
}

export default interface stateInterface {
	emails: {
		isAnyEmailAuthed: boolean,
		isAdditional: boolean,
		emails: Array<Mail>,
		emailStatus: 'idle' | 'succeeded' | 'loading' | 'rejected',
		authStatus: 'idle' | 'succeeded' | 'loading' | 'rejected',
		authCheckStatus: 'idle' | 'succeeded' | 'loading' | 'rejected',
		emailLoadingStatus: 'idle' | 'succeeded' | 'loading' | 'rejected',
		emailRefreshingStatus: 'idle' | 'succeeded' | 'loading' | 'rejected',
	}
}