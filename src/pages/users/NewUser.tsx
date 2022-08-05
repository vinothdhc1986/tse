import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { RootState } from "../../app/store";
import Props from './typing';
import './styles.scss';
import { dropdownProps } from "./typing";
import { fetchusers, createUser } from './userListSlice';
import { newUserInitValidation, newUserInitValues, roles, rolesDropdownStyles, userModalStyles } from "./constants/constants";
import Input from '../../app/components/Input';
import Select from "react-select";
import { FormErrors } from "../../app/components/FormErrors";

const NewUser: FC<Props> = (props): JSX.Element => {
	const { setIsOpen } = props;
	const dispatch = useDispatch();
	const [isNewUser, setIsNewUser] = useState(true);
	const [errors, setErrors] = useState(newUserInitValues);
	const [fieldValidationErrors, setFieldValidationErrors] = useState(newUserInitValidation);
	const [isFormValid, setIsFormValid] = useState(false);
	const [user, setUser] = useState(newUserInitValues);

	function closeModal() {
		setIsNewUser(false);
		setIsOpen && setIsOpen();
	}

	const onCreate = () => {
		setIsNewUser(true);
		dispatch(createUser(user));
		setIsOpen && setIsOpen();
	}

	const onCancel = () => {
		setIsNewUser(false);
		setIsOpen && setIsOpen();
	}

	const validateField = (fieldName, value) => {
		const errorCopy = { ...errors };
		const copyFieldValidationErrors = { ...fieldValidationErrors };
		switch (fieldName) {
			case 'EmailID':
				const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				copyFieldValidationErrors.EmailIDValid = emailValid ? true : false;
				errorCopy.EmailID = emailValid ? '' : ' is invalid'
				break;
			case 'UserName':
				const userNameValid = value?.trim() ?.length > 0;
				copyFieldValidationErrors.UserNameValid = userNameValid;
				errorCopy.UserName = userNameValid ? '' : ' is invalid'
				break;
			case 'Role':
				const roleValid = user.Role || value ? true : false;
				copyFieldValidationErrors.RoleValid = roleValid;
				errorCopy.Role = roleValid ? '' : ' is invalid'
				break;
			default:
				break;
		}
		setErrors({ ...errorCopy });
		setFieldValidationErrors({ ...copyFieldValidationErrors });
		const isValid = !(Object.values(copyFieldValidationErrors).some(error => error === false));
		setIsFormValid(isValid);
	}

	return (<>
		<Modal
			shouldCloseOnOverlayClick={false}
			isOpen={isNewUser}
			onRequestClose={closeModal}
			style={userModalStyles}
		>
			<div className="pointer" onClick={closeModal}>
				<MdClose />
			</div>
			<div className="new-user-container">
				<div className="flex justify-between py-[18px] m-[24px]">
					<div>User Name</div>
					<Input type={'text'} className={'user-input'} value={user.UserName} setInputValue={(val) => { setUser({ ...user, UserName: val }); validateField('UserName', val) }} />
				</div>
				<div className="flex justify-between py-[18px] m-[24px]">
					<div>Email Id</div>
					<Input type={'text'} className={'user-input'} value={user.EmailID} setInputValue={(val) => { setUser({ ...user, EmailID: val }); validateField('EmailID', val) }} />
				</div>
				<div className="flex justify-between py-[18px] m-[24px]">
					<div>Role</div>
					<div className="select-box">
						<Select
							onChange={(val) => { val && setUser({ ...user, Role: val.value }); validateField('Role', val) }}
							onMenuClose={() => { validateField('Role', null) }}
							options={roles}
							styles={rolesDropdownStyles}
						/>
					</div>
				</div>

				<FormErrors formErrors={errors} />

				<div className='my-[40px]'>
					<div className="flex justify-end gap-[24px] mr-[24px] items-center">
						<button onClick={onCancel} className='transparent-button'>Cancel</button>
						<button onClick={onCreate} className={'primary-button ' + (isFormValid ? "" : "disable-element")}>Create</button>
					</div>
				</div>
			</div>

		</Modal>
	</>)
}

export default NewUser;