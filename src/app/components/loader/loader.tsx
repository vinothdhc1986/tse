import React, { FC } from 'react';
import './styles.scss';


const Loader: FC = (): JSX.Element => {
  return (
    <div className='loading-container'>
      <div className='loading-wrapper'>
        <div className='loading-text'>Please wait...</div>
        <div className='loading-green'>
        </div>
      </div>
    </div>
  )
}
export default Loader;