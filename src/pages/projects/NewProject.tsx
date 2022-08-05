import React, { useState } from 'react'
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import QuesstionLayout from '../../app/components/questionLayout';
import Input from '../../app/components/Input';
import { describeSelections, projectModalStyles } from '../dashboard/constants/constants';
import Questionaire from '../tse/TSECQuestion';

function NewProject({ setIsOpen }) {
    const [projectName, setProjectName] = useState('');
    const [host, setHost] = useState('');
    const [uploadFile, setUploadFile] = useState<any>([]);
    const [step1Done, setStep1Done] = useState(false);
    const [tsec, setTsec] = useState(false);
    const [tse, setTse] = useState(true);
    const [selections, setSelection] = useState(describeSelections);
    const [isDescSelected, setIsDescSelected] = useState(false);

    const onNext = () => {
        setStep1Done(true);
        if (selections[1].selected) {
            setTse(true);
            setTsec(false);

        } else {
            setTsec(true);
            setTse(false);
            setStep1Done(false);
        }
    };

    const onFinish = () => {
        setTse(false);
        setStep1Done(false);
    }

    const handleSelection = (id: string) => {
        setIsDescSelected(true);
        const index = Number(id.split('-')[1]);
        const updatedArray = selections.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    selected: !item.selected ? true : item.selected,
                }
            }
            return {
                ...item,
                selected: false
            }
        }
        );
        setSelection(updatedArray);
    };

    function closeModal() {
        setTse(false);
        setIsOpen();
    }

    const onUpload = (files: any) => {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        setUploadFile([...uploadFile, file]);
    }

    return (
        <>
            <Modal
                shouldCloseOnOverlayClick={false}
                isOpen={tse}
                onRequestClose={closeModal}
                style={projectModalStyles}
            >
                <div className="my-[40px]">
                    <div className="flex justify-between">
                        <div>
                            <div className="flex">
                                <div>Create Project</div>
                            </div>
                            <div className="proj-info mt-[16px]">{isDescSelected ? 'Project Details' : 'Project Information'}</div>
                        </div>
                        <div className="pointer" onClick={closeModal}>
                            <MdClose />
                        </div>
                    </div>
                    {(!step1Done) && (
                        <div className="mt-[40px]">
                            <QuesstionLayout className={'create-project-question'}>
                                <div className="flex question justify-between py-[18px] m-[24px]">
                                    <div>Project Name</div>
                                    <Input type={'text'} className={'create-project-input'} value={projectName} setInputValue={(val) => setProjectName(val)} />
                                </div>
                            </QuesstionLayout>

                            <div className="mt-[40px]">
                                Describe selection
                                <div className='flex gap-[24px]'>
                                    {selections.map((item, index) => (
                                        <div key={item.id} id={item.id} className={"mt-[24px] pointer rounded-[4px] " + (item.selected ? "selected" : "bg-white")}
                                            onClick={(e) => handleSelection(e.currentTarget.id)}>
                                            <div className="w-[240px] ">
                                            </div>
                                            <div className='ml-[24px]'>
                                                <div className='mt-[24px]'>{item.title}</div>
                                                <div className='my-[16px] text-[12px]'>{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                    )}
                    {(step1Done && tse) && (
                        <>
                            <div className="mt-[40px]">
                                <QuesstionLayout className={'project-detail'}>
                                    <div className='text-[12px] font-bold pl-[12px] pt-[16px]'>Select the file you want to add under TSE project.</div>

                                    <div className="flex question justify-between">
                                    </div>
                                    <div className='mt-[24px] ml-[12px] flex'>
                                        <div className='w-4/6'> Browse File </div>
                                        <div className='w-2/6'> Host Port (Optional)</div>
                                    </div>
                                    <div>
                                        <div className='flex'>
                                            <div className='w-[65%]'><Input type={'file'} className={'details-input upload'} setInputValue={onUpload} /></div>
                                            <div className='w-[35%]'><Input type={'text'} className={'details-input host'} value={host} setInputValue={(val) => setHost(val)} /></div>
                                        </div>
                                    </div>

                                </QuesstionLayout>

                            </div>

                        </>

                    )}

                    <div className='my-[40px]'>
                        <div className="flex justify-end gap-[24px] items-center">
                            <div>
                                {!step1Done && (<button onClick={closeModal} className='transparent-button'>Cancel</button>)}
                                {step1Done && (<button className='transparent-button' onClick={() => setStep1Done(false)}>Back</button>)}
                            </div>
                            <div>
                                {!step1Done && (<button onClick={onNext} className={'primary-button ' + (isDescSelected && projectName?.length > 0 ? "" : "disable-element")}>Next</button>)}
                                {step1Done && (<button onClick={onFinish} className={'primary-button ' + ((isDescSelected && projectName?.length > 0 && !step1Done) || (uploadFile.length > 0 && step1Done) ? "" : "disable-element")}>Finish</button>)}
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
            {tsec && (<Questionaire />)}
        </>
    )
}

export default NewProject