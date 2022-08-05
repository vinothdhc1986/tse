import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import libraryReducer from '../pages/library/librarySlice';
import dashboardReducer from '../pages/dashboard/dashboardSlice';
import usersReducer from '../pages/users/userListSlice';
import questionaireReducer from '../pages/tse/questionSlice';
import UserAnswersReducer  from '../pages/tse/answersSlice';
import loginReducer from '../pages/login/loginSlice';
import projectSummaryReducer from '../pages/projects/projectSummary/projectSummarySlice';
import cardLogReducer from '../pages/cardLog/cardLogSlice';
import hostLogReducer from '../pages/hostLog/hostLogSlice';
import profileReducer from '../pages/profile/profileSlice';
import contentInfoReducer from './components/verticalTab/contentSlice';

export const store = configureStore({
  reducer: {
    library: libraryReducer,
    dashboard: dashboardReducer,
    questionaire: questionaireReducer,
    answers: UserAnswersReducer,
    login: loginReducer,
    projectSummary: projectSummaryReducer,
    userList: usersReducer,
    cardLogs: cardLogReducer,
    hostLogs: hostLogReducer,
    profile: profileReducer,
    contentInfo: contentInfoReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
