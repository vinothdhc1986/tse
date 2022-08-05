import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Sidebar from '../../sidebar/Sidebar';
import './styles.scss';
import logo from '../../../../asset/images/logo - Copy.png';


function Header() {
	const node = useRef<any>();
	const [open, setOpen] = useState(false);
	const handleClickOutside = e => {
		if (node.current.contains(e.target)) {
			// inside click
			return;
		}
		// outside click
		setOpen(false);
	};

	useEffect(() => {
		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	return (
		<div ref={node}>
			<div className='header bg-white'>
				<div className="flex">
					<div className="space-y-2 menu-icon" onClick={() => setOpen(!open)}>
						<div className="w-8 h-0.5 bg-gray-600"></div>
						<div className="w-8 h-0.5 bg-gray-600"></div>
						<div className="w-8 h-0.5 bg-gray-600"></div>
					</div>
					<div className='logo'>
						<img src={logo} alt="Logo" />
					</div>
				</div>
			</div>

			<Sidebar isOpen={open} />

		</div>
	)
}

const AuthHeader = () => {
	const { loggingIn } = useSelector((state: RootState) => state.login);
	if (loggingIn?.message || sessionStorage.getItem('user') ) {
		return (<Header />);
	}
	return (<></>);
}
export default AuthHeader;
