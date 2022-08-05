import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../app/store";
import Props from './typing';
import './styles.scss';
import { fetchusers } from './userListSlice';
import NewUser from "./NewUser";
import Table from "../../app/components/table/Table";
import { COLUMNS } from "../users/columns";
import { UserRoles } from "./constants/constants";
import Loader from "../../app/components/loader/loader";


const UserBoard: FC<Props> = (props): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const { isLoading, error, users } = useSelector((state: RootState) => state.userList);

	const userList = users.map((user) => {
		return {
			...user,
			Role: UserRoles[Number(user.Role) - 1],
		}
	});

	useEffect(() => {
		dispatch(fetchusers());
	}, []);

	const openModal = () => {
		setIsOpen(!isOpen);
	};

	return (<>
		{isOpen && (
			<NewUser setIsOpen={openModal} />
		)}
		{isLoading ?
			<Loader /> :
			<div className="users-container">
				<div className="flex justify-between">
					<div className="flex gap-x-3 items-center">
						<div className="tot-proj">Total Users {userList.length}</div>
					</div>
					<div>
						<button className="primary-button" onClick={openModal}>
							+ Create User
						</button>
					</div>
				</div>
				{userList.length > 0 && (
					<section>
						<div className="table-container">
							<Table columns={COLUMNS} data={userList} />
						</div>
					</section>
				)}
			</div>
		}
	</>)
}

export default UserBoard;