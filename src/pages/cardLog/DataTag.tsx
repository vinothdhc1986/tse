import React, { useState } from 'react'
import '../../app/components/tree/styles.scss'
import { BsNodePlus } from 'react-icons/bs'
import { BsNodeMinus } from 'react-icons/bs'
let tagIndex = 0;
function DataTag({ explorer, initValue = false }) {
    const [expandData, setExpandData] = useState(false);

    return (
        <>
            <div className="" style={{ display: initValue ? 'block' : 'none' }} onClick={(e) => { e.stopPropagation() }}><div className='line4'></div><span className='tag mr-[12px] font-bold'>Tag  </span><span className='tag-key'>:</span><span className='ml-[5px]'> {explorer.Tag} <span className='ml-[48px]'><span className='font-bold'>Length</span> ({explorer.Length})</span></span>
                <div className="flex expand2" onClick={(e) => { setExpandData(!expandData) }}>
                    <span className='inline-flex'>
                    <div className='line2'></div>{explorer.DataParsed.length > 0 && (expandData ? <BsNodeMinus /> : <BsNodePlus />)}
                    </span>
                    <div className="inline-flex"> <div className={"node-value font-bold mr-[12px] " +(explorer.DataParsed.length > 0 ? " more-child " : "no-child") +" "}>Value</div>  : <span className='ml-[10px]'></span> <span>{explorer.Data}</span></div>
                </div>
                <div style={{ display: expandData ? 'block' : 'none' }}>
                    {
                        explorer.DataParsed && explorer.DataParsed.map(item => <DataTag key={`tag-${tagIndex++}`} explorer={item} initValue={expandData} />)
                    }
                </div>
            </div>

        </>
    )
}

export default DataTag