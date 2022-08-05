import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchQuestions } from '../../app/api/api';
import { AppThunk } from '../../app/store';

interface IssuesState {
    isLoading: boolean
    error: string | null,
    questionaries: any,
    questions: any,
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state: IssuesState, action: PayloadAction<any>) {
    state.isLoading = false
    state.error = action.payload
}

const questionaryInitialState = {
    questionaries: [],
    questions: [],
    isLoading: false,
    error: null
} as IssuesState

const questionaire = createSlice({
    name: 'questionary',
    initialState: questionaryInitialState,
    reducers: {
        getQuestionaryStart: startLoading,
        getQuestionarySuccess: (state, { payload }: PayloadAction<any>) => {
            state.isLoading = false
            state.error = null
            state.questionaries = payload.data
            state.questions = payload.data
        },
        getQuestionaryFailure: loadingFailed,
    },
});

export const {
    getQuestionaryStart,
    getQuestionarySuccess,
    getQuestionaryFailure,
    
} = questionaire.actions


export const fetchQuestionaire = (
): AppThunk => async dispatch => {
    try {
        dispatch(getQuestionaryStart())
        const data = await fetchQuestions()
        dispatch(getQuestionarySuccess(data))
    } catch (err) {
        dispatch(getQuestionaryFailure(err))
    }
}

export default questionaire.reducer
