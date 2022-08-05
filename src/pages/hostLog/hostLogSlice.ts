import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store';
import { getHostLog } from '../../app/api/api';
import Updeep from '../../utils/Utils';

interface hostLogState {
    isLoading: boolean
    error: string | null,
    hostLogs: any,
    elements: any,
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state: hostLogState, action: PayloadAction<any>) {
    state.isLoading = false
    state.error = action.payload
}

const hostLogInitialState = {
    hostLogs: [],
    elements: {},
    isLoading: false,
    error: null
} as hostLogState

const hostLog = createSlice({
    name: 'hostLog',
    initialState: hostLogInitialState,
    reducers: {
        getHostLogStart: startLoading,
        getHostLogSuccess: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.error = null;
        
            const elements: any[] = [];
            for (const message of payload.data.messages) {
                elements.push({
                    messageType: 'INFO',
                    value: message.value,
                    id: message.mti,
                });
                elements.push({
                    messageType: message.messageType,
                    mti: message.mti
                });
            }
            state.hostLogs = elements
            const treeElements = {}
            for (const message of payload.data.messages) {
                Updeep(message.elements, (res) => {
                    treeElements[message.mti] = res;
                    state.elements = treeElements;
                })
            }

        },
        getHostLogFailure: loadingFailed,
    },
});

export const {
    getHostLogStart,
    getHostLogSuccess,
    getHostLogFailure,
} = hostLog.actions


export const fetchHostLog = (
): AppThunk => async dispatch => {
    try {
        dispatch(getHostLogStart())
        const data = await getHostLog()
        dispatch(getHostLogSuccess(data))
    } catch (err) {
        dispatch(getHostLogFailure(err))
    }
}

export default hostLog.reducer
