import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import stateInterface, { emails } from "../../misc/stateInterface";
import axios from "axios";

export const fetchEmail = createAsyncThunk('email/fetchEmail', async (index: number) => {
	try {
		const response = await axios.post('http://localhost:3030/getMail', {
			index: index
		});
		return response.data
	} catch (error) {
		console.log(error);
	}
})

export const checkAuth = createAsyncThunk('email/checkAuth', async () => {
	try {
		const response = await axios.post('http://localhost:3030/checkAuth');
		return response.data;
	} catch (error) {
		console.log(error);
	}
})

export const loadMails = createAsyncThunk('email/loadMails', async (index: number) => {
	try {
		const response = await axios.post('http://localhost:3030/loadMails', {
			index: index
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
})

export const refreshMails = createAsyncThunk('email/refreshMails', async (index: number) => {
	try {
		const response = await axios.post('http://localhost:3030/refreshMails', {
			index: index
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
})

export const deleteMailBox = createAsyncThunk('email/deleteMailBox', async (index: number) => {
	console.log('hui')
	try {
		const response = await axios.post('http://localhost:3030/deleteMailBox', {
			index: index
		})
		return response.data
	} catch (error) {
		console.log(error)
	}
})

interface authorizeMailProps {
	email: string,
	passwd: string
}

export const authorizeMail = createAsyncThunk('email/mailAuth', async ({ email, passwd }: authorizeMailProps) => {
	try {
		const response = await axios.post('http://localhost:3030/mailAuth', {
			login: email,
			passwd: passwd
		});
		if (response.data.result === "error") {
			throw new Error("unable to authorize");
		}
		return response.data
	} catch (error) {
		console.log(error);
		return Promise.reject(error)
	}
})

const initialState: emails = {
	isAnyEmailAuthed: false,
	isAdditional: false,
	addressList: [],
	index: 0,
	emailStatus: 'idle',
	authStatus: 'idle',
	authCheckStatus: 'idle',
	emailLoadingStatus: 'idle',
	emailRefreshingStatus: 'idle',
	deleteMailBoxStatus: 'idle',
}

export const emailsSlice = createSlice({
	name: 'emails',
	initialState,
	reducers: {
		changeIndex(state, action: PayloadAction<number>) {
			state.index = action.payload
		},
		hadleMailAddressAddition(state) {
			state.isAdditional = !state.isAdditional;
		}
	},
	extraReducers(builder) {
		builder
			.addCase(deleteMailBox.pending, (state, action) => {
				state.deleteMailBoxStatus = 'loading';
			})
			.addCase(deleteMailBox.fulfilled, (state, action) => {
				if (action.payload.result === "success") {
					state.deleteMailBoxStatus = 'succeeded';
					if (state.addressList.length === 1) {
						state.isAnyEmailAuthed = false;
					} else if (state.index === action.payload.index) {
						state.index = 0
					}
					state.addressList.splice(action.payload.index, 1);
				} else {
					state.deleteMailBoxStatus = 'rejected';
				}
			})
			.addCase(deleteMailBox.rejected, (state, action) => {
				state.deleteMailBoxStatus = 'rejected';
			})
			.addCase(fetchEmail.pending, (state, action) => {
				state.emailStatus = 'loading';
			})
			.addCase(fetchEmail.fulfilled, (state, action) => {
				state.emailStatus = 'succeeded';
				state.addressList[state.index].emails = action.payload;
			})
			.addCase(fetchEmail.rejected, (state, action) => {
				state.emailStatus = 'rejected';
			})
			.addCase(refreshMails.pending, (state, action) => {
				state.emailRefreshingStatus = 'loading';
			})
			.addCase(refreshMails.fulfilled, (state, action) => {
				state.emailRefreshingStatus = 'idle';
				state.addressList[state.index].emails = action.payload;
			})
			.addCase(refreshMails.rejected, (state, action) => {
				state.emailRefreshingStatus = 'rejected';
			})
			.addCase(loadMails.pending, (state, action) => {
				state.emailLoadingStatus = 'loading';
			})
			.addCase(loadMails.fulfilled, (state, action) => {
				if (action.payload === "finished") {
					state.emailLoadingStatus = 'succeeded';
				} else {
					state.emailLoadingStatus = 'idle';
					state.addressList[state.index].emails = action.payload;
				}
			})
			.addCase(loadMails.rejected, (state, action) => {
				state.emailLoadingStatus = 'rejected';
			})
			.addCase(authorizeMail.pending, (state, action) => {
				state.authStatus = 'loading';
			})
			.addCase(authorizeMail.fulfilled, (state, action) => {
				state.authStatus = 'succeeded';
				state.isAdditional = false;
				state.addressList.push({
					emails: [],
					address: action.payload.address,
					index: action.payload.index,
				});
				state.index = action.payload.index;
				state.emailStatus = 'idle';
				state.isAnyEmailAuthed = true;
			})
			.addCase(authorizeMail.rejected, (state, action) => {
				state.authStatus = 'idle';
			})
			.addCase(checkAuth.pending, (state, action) => {
				state.authCheckStatus = 'loading';
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.authCheckStatus = 'succeeded';
				state.addressList = action.payload
				if (state.addressList.length > 0) {
					state.isAnyEmailAuthed = true;
				}

			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.authCheckStatus = 'rejected';
			})
	}
});

export const selectIsEmailAuthed = (state: stateInterface) => state.emails.isAnyEmailAuthed;
export const selectEmails = (state: stateInterface) => state.emails.addressList[state.emails.index].emails;
export const selectIsAdditional = (state: stateInterface) => state.emails.isAdditional;
export const selectEmailsStatus = (state: stateInterface) => state.emails.emailStatus;
export const selectEmailLoadingStatus = (state: stateInterface) => state.emails.emailLoadingStatus;
export const selectEmailRefreshingStatus = (state: stateInterface) => state.emails.emailRefreshingStatus;
export const selectAuthStatus = (state: stateInterface) => state.emails.authStatus;
export const selectIndex = (state: stateInterface) => state.emails.index;
export const selectAddressList = (state: stateInterface) => state.emails.addressList;
export const selectAllStatuses = (state: stateInterface) => [
	state.emails.emailStatus,
	state.emails.authStatus,
	state.emails.authCheckStatus,
	state.emails.emailLoadingStatus,
	state.emails.emailRefreshingStatus,
	state.emails.deleteMailBoxStatus
]

export const { changeIndex, hadleMailAddressAddition } = emailsSlice.actions

export default emailsSlice.reducer;