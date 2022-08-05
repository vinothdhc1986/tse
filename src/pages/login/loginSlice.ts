import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store';
import { fetchLoginData } from '../../app/api/api';

interface loginState {
    isLoading: boolean
    error: string | null,
    loggingIn: any,
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state: loginState, action: PayloadAction<any>) {
    state.isLoading = false
    state.error = action.payload
}

const loginInitialState = {
    loggingIn: {},
    isLoading: false,
    error: null
} as loginState

const login = createSlice({
    name: 'login',
    initialState: loginInitialState,
    reducers: {
        getLoginStart: startLoading,
        getLoginSuccess: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.error = null
            state.loggingIn = payload.data
        },
        getLoginFailure: loadingFailed,
    },
});

export const {
    getLoginStart,
    getLoginSuccess,
    getLoginFailure,
} = login.actions


export const fetchLogin = (username, password): AppThunk => async dispatch => {
    try {
        dispatch(getLoginStart())
        const data = await fetchLoginData(username, password)
        dispatch(getLoginSuccess(data))
    } catch (err) {
        dispatch(getLoginFailure(err))
    }
}

export default login.reducer
