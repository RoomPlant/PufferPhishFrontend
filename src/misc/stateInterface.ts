interface Mail {
    sender: string,
    subject: string,
    date: string
}

export default interface stateInterface {
    emails: {
        isAnyEmailAuthed: boolean,
        isAdditional: boolean,
        emails: Array<Mail>,
        startingNumber: number,
        emailStatus: 'idle' | 'succeeded' | 'loading' | 'rejected',
        authStatus: 'idle' | 'succeeded' | 'loading' | 'rejected'
    }
}