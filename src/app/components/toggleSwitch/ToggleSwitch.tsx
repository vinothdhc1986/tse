import React from 'react'
import './styles.scss'

function ToggleSwitch({ id, isChecked, setSwitchChange }) {

    const onchange = (e) => {
        setSwitchChange(e.target.checked)
    }
    return (
        <div className="flex items-center ">

            <label
                htmlFor={id}
                className="justify-self-end	 cursor-pointer"
            >
                <div className="relative">
                    <input id={id} type="checkbox" checked={isChecked} onChange={onchange} className="sr-only" />
                    <div className="w-10 h-4 bg-[#c7ddd2] rounded-full shadow-inner"></div>
                    <div className="dot absolute w-6 h-6 bg-gray-400 rounded-full shadow -left-1 -top-1 transition"></div>
                </div>

            </label>

        </div>


    );
}

export default ToggleSwitch