import React, { useState } from "react";
import VTlist from "./VTlist";
import { MdOutlineFilterAlt } from 'react-icons/md';
import VTcontent from "./VTcontent";
import "./VerticalTab.scss";

function VerticalTab(props) {
    const [activeTabId, setActiveTabId] = useState(0);
    const [isTestInfo, setTestInfo] = useState(true);

    function btnClick(id, isInfo) {
        setActiveTabId(id);
        setTestInfo(isInfo);
    }

    return (
        <>
            <div className="flex section__Jobs-container">
                <div className="w-3/12 section__Jobs-styledTab">
                    <ul className="tab-list">
                        <div className="flex justify-between justify-items-center">
                            <div className="font-bold">Test Cases</div>
                            <div><MdOutlineFilterAlt /></div>
                        </div>
                        {props.data.map((project, index) => (
                            <VTlist
                                key={index}
                                onClick={ (index, info) => btnClick(index, info)}
                                data={project}
                                index={index}
                                activeTabId={activeTabId}
                            />
                        ))}
                    </ul>
                </div>
                <div className="w-9/12 content-container">
                    <div className="selectedContent">{isTestInfo ? props.data[activeTabId]?.testCaseID : 'Pass Criteria'}</div>
                    <div className="inner-container">
                        <div className="outer-container">


                            {props.data.map((data, index) => (
                                <VTcontent
                                    data={data}
                                    key={index}
                                    index={index}
                                    activeTabId={activeTabId}
                                    isTestInfo={isTestInfo}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );

}

export default VerticalTab;
