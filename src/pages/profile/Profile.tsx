import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { fetchprofile, changeProfilePassword } from './profileSlice';
import { RootState } from '../../app/store';
import { changePasswordInitValues, changePasswordModalStyles } from './constants';
import './styles.scss';


type FormData = {
    password: string;
    oldPassword: string;
    confirmPassword: string;
};

const correctColor = 'green';
const wrongColor = '#f00';

export default function Profile() {
    const dispatch = useDispatch();
    const [changePassword, setChangePassword] = useState(false);
    const { isLoading, error, profile } = useSelector((state: RootState) => state.profile);
    const [passwordValues, setPasswordValues] = useState(changePasswordInitValues);

    const colour1 = passwordValues.newPassword.length >= 8 ? correctColor : wrongColor;
    const colour2 = passwordValues.newPassword.match(/[A-Z]/) ? correctColor : wrongColor;
    const colour3 = passwordValues.newPassword.match(/[a-z]/) ? correctColor : wrongColor;
    const colour4 = passwordValues.newPassword.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) ? correctColor : wrongColor;
    const colour5 = passwordValues.newPassword === passwordValues.confirmPassword && (passwordValues.newPassword !== "") ? correctColor : wrongColor;



    const checkFormValid = () => {
        if (colour1 === wrongColor || colour2 === wrongColor || colour3 === wrongColor || colour4 === wrongColor || colour5 === wrongColor) {
            return false;
        }
        return true;
    }
    useEffect(() => {
        dispatch(fetchprofile());
    }, []);

    const passwordChange = (event) => {
        setPasswordValues({
            ...passwordValues, newPassword: event.target.value
        })
    }

    const confirmPasswordChange = (event) => {
        setPasswordValues({
            ...passwordValues, confirmPassword: event.target.value
        })
    }

    const oldPasswordChange = (event) => {
        setPasswordValues({
            ...passwordValues, oldPassword: event.target.value
        })
    }

    function closeModal() {
        setChangePassword(false);
    }

    const onCancel = () => {
        setChangePassword(false);
    }

    const onChangePassword = (data) => {
        dispatch(changeProfilePassword(data));
        setChangePassword(false);
    }



    return (
        <>
            <Modal shouldCloseOnOverlayClick={false}
                isOpen={changePassword}
                onRequestClose={closeModal}
                style={changePasswordModalStyles}>
                <div className='flex justify-end'>
                    <div className="pointer" onClick={closeModal}>
                        <MdClose />
                    </div>
                </div>
                <form>
                    <div className="flex flex-col">
                        <p style={{ fontWeight: "bold" }}>All checkmarks must turn green, password must have:</p>
                        <div style={{ color: colour1, fontSize: "20px" }} className='mt-[8px] flex '><AiOutlineCheckCircle /><span className='password-instructions'>At least 8 characters</span></div>
                        <div style={{ color: colour2, fontSize: "20px" }} className='mt-[8px] flex '> <AiOutlineCheckCircle /> <span className='password-instructions'>At least 1 uppercase letter</span></div>
                        <div style={{ color: colour3, fontSize: "20px" }} className='mt-[8px] flex '> <AiOutlineCheckCircle /> <span className='password-instructions'>At least 1 lowercase letter</span></div>
                        <div style={{ color: colour4, fontSize: "20px" }} className='mt-[8px] flex '> <AiOutlineCheckCircle /> <span className='password-instructions'>At least 1 number or special character</span></div>
                        <div style={{ color: colour5, fontSize: "20px" }} className='mt-[8px] flex '> <AiOutlineCheckCircle /> <span className='password-instructions'>Password === Confirm Password</span></div>

                        <div className="py-2" x-data="{ show: true }">
                            <span className="px-1 text-sm text-gray-600">Old Password</span>
                            <div className="relative">
                                <input value={passwordValues.oldPassword} onChange={oldPasswordChange} placeholder="" type='password' className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                focus:placeholder-gray-500
                focus:bg-white 
                focus:border-gray-600  
                focus:outline-none" />
                            </div>
                        </div>
                        <div className="py-2" x-data="{ show: true }">
                            <span className="px-1 text-sm text-gray-600">New Password</span>
                            <div className="relative">
                                <input placeholder="" type='password' className="text-md block px-3 py-2 rounded-lg  w-full  
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                focus:placeholder-gray-500
                focus:bg-white 
                focus:border-gray-600  
                focus:outline-none"
                                    value={passwordValues.newPassword} onChange={passwordChange}
                                    name="password"

                                />
                            </div>
                        </div>
                        <div className="py-2">
                            <span className="px-1 text-sm text-gray-600">Confirm Password</span>
                            <div className="relative">
                                <input placeholder="" type='password' className="text-md block px-3 py-2 rounded-lg  w-full  
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                focus:placeholder-gray-500
                focus:bg-white 
                focus:border-gray-600  
                focus:outline-none"
                                    onChange={confirmPasswordChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-[24px] items-center">
                        <button onClick={onCancel} className='transparent-button'>Cancel</button>
                        <button disabled={!checkFormValid()} className="primary-button" onClick={onChangePassword}>Change Password</button>
                    </div>
                </form>
            </Modal>



            <div className="min-h-screen flex flex-col max-w-md mx-auto bg-gray-200 opacity-100 font-poppins px-4 bg-no-repeat bg-cover bg-center">
                <div className="flex justify-between px-1 pt-4 items-center">
                    <div>
                    </div>
                    <div>
                        <p className="font-semibold">My Profile</p>
                    </div>
                    <div>
                    </div>
                </div>

                <div className="pt-12 px-4 w-full flex flex-col">
                    <p className="font-semibold text-gray-600">User name : <span className='ml-[12px]'>{profile.username}</span></p>
                    <p className="font-semibold text-gray-600">Email ID  : <span className='ml-[29px]'>{profile.emailID}</span></p>
                    <div className="flex font-semibold text-gray-600">
                        <div >password  :</div>
                        <div className='ml-[24px] mt-[5px]'>**********</div>
                        <div className='pointer' onClick={() => setChangePassword(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" /></svg>
                        </div>
                    </div>

                </div>

            </div>
        </>

    )

}
