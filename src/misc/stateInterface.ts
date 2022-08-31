interface Mail {
    sender: string,
    subject: string,
    date: string
}

export default interface stateInterface {
    emails: {
        isAnyEmailAuthed: boolean,
        isAdditional: boolean,
        eMails: Mail[],
        startingNumber: number,
    }
}