import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import './styles.scss';

function Footer() {
	const { loggingIn } = useSelector((state: RootState) => state.login);
	return (
		loggingIn?.message ? (
		<div className='footer'>
			<span className='copy-right'>Copyright &copy; PayHuddle Solutions Private Limited</span>
		</div> ): null
	)
}

export default Footer