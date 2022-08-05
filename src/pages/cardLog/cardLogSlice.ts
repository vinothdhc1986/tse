import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store';
import { getCardLog } from '../../app/api/api';

interface cardLogState {
    isLoading: boolean
    error: string | null,
    cardLogs: any,
    rootName: string,
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state: cardLogState, action: PayloadAction<any>) {
    state.isLoading = false
    state.error = action.payload
}

const cardLogInitialState = {
    cardLogs: [],
    rootName: '',
    isLoading: false,
    error: null
} as cardLogState

const cardLog = createSlice({
    name: 'cardLog',
    initialState: cardLogInitialState,
    reducers: {
        getCardLogStart: startLoading,
        getCardLogSuccess: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.error = null
            const rootName = Object.keys(payload.data)[0];
            const root = payload.data[rootName];
            state.rootName= rootName;
            state.cardLogs = root;
        },
        getCardLogFailure: loadingFailed,
    },
});

export const {
    getCardLogStart,
    getCardLogSuccess,
    getCardLogFailure,
} = cardLog.actions


export const fetchCardLog = (
): AppThunk => async dispatch => {
    try {
        dispatch(getCardLogStart())
        const data = await getCardLog()
        dispatch(getCardLogSuccess(data))
    } catch (err) {
        dispatch(getCardLogFailure(err))
    }
}

export default cardLog.reducer
