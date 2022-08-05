import React, { FC, useEffect, useState } from 'react';
import Table from '../../app/components/table/Table';
import { COLUMNS } from './columns';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboard } from './dashboardSlice';
import { RootState } from '../../app/store';
import Props from './typing';
import Modal from 'react-modal';
import './styles.scss';
import NewProject from '../projects/NewProject';
import Loader from '../../app/components/loader/loader';
import { useNavigate } from "react-router-dom";
import CircleProgressBar from '../../app/components/circularProgress/CircleProgressBar';
import status from '../../asset/json/status.json';
import tabTwoData from '../../asset/json/tabTwoData.json';
import Filter from '../../app/components/filter/Filter';

const projectHeaders = ['ICS Incomplete', 'ICS Progress', 'ICS Complete'];
Modal.setAppElement('#root');

const Dashboard: FC<Props> = (props): JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading, error, dashboard } = useSelector((state: RootState) => state.dashboard);
	const [isOpen, setIsOpen] = useState(false);
	const [activeTabId, setActiveTabId] = useState(0);
	const [selectedHeaders, setSelectedHeaders] = useState<any>([]);

	useEffect(() => {
		dispatch(fetchDashboard());
	}, []);

	const handleSelect = (header: string) => {
		const isSelected = selectedHeaders.includes(header);
		/* If the option has already been selected, we remove it from the array. */
		/* Otherwise, we add it. */
		const newSelection = isSelected
			? selectedHeaders.filter(currentHeader => currentHeader !== header)
			: [...selectedHeaders, header];
		setSelectedHeaders(newSelection);
	};

	const onClear = () => {
		setSelectedHeaders([]);
	}

	const openModal = () => {
		setIsOpen(!isOpen);
	};

	const navigateToLOC = () => {
		navigate('/loc');
	}

	const toggleStatus = (ind) => {
		setActiveTabId(ind);
	}

	return (
		<>

			{isOpen && (
				<NewProject setIsOpen={openModal} />
			)}
			{isLoading ?
				<Loader /> : <>

					<div className="dashboard-container">
						<div className="flex justify-between">
							<div className="flex gap-x-3 items-center">
								<div className="tot-proj">Total Projects {dashboard.length}</div>
								<Filter label="Filter" onApply={() => alert(selectedHeaders)} onClear={onClear}>
							<div className="filter-list" >
								{projectHeaders.map((header, index) => {
									const isSelected = selectedHeaders.includes(header);
									return (
										<div>
										< label key={index} >
											< input
												type="checkbox"
												checked={isSelected}
												onChange={() => handleSelect(header)}
											/>
									‍             < span className="ml-2 text-base text-gray-500 font-heading" >
										‍               {header}
										‍         </span>
										</label>
										</div>
									);
								})}
							</div>
						</Filter>
							</div>
							<div>
								<button className='mr-[18px] tser' onClick={navigateToLOC}>LOC</button>
								<button className='mr-[18px] tser' onClick={() => { navigate('/cardLog') }}>Card Log</button>
								<button className='mr-[18px] tser' onClick={() => { navigate('/hostLog') }}>Host Log</button>
								<button className='mr-[18px] tser'>Import TSER</button>
								<button className="primary-button" onClick={openModal}>
									+ Create Project
								</button>
							</div>
						</div>
						{dashboard.length > 0 && (<>
							<section className='flex w-full'>
								<div className="table-container">
									<Table columns={COLUMNS} data={dashboard} />
								</div>
								<div className="dashboard-header">
									<div className='flex gap-[32px]'>
										<div onClick={() => toggleStatus(0)} className={"font-bold pb-[10px] text-[14px] pointer " + (activeTabId === 0 ? "toggle-activeTab " : " ")} >Admin Status</div>
										<div onClick={() => toggleStatus(1)} className={"font-bold pb-[10px] text-[14px] pointer " + (activeTabId === 1 ? "toggle-activeTab " : " ")}>Employee Status</div>
									</div>

									{activeTabId === 0 ? (<div className='flex flex-col gap-[20px]'>

										{status.map((item, index) => (
											<div key={`stat_${index}`} className='rounded-[10px] my-[10px] bg-white w-[90%]'>
												<div className='font-bold m-[5px] p-[5px]'>Service Provider Project Status</div>

												<div key={`status${index}`} className='flex justify-around	items-center'>
													<div style={{ width: 150, height: 150 }}>
														<CircleProgressBar
															percentage={item.pending + item.completed}
															innerText="total"

														/>
													</div>

													<div style={{ width: 120, height: 120 }}>
														<CircleProgressBar
															percentage={item.pending}
															innerText="pending"
														/>
													</div>

													<div style={{ width: 120, height: 120 }}>
														<CircleProgressBar
															percentage={item.completed}
															innerText="completed"
														/>
													</div>
												</div>
											</div>

										))}
									</div>) :
										<>
											<div className='rounded-[10px] bg-white my-[10px] px-[12px] py-[5px] w-[96.4%]'>
												<div className='divide-y'>
													<div>
														<div className='text-[14px] font-bold'>some text</div>
														<div className='flex gap-x-[10px] items-center'>
															<div className=' mx-[12px]'>Applicable Test cases</div>
															{tabTwoData.status.map((item, index) => (
																<div key={`tab_2_status_${index}${index}`} style={{ width: 94, height: 94 }}>
																	<CircleProgressBar
																		percentage={item.completed}
																		innerText="Completed"
																	/>
																</div>))
															}
														</div>

													</div>
													<div className='flex gap-x-[30px] items-center'>
														<div className='flex mx-[12px]'>
															Export as
														</div>
														<div className='flex flex-1 justify-between mx-[16px] py-[24px]'>
															<div className='text-blue-600 pointer underline underline-offset-1' >TSE</div>
															<div className='text-blue-600 pointer underline underline-offset-1' >Info file in HTML</div>
															<div className='text-blue-600 pointer underline underline-offset-1' >Info file in Exc</div>
														</div>
													</div>

													<div className='flex gap-x-[82px] items-center '>
														<div className='flex mx-[12px]'>
															LoC
														</div>
														<div className='flex flex-1 gap-x-[102px] py-[24px]'>
															<div className='text-blue-600 pointer underline underline-offset-1' >Generate & preview</div>
															<div className='text-blue-600 pointer underline underline-offset-1' >Download</div>
														</div>
													</div>

													<div className='flex gap-x-[87px] items-center '>
														<div className='flex mx-[12px]'>
															ICS
														</div>
														<div className='flex flex-1 gap-x-[100px] py-[24px]'>
															<div className='text-blue-600 pointer underline underline-offset-1' >Edit</div>
															<div className='text-blue-600 pointer underline underline-offset-1' >View Summary</div>
														</div>
													</div>

													<div className='flex gap-x-[62px] items-center '>
														<div className='flex mx-[12px]'>
															Others
														</div>
														<div className='flex py-[24px]'>
															<div className='text-[#ff0000] pointer underline underline-offset-1' >Delete Project</div>
														</div>
													</div>

												</div>

											</div>
										</>
									}
								</div>
							</section>

						</>
						)}
					</div>
				</>
			}
		</>
	);
}

export default Dashboard;
