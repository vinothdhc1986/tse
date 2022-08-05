import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store';
import { fetchDashboardData } from '../../app/api/api';

interface dashboardState {
    isLoading: boolean
    error: string | null,
    dashboard: any,
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state: dashboardState, action: PayloadAction<any>) {
    state.isLoading = false
    state.error = action.payload
}

const dashboardInitialState = {
    dashboard: [],
    isLoading: false,
    error: null
} as dashboardState

const dashboard = createSlice({
    name: 'dashboard',
    initialState: dashboardInitialState,
    reducers: {
        getDashboardStart: startLoading,
        getDashboardSuccess: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.error = null
            state.dashboard = payload.data
        },
        getDashboardFailure: loadingFailed,
    },
});

export const {
    getDashboardStart,
    getDashboardSuccess,
    getDashboardFailure,
} = dashboard.actions


export const fetchDashboard = (
): AppThunk => async dispatch => {
    try {
        dispatch(getDashboardStart())
        const data = await fetchDashboardData()
        dispatch(getDashboardSuccess(data))
    } catch (err) {
        dispatch(getDashboardFailure(err))
    }
}

export default dashboard.reducer
