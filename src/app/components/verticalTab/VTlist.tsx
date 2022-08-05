import React, { useState } from "react";

import "./VTlist.scss";

function VTlist(props) {
  const [isTestInfo, setTestInfo] = useState<boolean>(true);

  const clicked = (event, isInfo) => {
    if (event) {
      event.stopPropagation();
    }
    const isProjectTestInfo = event ? isInfo : true;
    setTestInfo(isProjectTestInfo);
    props.onClick(props.index, isProjectTestInfo);
  };

  return (
    <li key={props.index} style={{ listStyle: "none", textAlign: "left" }}>
      <div
        onClick={() => clicked(null, false)}
        className={
          "vt-list " +
          (props.activeTabId === props.index ? "selected-list " : " ") +
          "font-bold "
        }
      >
      <span className={"circle "+(props.data.status ?props.data.status: " ")}></span>  {props.data.testCaseID}
        {props.activeTabId === props.index && <div className="flex flex gap-x-[10px]">
          <div onClick={(event) => clicked(event, true)} className={"pointer " + (isTestInfo ? "toggle-test-info-btn " : " ")}>TestInfo</div>
          <div onClick={(event) => clicked(event, false)} className={"pointer " + (!isTestInfo ? "toggle-test-info-btn " : " ")}>Pass Criteria</div>
        </div>}
      </div>
    </li>
  );
}

export default VTlist;
