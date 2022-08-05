import tableData from '../../asset/json/data.json';
import dashboardData from '../../asset/json/dashboard.json';
import questions from '../../asset/json/questions.json';
import initAnswers from '../../asset/json/initialAnswers.json';
import projectSummary from '../../asset/json/projectSummary.json';
import userList from '../../asset/json/users.json';
import cardLog from '../../asset/json/Card_Log_parsed_ui.json';
import hostLog from '../../asset/json/host_log_sample.json';
import profile from '../../asset/json/profile.json';
import http from "../../http-common";
import apiEndPoints from './apiEndPoints';

export function fetchLib() {
   // return http.get(apiEndPoints.library);
      return new Promise<{ data }>((resolve) =>
        setTimeout(() => resolve({ data: tableData }), 2000)
     );
  }

  export function fetchDashboardData() {
    return new Promise<{ data }>((resolve) =>
      setTimeout(() => resolve({ data: dashboardData }), 0)
    );
  }

  export function fetchQuestions() {
    return new Promise<{ data }>((resolve) =>
      setTimeout(() => resolve({ data: questions }), 2000)
    );
  }

  export function fetchInitAnswers() {
    return new Promise<{ data }>((resolve) =>
      setTimeout(() => resolve({ data: initAnswers }), 2000)
    );
  }

  export function fetchProjectSummary() {
    return new Promise<{ data }>((resolve) =>
      setTimeout(() => resolve({ data: projectSummary }), 2000)
    );
  }


  export function fetchLoginData(username, password) {
    const payload = {
      userID: 'manikandan.v@payhuddle.com',
      password: '1234'
    }
    sessionStorage.setItem('user', JSON.stringify(payload));
   // return http.post('http://payhuddle-staging.com:6123/UserAccount/Login', JSON.stringify(payload));
    return new Promise<{ data }>((resolve) =>
      setTimeout(() => resolve({ data: {
        id: 1,
        name: 'John Doe',
        email: '',
        message: 'success',
      } }), 20)
    );
    
  }

  export function fetchUsersData() {
    return new Promise<{ data }>((resolve) =>
      setTimeout(() => resolve({ data: userList }), 2000)
    );
  }

  export function createUserAPI(data) {
    const payload = {...data, Role: Number(data.Role)};
    return new Promise<{ data }>((resolve) =>
    setTimeout(() => resolve({data}), 2000)
    );
  }


  export function fetchProfileData() {
    return new Promise<{ data }>((resolve) =>
      setTimeout(() => resolve({ data: profile }), 2000)
    );
  }

  export function changePasswordAPI(data) {
    const payload = {...data};
    return new Promise<{ data }>((resolve) =>
    setTimeout(() => resolve({data}), 2000)
    );
  }

  export function getCardLog() {
    return new Promise<{ data }>((resolve) =>
      setTimeout(() => resolve({ data: cardLog }), 100)
    );
  }

  export function getHostLog() {
    return new Promise<{ data }>((resolve) =>
      setTimeout(() => resolve({ data:  hostLog }), 100)
    );
  }

  export function exportAttachments(data) {
    const payload = {...data};
    //return http.post('http://payhuddle-staging.com:6123/export', JSON.stringify(payload));
    return new Promise<{ data }>((resolve) =>
    setTimeout(() => resolve({ data: {
      message: 'success',
    } }), 2000)
  );
  }