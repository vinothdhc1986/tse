import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store';
import { fetchProfileData, changePasswordAPI } from '../../app/api/api';

interface profileState {
    isLoading: boolean
    error: string | null,
    profile: any,
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state: profileState, action: PayloadAction<any>) {
    state.isLoading = false
    state.error = action.payload
}

const profileInitialState = {
    profile: {},
    isLoading: false,
    error: null
} as profileState

const profile = createSlice({
    name: 'profile',
    initialState: profileInitialState,
    reducers: {
        getStart: startLoading,
        getProfileSuccess: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.error = null
            state.profile = payload.data
        },
        getFailure: loadingFailed,
        changePsawordSuccess: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.error = null
            state.profile.push(payload.data)
        },
    },
});

export const {
    getStart,
    getProfileSuccess,
    getFailure,
    changePsawordSuccess,
} = profile.actions


export const fetchprofile = (
): AppThunk => async dispatch => {
    try {
        dispatch(getStart())
        const data = await fetchProfileData()
        dispatch(getProfileSuccess(data))
    } catch (err) {
        dispatch(getFailure(err))
    }
}

export const changeProfilePassword = (newPassword: any) => async dispatch => {
        try {
            dispatch(getStart())
            const data = await changePasswordAPI(newPassword)
            dispatch(changePsawordSuccess({data: newPassword}));
        //    dispatch(fetchprofile());
        } catch (err) {
            dispatch(getFailure(err))
        }
    }

export default profile.reducer
