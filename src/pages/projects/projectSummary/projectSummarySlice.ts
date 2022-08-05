import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../../app/store';
import { exportAttachments, fetchProjectSummary } from '../../../app/api/api';

interface projectSummaryState {
    isLoading: boolean
    error: string | null,
    projectSummary: any,
    exportAttachementResult: any,
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state: projectSummaryState, action: PayloadAction<any>) {
    state.isLoading = false
    state.error = action.payload
}

const dashboardInitialState = {
    projectSummary: [],
    isLoading: false,
    error: null,
    exportAttachementResult: null,
} as projectSummaryState

const projectSummary = createSlice({
    name: 'projectSummary',
    initialState: dashboardInitialState,
    reducers: {
        projectSummaryStart: startLoading,
        getProjectSummarySuccess: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.error = null
            state.projectSummary = payload.data
        },
        getProjectSummaryFailure: loadingFailed,
        exportAttachmentSuccess: (state, { payload }: PayloadAction<any>) => {
            state.exportAttachementResult = payload.data
            state.isLoading = false
        }
    },
});

export const {
    projectSummaryStart,
    getProjectSummarySuccess,
    getProjectSummaryFailure,
    exportAttachmentSuccess
} = projectSummary.actions


export const fetchProjectSummaryData = (
): AppThunk => async dispatch => {
    try {
        dispatch(projectSummaryStart())
        const data = await fetchProjectSummary()
        dispatch(getProjectSummarySuccess(data))
    } catch (err) {
        dispatch(getProjectSummaryFailure(err))
    }
}

// export const exportAttachmentsData = (payload): AppThunk => async dispatch => {
//     try {
//         dispatch(projectSummaryStart())
//         const data = await exportAttachments(payload)
//         dispatch(exportAttachmentSuccess(data))
//     } catch (err) {
//         dispatch(getProjectSummaryFailure(err))
//     }
// }

export default projectSummary.reducer
