import React, { useState, useEffect, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchLogin } from './loginSlice';
import { Navigate } from 'react-router-dom';

import Props from './typing'
import './styles.scss';
import { useNavigate } from 'react-router-dom';

const Login: FC<Props> = (props): JSX.Element => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const dispatch = useDispatch();
    const { isLoading, error, loggingIn } = useSelector((state: RootState) => state.login);
    const location = useLocation();

    useEffect(() => {
        if (loggingIn.message === 'success') {
            navigate('/');
        }
    }, [loggingIn]);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(fetchLogin(username, password));
        }
    }

    return (

        <div className="w-full flex items-center justify-end h-screen-login">
            <form className="login-form w-full md:w-2/4 bg-white rounded-lg" onSubmit={handleSubmit}>
                <h2 className="text-3xl text-center text-gray-700 mb-[25px]">
                    <div className='login-logo'></div>
                </h2>
                <div className="px-12 pb-[10px] controls">
                    <div className="w-full mb-[15px]">
                        <div className="flex items-center">
                            <i className='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user'></i>
                            <input type='text' placeholder="Username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                className="-mx-6 px-8  w-full border input-control h-[34px] rounded text-gray-700 focus:outline-none" />
                        </div>
                        {submitted && !username &&
                            <div className="invalid-feedback">Username is required</div>
                        }
                    </div>
                    <div className="w-full mb-[15px]">
                        <div className="flex items-center">
                            <i className='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock'></i>
                            <input type='password' placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className="-mx-6 px-8  h-[34px] w-full border rounded input-control text-gray-700 focus:outline-none" />
                        </div>
                        {submitted && !password &&
                            <div className="invalid-feedback">Password is required</div>
                        }

                    </div>
                    <div className="w-full mb-[15px] ml-[-10px]">
                        <button type="submit"
                            className="w-full font-bold py-2 sign-in text-gray-100  focus:outline-none">Sign In</button>
                    </div>
                    <div className="w-full mb-[15px] text-center">
                        <p>
                            <a href="" className="forgotPasswordBtn card-link">Forgot Password?</a>
                        </p>
                    </div>
                    <ul>
                        <li className="TOC pr-[6px]">
                            <a href="#">Terms &amp; Conditions</a>
                        </li>
                        <li className='pr-[6px]'>|</li>
                        <li className="TOC">
                            <a href="#">Privacy Policy</a>
                        </li>
                    </ul>
                </div>


                <div className='flex justify-between login-copy-right'>
                        <div className=''>Copyright ©2021 <a href="">Discover</a></div>
                        <div className=''>All Rights Reserved</div>
                </div>

            </form>
        </div>
    );
}

export default Login;