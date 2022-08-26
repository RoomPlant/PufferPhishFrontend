export default interface stateInterface {
    emails: {
        isAnyEmailAuthed: boolean,
        isAdditional: boolean,
        eMails: Object[],
        startingNumber: number,
    }
}