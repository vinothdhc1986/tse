import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store';
import { fetchUsersData, createUserAPI } from '../../app/api/api';
import { userAccount } from '../../app/api/models';

interface usersState {
    isLoading: boolean
    error: string | null,
    users: userAccount[],
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state: usersState, action: PayloadAction<any>) {
    state.isLoading = false
    state.error = action.payload
}

const usersInitialState = {
    users: [],
    isLoading: false,
    error: null
} as usersState

const users = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {
        getStart: startLoading,
        getUsersSuccess: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.error = null
            state.users = payload.data
        },
        getFailure: loadingFailed,
        createUserSuccess: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.error = null
            state.users.push(payload.data)
        },
    },
});

export const {
    getStart,
    getUsersSuccess,
    getFailure,
    createUserSuccess,
} = users.actions


export const fetchusers = (
): AppThunk => async dispatch => {
    try {
        dispatch(getStart())
        const data = await fetchUsersData()
        dispatch(getUsersSuccess(data))
    } catch (err) {
        dispatch(getFailure(err))
    }
}

export const createUser = (newUser: any) => async dispatch => {
        try {
            dispatch(getStart())
            const data = await createUserAPI(newUser)
            dispatch(createUserSuccess({data: newUser}));
        //    dispatch(fetchusers());
        } catch (err) {
            dispatch(getFailure(err))
        }
    }

export default users.reducer
