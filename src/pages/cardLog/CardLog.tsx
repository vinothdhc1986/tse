import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCardLog } from './cardLogSlice';
import { RootState } from '../../app/store';
import '../../app/components/tree/styles.scss'
import { BsNodePlus } from 'react-icons/bs'
import { BsNodeMinus } from 'react-icons/bs'
import { CardLogCommands } from '../../app/components/tree/constants'
import Loader from '../../app/components/loader/loader';
import DataTag from './DataTag';

export default function CardLog() {
  const dispatch = useDispatch();
  const { isLoading, error, cardLogs, rootName } = useSelector((state: RootState) => state.cardLogs);
  useEffect(() => {
    dispatch(fetchCardLog());
  }, []);

  const [rootExpand, setRootExpand] = useState(false);
  const [root, setRoot] = useState<any[]>([]);
  const [fileResponses, setFileResponses] = useState<any[]>([]);
  const [commandFileRespones, setCommandFileResponses] = useState<any[]>([]);
  let keyIndex = 0;

  useEffect(() => {
    if (!isLoading && cardLogs.length) {
      setRoot(cardLogs);
    }
  }, [isLoading])

  const toggleCommandAndResponse = (index) => {
    const copyRoot = [...root];
    copyRoot[index] = { ...copyRoot[index], expand: !copyRoot[index].expand, cmdClick: false };
    setRoot(copyRoot);
  }

  const toggleCmdClick = (index) => {
    const copyRoot = [...root];
    copyRoot[index] = { ...copyRoot[index], cmdClick: !copyRoot[index].cmdClick };
    setRoot(copyRoot);
  }

  const renderCommandData = (e, data, index: number) => {
    e.stopPropagation();
    if (data.length) {
      const copyCommandFieResponses = [...commandFileRespones];
      copyCommandFieResponses[index] = copyCommandFieResponses[index] === undefined ? true : copyCommandFieResponses[index] ? false : true;
      setCommandFileResponses(copyCommandFieResponses);
    }
  }

  const renderResponseData = (e, data, index) => {
    e.stopPropagation();
    if (data.length) {
      const copyFileResponses = [...fileResponses];
      copyFileResponses[index] = fileResponses[index] === undefined ? true : fileResponses[index] ? false : true;
      setFileResponses(copyFileResponses);
    }
  }

  return (
    <>
      {isLoading ?
        <Loader /> :
        <>
          <div className="tree-container">
            <span onClick={() => setRootExpand(!rootExpand)}>
              <span className='inline-flex'> {!rootExpand ? <BsNodePlus /> : <BsNodeMinus />} </span>
              <span className='ml-[4px]'> Parsed Log View </span>
            </span>
            <br />
            {<span className='tag' style={{ display: rootExpand ? 'block' : 'none' }}>{rootName}</span>}


            <div style={{ display: rootExpand ? 'block' : 'none' }}>{root && root.map((file, index) => (
              <div className='expand' key={`main-${keyIndex++}`}>
                <div onClick={() => { toggleCommandAndResponse(index) }}>
                  <span className='inline-flex'>{!root[index].expand ? <BsNodePlus /> : <BsNodeMinus />}</span><span className='ml-[5px]'>{file?.Command?.Description}</span>
                </div>

                <div className='expand' style={{ display: root[index].expand ? 'block' : 'none' }}>
                  <div onClick={() => { toggleCmdClick(index) }}>
                  
                    <span className='inline-flex'><div className='line3'></div>{!root[index].cmdClick ? <BsNodePlus /> : <BsNodeMinus />}</span>
                    <span className='node-text font-bold'><span className='mr-[10px]'>Command</span><span className='mr-[8px]'>:</span> </span>{
                      Object.entries(file?.Command).filter(cmd => CardLogCommands.includes(cmd[0])).map((cmd, j) => cmd[1]).join(',').replaceAll(',', ' ')
                    } {<span>{file?.Command?.Data && `${file?.Command?.Data.match(/.{1,2}/g).join(' ')}`}</span>}


                    <div className="ml-[18px]" style={{ display: root[index].cmdClick ? 'block' : 'none' }}>
                      {
                        Object.entries(file?.Command).filter(cmd => CardLogCommands.includes(cmd[0])).map((cmd, ind) =>
                          <div onClick={(e) => e.stopPropagation()} className='expand' key={`sub${ind}_${keyIndex++}`}>
                            <span> <div className={'font-bold cmd-'+cmd[0].length}>{cmd[0]}<div className='line'></div></div><span>:</span> <span className='ml-[10px]'>{cmd[1]} </span></span>
                          </div>
                        )
                      }
                      <div className="expand" onClick={(e) => e.stopPropagation()}><div className='cmd-4 font-bold'>Data<div className='line'></div></div><span>:</span><span className='ml-[10px]'>{file.Command.Data}</span></div>

                      <div className="" onClick={(e) => { renderCommandData(e, file.Command.DOLParsed, index) }} >
                        <div className="inline-flex" style={{ display: file.Command.DOLParsed.length ? 'display' : 'none' }} >
                          <span className=''>{!commandFileRespones[index] ? <BsNodePlus /> : <BsNodeMinus />}</span>
                          <span className={
                            "response-data " +
                            (!file.Command.Data ? "no-response " : "resonse ") +
                            " "
                          }>Data: </span>{file.Command.Data ? file.Command.Data : '-'}
                        </div>

                        <div className='expand' style={{ display: commandFileRespones[index] ? 'block' : 'none' }} >
                          {file.Command.DOLParsed.map(explorer => <DataTag explorer={explorer} key={`sub${keyIndex++}`} initValue={true} />

                          )}
                        </div>

                      </div>


                    </div>


                  </div>
                  <div className="" onClick={(e) => { renderResponseData(e, file.Response?.DataParsed, index) }} >
                    <div className="inline-flex" style={{ display: file.Response.Data ? 'display' : 'none' }} >
                    <div className='line3'></div><span className=''>{!fileResponses[index] ? <BsNodePlus /> : <BsNodeMinus />}</span>
                      <span className={
                        "response-data " +
                        (!file.Response.Data ? "no-response " : "resonse ") +
                        " "
                      }><span className='mr-[12px] font-bold '>Response</span> </span>:<span className='ml-[5px]'>{file.Response.Data ? file.Response.Data : '-'}</span>
                    </div>

                    <div className='expand3' style={{ display: fileResponses[index] ? 'block' : 'none' }} >
                      {file.Response.DataParsed.map(explorer => <DataTag explorer={explorer} key={`sub${keyIndex++}`} initValue={true} />

                      )}
                    </div>

                  </div>
                </div>

                <div>{file?.Response?.SW}-{file.Response?.SWDescription}</div>
              </div>

            ))}
            </div>

          </div>
        </>
      }
    </>
  )
}
