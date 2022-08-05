import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

const PrivateRoute = () => {
    const { loggingIn } = useSelector((state: RootState) => state.login);
    return loggingIn.message ||(sessionStorage.getItem('user')) ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;