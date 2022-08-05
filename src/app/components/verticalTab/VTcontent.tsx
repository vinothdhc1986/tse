import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { attchFileModalStyles, exportReportModalStyles } from './constants';
import { BsFileSpreadsheet } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import "./VTContent.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { exportAttachmentsData } from "./contentSlice";
import Select from "react-select";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";

function VTcontent(props) {
  const dispatch = useDispatch();
  let data = props.data;
  const [activeTabId, setActiveTabId] = useState(0);
  const [activeLog, setActiveLog] = useState({ cardLog: false, hostLog: false });
  const [tabView, setTabView] = useState(true);
  const [attachFile, setAttachFile] = useState(false);
  const [documentAttachment, setDocumentAttachment] = useState();
  const [cardLogAttachmentent, setCardLogAttachment] = useState();
  const [hostLogAttachmentent, setHostLogAttachment] = useState();
  const [selectedAttachments, setSelectedAttachments] = useState({ document: false, cardLog: false, hostLog: false });
  const { isLoading, error, exportAttachementResult } = useSelector((state: RootState) => state.contentInfo);
  const [isExportReport, setIsExportReport] = useState(false);
  const [TSEZ, setTSEZ] = useState(false);
  const [selections, setSelection] = useState(null);


  useEffect(() => {
    if (exportAttachementResult) {
      closeModal();
    }
  }, [exportAttachementResult]);

const onToggleSelection = (value) => {
  setSelection(value);
}
  const toggleStatus = (ind) => {
    setActiveTabId(ind);
  }

  function closeModal() {
    setAttachFile(false);
  }

  const onCancel = () => {
    setAttachFile(false);
  }

  const closeExportReport = () => {
    setIsExportReport(false);
  }

  const cancelExportReport = () => {
    setIsExportReport(false);
  }

  const onExport = () => {
    if (selectedAttachments.document && documentAttachment) {
      const documentFormData = new FormData();
      documentFormData.append('file', documentAttachment);
    } else if (selectedAttachments.cardLog && cardLogAttachmentent) {
      const cardLogFormData = new FormData();
      cardLogFormData.append('file', cardLogAttachmentent);
    } else if (selectedAttachments.hostLog && hostLogAttachmentent) {
      const hostLogFormData = new FormData();
      hostLogFormData.append('file', hostLogAttachmentent);
    }
    const data: any = {};
    dispatch(exportAttachmentsData(data));
  }

  const toggleSelection = (type, value) => {
    setSelectedAttachments({ ...selectedAttachments, [type]: value });
  }

  const onAttachment = (files, type) => {
    if (type === 'document') {
      setDocumentAttachment(files[0]);
    } else if (type === 'cardLog') {
      setCardLogAttachment(files[0]);
    } else if (type === 'hostLog') {
      setHostLogAttachment(files[0]);
    }
  }

  const exportReport = () => {
    setIsExportReport(false);
  }

  return (
    <div
      key={props.index}
      className="project-summary-content-container"
      style={
        props.activeTabId === props.index
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <Modal shouldCloseOnOverlayClick={false}
        isOpen={isExportReport}
        onRequestClose={closeExportReport}
        style={exportReportModalStyles}
      >
        <div className='flex justify-between'>
          <div className="font-bold">Export Report</div>
          <div className="pointer" onClick={closeExportReport}>
            <MdClose />
          </div>
        </div>
        <div className="mt-[25px]">
          201
        </div>
        <div className="mt-[25px]">
          Discover
        </div>

        <div className="mt-[25px]">
          Select the report format
          <div className="flex gap-[24px] mt-[24px]">

            <div onClick={() => onToggleSelection(0)} className={"bg-white pointer text-center px-[24px] w-1/2 py-[24px] " + (selections === 0 ? "selected" : "bg-white")}>TSEZ</div>
            <div onClick={() => onToggleSelection(1)} className={"bg-white pointer text-center px-[24px] w-1/2 py-[24px] " + (selections === 1 ? "selected" : "bg-white")}>TSER</div>

          </div>
        </div>

        <div className="flex mt-[24px] gap-[24px] items-center">
          <button className='transparent-button' onClick={cancelExportReport} >Cancel</button>
          <button className='primary-button' onClick={exportReport}>Export</button>
        </div>

      </Modal>

      <Modal shouldCloseOnOverlayClick={false}
        isOpen={attachFile}
        onRequestClose={closeModal}
        style={attchFileModalStyles}
      >
        <div className='flex justify-end'>
          <div className="pointer" onClick={closeModal}>
            <MdClose />
          </div>
        </div>
        <div className="">
          <div>Manage Logs/Attachments</div>
          <div>Discover1</div>
          <div>Discover: {'DGN'}</div>
          <div className="attachment">
            <div className='flex justify-between mr-[36px] '>
              <div className="font-bold my-[4px]">Attachments</div>
              <div className="flex"><input onChange={(event) => onAttachment(event.target.files, 'document')} type="file" className="file-input" /><div className="mt-[5px]">Add Document</div></div>
            </div>

            <div className="  ">
              {!documentAttachment ?
                <div className="cards flex flex-col justify-center items-center">
                  <BsFileSpreadsheet className="read-icon" />
                  <div>No Attachment</div>
                </div> :
                <div className="cards flex items-center gap-[12px]">
                  <div className="input-content ml-[12px] w-[74.8%]">
                    <input id="doc-log-checkbox" className="cb ml-[12px] input-content" checked={selectedAttachments['document']} type='checkbox' onChange={(e) => toggleSelection('document', e.target.checked)} />
                    <label htmlFor="doc-log-checkbox" className="">{documentAttachment['name']}</label>
                  </div>

                </div>
              }

            </div>
          </div>

          <div className="attachment">
            <div className='flex justify-between mr-[36px]'>
              <div className="font-bold my-[4px]">Card Log</div>
              <div className="flex"><input onChange={(event) => onAttachment(event.target.files, 'cardLog')} type="file" className="file-input" /><div className="mt-[5px]">Add Document</div></div>
            </div>

            <div className="">
              {!cardLogAttachmentent ? <div className="cards flex items-center	flex-col justify-center"><BsFileSpreadsheet className="read-icon" />
                <div>No Card Log</div> </div> :
                <div className="cards flex items-center gap-[12px]">
                  <div className="input-content ml-[12px] w-[74.8%]">
                    <input id="card-log-checkbox" className="cb ml-[12px] input-content" checked={selectedAttachments['cardLog']} type='checkbox' onChange={(e) => toggleSelection('cardLog', e.target.checked)} />
                    <label htmlFor="card-log-checkbox">{cardLogAttachmentent['name']}</label>
                  </div>
                  <ToggleSwitch id="carLog" isChecked={activeLog.cardLog} setSwitchChange={(val) => setActiveLog({ ...activeLog, cardLog: val })} />
                </div>}
            </div>
          </div>

          <div className="attachment">
            <div className='flex justify-between mr-[36px]'>
              <div className="font-bold my-[4px]">Host Log</div>
              <div className="flex"><input onChange={(event) => onAttachment(event.target.files, 'hostLog')} type="file" className="file-input" /><div className="mt-[5px]">Add Document</div></div>
            </div>

            <div className="">
              {!hostLogAttachmentent ? <div className="cards flex items-center	flex-col  justify-center"><BsFileSpreadsheet className="read-icon" />
                <div>No Host Log</div> </div> :
                <div className="cards flex items-center gap-[12px]">
                  <div className="input-content ml-[12px] w-[74.8%]">
                    <input id="host-log-checkbox" className="cb" checked={selectedAttachments['hostLog']} type='checkbox' onChange={(e) => toggleSelection('hostLog', e.target.checked)} />
                    <label htmlFor="host-log-checkbox" className="">{hostLogAttachmentent['name']}</label>
                  </div>

                  <ToggleSwitch id="hostLog" isChecked={activeLog.hostLog} setSwitchChange={(val) => setActiveLog({ ...activeLog, hostLog: val })} />
                </div>}
            </div>
          </div>

          <div className="flex justify-end mt-[20px]	gap-[24px] items-center">
            <button onClick={onCancel} className='transparent-button'>Cancel</button>
            <button className="primary-button" disabled={!selectedAttachments.hostLog && !selectedAttachments.cardLog && !selectedAttachments.document} onClick={onExport}>Export</button>
          </div>

        </div>
      </Modal>
      {props.isTestInfo ? (
        <>
          <div className="test-case">
            <div className="font-bold title">Objective:</div>
            <div className="desc">{data.objective}</div>
          </div>
          <div className="test-case">
            <div className="font-bold title">Applicability:</div>
            <div className="desc">{data.applicable}</div>
          </div>
          <div className="test-case">
            <div className="font-bold title">Actions:</div>
            {data.actions.map((action, index) => (
              <div className="flex gap-x-[5px] desc" key={'content_' + index} ><div>{index + 1 + '.'}</div> <div>{action}</div></div>

            ))}
          </div></>)
        : !tabView ? (
          <>
            {data.UserPassCriterias &&
              <div className="test-case">
                <div className="font-bold title">User Pass Criterias:</div>
                {data.UserPassCriterias.map((action, index) => (
                  <div className="flex gap-x-[5px] desc" key={'content_' + index} ><span className={"circle " + (props.data.status ? props.data.status : " ") + " mt-[5px]"}></span> <div>{action}</div></div>

                ))}
              </div>
            }
            {data.CardPassCriterias &&
              <div className="test-case">
                <div className="font-bold title">Card Pass Criterias:</div>
                {data.CardPassCriterias.map((action, index) => (
                  <div className="flex gap-x-[5px] desc" key={'content_' + index} ><span className={"circle " + (props.data.status ? props.data.status : " ") + " mt-[5px]"}></span> <div>{action}</div></div>

                ))}
              </div>
            }
            {data.HostPassCriterias &&
              <div className="test-case">
                <div className="font-bold title">Host Pass Criterias:</div>
                {data.HostPassCriterias.map((action, index) => (
                  <div className="flex gap-x-[5px] desc" key={'content_' + index} ><span className={"circle " + (props.data.status ? props.data.status : " ") + " mt-[5px]"}></span> <div>{action}</div></div>

                ))}
              </div>
            }
          </>
        ) : <>
          <div className='flex gap-[32px]'>
            <div onClick={() => toggleStatus(0)} className={"font-bold text-[14px] pointer " + (activeTabId === 0 ? "toggle-activeTab " : " ")} >User Pass Criteria</div>
            <div onClick={() => toggleStatus(1)} className={"font-bold text-[14px] pointer " + (activeTabId === 1 ? "toggle-activeTab " : " ")}>Card Pass Criteria</div>
            <div onClick={() => toggleStatus(2)} className={"font-bold text-[14px] pointer " + (activeTabId === 2 ? "toggle-activeTab " : " ")}>Host Pass Criteria</div>
            <div className="flex justify-end w-1/2">
              <div className="mr-[24px] pointer" onClick={() => setIsExportReport(true)}>Export Report</div>
              <div className="flex pointer items-center" onClick={() => setAttachFile(true)} ><div className="text"><ImAttachment /></div><div className="text">Attach File</div></div></div>
          </div>
          <div className="tav-view-content">
            {activeTabId === 0 ?
              <>
                <div className="flex 	">
                  <div className="b-bottom font-bold pb-[5px] w-[82.5%]">Criteria</div>
                  <div className="font-bold">Status</div>
                </div>
                <div className="text">

                  {data.UserPassCriterias.map((action, index) => (
                    <div className="b-bottom flex items-center gap-x-[5px] desc" key={'content_' + index} >
                      <div className={"circle " + (props.data.status ? props.data.status : " ") + " "}>
                      </div>
                      <div className=" mt-[5px] w-[80%] ">{action}</div>
                      <div className="">
                        <Select
                          menuPortalTarget={document.body} />
                      </div>
                    </div>


                  ))}</div></>
              : activeTabId === 1 ? data.CardPassCriterias.map((action, index) => (
                <div className="text flex gap-x-[5px] desc" key={'content_' + index} ><span className={"circle " + (props.data.status ? props.data.status : " ") + " mt-[5px]"}></span> <div>{action}</div></div>

              )) : data.HostPassCriterias.map((action, index) => (
                <div className="text flex gap-x-[5px] desc" key={'content_' + index} ><span className={"circle " + (props.data.status ? props.data.status : " ") + " mt-[5px]"}></span> <div>{action}</div></div>

              ))
            }
          </div>
        </>}
    </div>
  );
}

export default VTcontent;
