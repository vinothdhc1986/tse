import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchInitAnswers } from '../../app/api/api';
import { AppThunk } from '../../app/store';

interface ansState {
    isLoading: boolean
    ansPayload: any,
    error: string | null,
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state: ansState, action: PayloadAction<any>) {
    state.isLoading = false
    state.error = action.payload
}

const answersInitialState = {
    isLoading: false,
    error: null
} as ansState

const userAnswers = createSlice({
    name: 'answers',
    initialState: answersInitialState,
    reducers: {
        getUserAnswers: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.ansPayload = payload
        },
        getInitialUserAnswers: (state, { payload }: PayloadAction<any>) => {
            state.ansPayload = payload.data
        },
        getInitAnswerStart: startLoading,
        getInitAnswerFailure: loadingFailed
    },
});

export const { getUserAnswers,getInitAnswerStart, getInitialUserAnswers, getInitAnswerFailure } = userAnswers.actions

export const fetchAnswers = (data): AppThunk => async dispatch =>  {
        dispatch(getUserAnswers(data))
}

export const fetchInitialAnswers = (): AppThunk => async dispatch =>  {
    dispatch(getUserAnswers(answersInitialState.ansPayload))
    try {
        dispatch(getInitAnswerStart())
        const data = await fetchInitAnswers()
        dispatch(getInitialUserAnswers(data))
    } catch (err) {
        dispatch(getInitAnswerFailure(err))
    }
}

export default userAnswers.reducer
