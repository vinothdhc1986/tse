import React, { FC, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchQuestionaire } from './questionSlice';
import { fetchAnswers, fetchInitialAnswers } from './answersSlice';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { questionDropdownStyles, questionModalStyles, QuestionType, radioOptions } from './constants/constants';
import QuesstionLayout from '../../app/components/questionLayout';
import Props from './typing';
import ReactTooltip from "react-tooltip";
import Input from '../../app/components/Input';
import Select from "react-select";
import { AiOutlineQuestionCircle, AiOutlineArrowRight } from 'react-icons/ai';
import './styles.scss';
import Loader from '../../app/components/loader/loader';

const TSECQuestion: FC<Props> = (props): JSX.Element => {
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const scrollRef = useRef<any>();
    const { ansPayload } = useSelector((state: RootState) => state.answers);
    const [isOpen, setIsOpen] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedRadioBtn, setSelectedRadioBtn] = useState([]);
    const [selectedCheckBox, setSelectedCheckBox] = useState([]);
    useEffect(() => {
        dispatch(fetchInitialAnswers());
        dispatch(fetchQuestionaire());
        setIsOpen(true);
    }, []);



    const {
        isLoading,
        error,
        questions,
    } = useSelector((state: RootState) => state.questionaire);

    const onNext = () => {
        setPageNo(pageNo + 1);
    }

    const changeHandler = (val, questionNo, type?) => {
        const copyValues: any[] = JSON.parse(JSON.stringify(ansPayload));
        const answerObj = copyValues[pageNo - 1].ICSAnswers[questionNo];
        if (typeof val !== 'object') {
            if (type === 'radio') {
                const isChecked = (val === 'Yes') ? true : false;
                answerObj.Answer = isChecked;
                const copySelectedRadioBtn: any = [...selectedRadioBtn];
                if (!copySelectedRadioBtn[pageNo - 1]) {
                    copySelectedRadioBtn[pageNo - 1] = [];
                }
                copySelectedRadioBtn[pageNo - 1][questionNo] = isChecked;
                setSelectedRadioBtn(copySelectedRadioBtn);
            } else {
                answerObj.Answer = val;
            }
        } else {
            if (type !== 'checkbox') {
                answerObj.AnswersID = [val.value];
                const copySelectedOption: any = [...selectedOption];
                if (!copySelectedOption[pageNo - 1]) {
                    copySelectedOption[pageNo - 1] = [];
                }
                copySelectedOption[pageNo - 1][questionNo] = val.id;
                setSelectedOption(copySelectedOption);
            } else {
                answerObj.AnswersID = val;
                const copySelectedCheckBox: any = [...selectedCheckBox];
                if (!copySelectedCheckBox[pageNo - 1]) {
                    copySelectedCheckBox[pageNo - 1] = [];
                }
                copySelectedCheckBox[pageNo - 1][questionNo] = val;
                setSelectedCheckBox(copySelectedCheckBox);
            }
        }
        copyValues[pageNo - 1].ICSAnswers[questionNo] = answerObj;
        dispatch(fetchAnswers(copyValues));
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const goBack = () => {
        setPageNo(pageNo - 1);
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                style={questionModalStyles}
                ref={scrollRef}
                id={
                    "some-id"}

            >
                {isLoading ?
                    <Loader /> :
                    <div className="questionaries-header">
                        <div className="my-[40px]">
                            <div className="flex justify-between">
                                <div>
                                    <div className="flex">
                                        <div>Create Project</div>
                                    </div>
                                    <div className="flex mt-[16px]">
                                        <div>{questions[pageNo - 1]?.Prompt}</div>
                                        {/* <div className="mx-3 pointer"><AiOutlineQuestionCircle data-tip data-for="registerTip" style={{ color: '#519374' }} />
                                            <ReactTooltip id="registerTip" place="bottom" type="light" effect="solid">
                                                <div className='bg-white text-black rounded-[12px] tooltip-container'> {questions && questions[pageNo - 1]?.Help} </div>
                                            </ReactTooltip>
                                        </div> */}

                                    </div>

                                </div>
                                <div className="pointer" onClick={closeModal}>
                                    <MdClose />
                                </div>
                            </div>

                            <div className="mt-[40px]">
                                {questions[pageNo - 1]?.Question?.map((question, index) => (
                                    <QuesstionLayout key={index} className={'create-questionaire-question'} >
                                        <div className="flex-col question justify-between py-[16px] m-[16px]">
                                            <div className='mb-[16px]'>{question?.QuestionName}</div>
                                            <div className="mx-3 pointer"><AiOutlineQuestionCircle data-tip data-for={'registerTip_'+pageNo+'_'+index} style={{ color: '#519374' }} />
                                            <ReactTooltip id={'registerTip_'+pageNo+'_'+index} place="bottom" insecure={true} type="light" effect="solid">
                                                <div className='bg-white text-black rounded-[12px] tooltip-container dyn-tooltip'> {question?.Help} </div>
                                            </ReactTooltip>
                                        </div>
                                            {QuestionType[question?.Type] === 'radio' ?
                                                (
                                                    <Input list={radioOptions} name={'radio_' + pageNo + '_' + index} type={QuestionType[question?.Type]} className={'radio-input'}
                                                        setInputValue={(val) => changeHandler(val, index, QuestionType[question?.Type])}
                                                        value={selectedRadioBtn[pageNo - 1] && ((selectedRadioBtn[pageNo - 1
                                                        ][index] === true) ? 0 : (selectedRadioBtn[pageNo - 1
                                                        ][index] === false) ? 1 : null)}
                                                    />) :
                                                QuestionType[question.Type] === 'dropdown' ?
                                                    <div className='question-select-box queston-dropdown' >
                                                        <Select
                                                            menuPortalTarget={document.body} 
                                                            onChange={(event: any) => { changeHandler(event, index) }}
                                                            getOptionLabel={option => option.value}
                                                            getOptionValue={option => option.id}
                                                            options={question?.Alloweds}
                                                            value={question?.Alloweds?.filter(function (opt) {
                                                                return opt?.id === (selectedOption[pageNo - 1] && selectedOption[pageNo - 1][index]);
                                                            })}
                                                            styles={questionDropdownStyles}
                                                            onFocus={() => { setIsDropdownOpen(true) }}
                                                            onBlur={() => { setIsDropdownOpen(false) }}
                                                        />
                                                    </div> :
                                                    QuestionType[question.Type] === 'checkbox' ?

                                                        (<Input className={'question-input-checkbox'} list={question?.Alloweds} name={'check_' + pageNo + '_' + index} type={QuestionType[question?.Type]}
                                                            setInputValue={(val) => changeHandler(val, index, QuestionType[question?.Type])}
                                                            value={selectedCheckBox[pageNo - 1] && selectedCheckBox[pageNo - 1][index]}
                                                        />) :

                                                        <Input type={QuestionType[question?.Type]} className={'create-question-input'} value={ansPayload[pageNo - 1] && ansPayload[pageNo - 1].ICSAnswers[index]?.Answer} setInputValue={(val) => changeHandler(val, index)} />
                                            }

                                        </div>
                                    </QuesstionLayout>
                                ))}

                            </div>

                            <div className='my-[40px]'>
                                <div className="flex justify-end gap-[24px] items-center">
                                    <button onClick={pageNo === 1 ? closeModal : goBack} className='transparent-button'>{pageNo === 1 ? 'Cancel' : 'Back'} </button>
                                    <button onClick={onNext} className={'primary-button next-question-btn ' + (questions.length === pageNo ? "disable-element" : "")}>Next <AiOutlineArrowRight style={{ color: '#fff' }} /></button>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Modal>

        </>

    )
}

export default TSECQuestion