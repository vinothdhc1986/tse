import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchLib } from '../../app/api/api';
import { AppThunk } from '../../app/store';

interface LibraryDetail {
    FileName: string,
    DBName: string,
    PaymentSchemeIdentifier: number,
    Version: string,
    IsValidated: boolean,
    ImportedOn: string,
    ImportedBy: string,
    LastUpdatedBy: string,
    LastUpdatedOn: string,
    Status: number,
    Message: string
}

interface LibraryState {
    isLoading: boolean
    error: string | null,
    currentPageLibrary: any,
    schemesLibrary: any,
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state: LibraryState, action: PayloadAction<any>) {
    state.isLoading = false
    state.error = action.payload
}

const libraryInitialState = {
    currentPageLibrary: [],
    schemesLibrary: [],
    isLoading: false,
    error: null
} as LibraryState

const library = createSlice({
    name: 'library',
    initialState: libraryInitialState,
    reducers: {
        getLibraryStart: startLoading,
        getLibrarySuccess: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.error = null
            state.currentPageLibrary = payload.data
            state.schemesLibrary = payload.data
        },
        getLibraryFailure: loadingFailed,
        getFilteredLibrary: (state, { payload }: PayloadAction<any>) => {
            state.schemesLibrary = state.currentPageLibrary.filter(row => row.Version === payload);
            if(state.schemesLibrary.length === 0) {
                state.schemesLibrary = state.currentPageLibrary
            }
        },
    },
});

export const {
    getLibraryStart,
    getLibrarySuccess,
    getLibraryFailure,
    getFilteredLibrary
} = library.actions


export const fetchLibrary = (
): AppThunk => async dispatch => {
    try {
        dispatch(getLibraryStart())
        const data = await fetchLib()
        dispatch(getLibrarySuccess(data))
    } catch (err) {
        dispatch(getLibraryFailure(err))
    }
}

export const filteredLibrary = (selectedFilter) => dispatch => {
    dispatch(getFilteredLibrary(selectedFilter))
}

export default library.reducer
