import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../../app/store';
import { exportAttachments } from '../../../app/api/api';

interface contentInfoState {
    isLoading: boolean
    error: string | null,
    contentInfo: any,
    exportAttachementResult: any,
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state: contentInfoState, action: PayloadAction<any>) {
    state.isLoading = false
    state.error = action.payload
}

const contentInitialState = {
    isLoading: false,
    error: null,
    contentInfo: null,
} as contentInfoState

const contentInfo = createSlice({
    name: 'contentInfo',
    initialState: contentInitialState,
    reducers: {
        contentInfoStart: startLoading,
        contentInfoFailure: loadingFailed,
        exportAttachmentSuccess: (state, { payload }: PayloadAction<any>) => {
            state.contentInfo = payload.data
            state.isLoading = false
            state.exportAttachementResult = payload.data
        }
    },
});

export const {
    contentInfoStart,
    contentInfoFailure,
    exportAttachmentSuccess
} = contentInfo.actions


export const exportAttachmentsData = (payload): AppThunk => async dispatch => {
    try {
        dispatch(contentInfoStart())
        const data = await exportAttachments(payload)
        dispatch(exportAttachmentSuccess(data))
    } catch (err) {
        dispatch(contentInfoFailure(err))
    }
}

export default contentInfo.reducer
