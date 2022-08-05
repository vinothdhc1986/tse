import React, { useState } from 'react'
import './styles.scss'

function Keys() {
    const [activeTabId, setActiveTabId] = useState(0);
    const [chip, setChip] = useState({
        AC1: '',
        SMI1: '',
        SMC1: '',
    });

    const [member, setMember] = useState({
        AC2: '',
        SMI2: '',
        SMC2: '',
    });

    const onChipChange = (e) => {
        setChip({
            ...chip,
            [e.target.name]: e.target.value
        });
    }

    const onMemberChange = (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value
        });
    }

    const toggleStatus = (ind) => {
        setActiveTabId(ind);
    }

    const onUpdate = () => {
        console.log(chip);
        console.log(member);
    }

    const reset = () => {
        setChip({
            AC1: '',
            SMI1: '',
            SMC1: '',
        });

        setMember({
            AC2: '',
            SMI2: '',
            SMC2: '',
        });
    }

    return (
        <div className='keys-container mt-[24px] flex flex-col items-center gap-[30px]'>
            <div className='w-[45%]'>
                <div className='flex gap-[32px] '>
                    <div onClick={() => toggleStatus(0)} className={"font-bold text-[14px] pointer " + (activeTabId === 0 ? "toggle-activeTab " : " ")} >Chip Keys</div>
                    <div onClick={() => toggleStatus(1)} className={"font-bold text-[14px] pointer " + (activeTabId === 1 ? "toggle-activeTab " : " ")}>Member Keys</div>
                </div>
                <div className="bg-white mt-[24px] h-96 w-full p-[25px]">
                    {activeTabId === 0 ? (<>
                        <div>
                            <div className='font-bold'>AC</div>
                            <div><input onChange={(e) => onChipChange(e)} name="AC1" value={chip.AC1} className='w-80 px-[10px]' /></div>
                        </div>
                        <div className='mt-[50px]'>
                            <div className='font-bold'>SMI</div>
                            <div><input onChange={(e) => onChipChange(e)} name="SMI1" value={chip.SMI1} className='w-80 px-[10px]' /></div>
                        </div>
                        <div className='mt-[50px]'>
                            <div className='font-bold'>SMC</div>
                            <div><input onChange={(e) => onChipChange(e)} value={chip.SMC1} name="SMC1" className='w-80 px-[10px]' /></div>
                        </div>
                        <div className="flex mt-[48px] gap-[24px] items-center">
                            <button className='primary-button' >Update</button>
                            <button className='transparent-button'>Reset to default</button>
                        </div>
                    </>) : (
                        <>
                            <div>
                                <div className='font-bold'>AC</div>
                                <div><input onChange={(e) => onMemberChange(e)} value={member.AC2} name="AC2" className='w-80 px-[10px]' /></div>
                            </div>
                            <div className='mt-[50px]'>
                                <div className='font-bold'>SMI</div>
                                <div><input onChange={(e) => onMemberChange(e)} value={member.SMI2} name="SMI2" className='w-80 px-[10px]' /></div>
                            </div>
                            <div className='mt-[50px]'>
                                <div className='font-bold'>SMC</div>
                                <div><input onChange={(e) => onMemberChange(e)} value={member.SMC2} name="SMC2" className='w-80 px-[10px]' /></div>
                            </div>
                            <div className="flex mt-[48px] gap-[24px] items-center">
                                <button className='primary-button' onClick={onUpdate}>Update</button>
                                <button className='transparent-button' onClick={reset}>Reset to default</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Keys