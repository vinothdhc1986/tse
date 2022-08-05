import React from 'react';
import { Routes, Route } from "react-router-dom"
import Library from './pages/library/LibraryBoard';
import Footer from './app/components/layout/footer/Footer';
import Header from './app/components/layout/header/Header';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import PrivateRoute from './app/components/PrivateRoute';
import ProjectSummary from './pages/projects/projectSummary/ProjectSummary';
import './scss/common.scss';
import UserBoard from './pages/users/UserBoard';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import LOC from './pages/loc/LOC';
import CardLog from './pages/cardLog/CardLog';
import HostLog from './pages/hostLog/HostLog';
import Profile from './pages/profile/Profile';
import Keys from './pages/keys/Keys';

function App() {
  const { loggingIn } = useSelector((state: RootState) => state.login);
  return (
    <div id='app'>
      <Header />
      <div className={loggingIn === true ? "main-container " : ""}>
        <div className={loggingIn === true ? "layout-container " : ""}>
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<Dashboard />} />
              <Route path="library" element={<Library />} />
              <Route path="projects-summary" element={<ProjectSummary />} />
              <Route path="users" element={<UserBoard />} />
              <Route path="loc" element={<LOC />} />
              <Route path="cardLog" element={<CardLog />} />
              <Route path="hostLOg" element={<HostLog />} />
              <Route path="profile" element={<Profile />} />
              <Route path="keys" element={<Keys />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
