import React from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";

import "./filterModal.scss";

  const FilterModal = React.forwardRef(
  ({ children, onSelect, onCancel, onClear }, ref) => {
    return (
     <div className="modal_wrapper" >
      <DialogOverlay
        ref={ref}
        className="modal_container"
        aria-label="modal window"
        style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
      >
        <DialogContent
          style={{ boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)" }}
        >
        <div className="modal_header" >
          <button className="close" onClick={() => onCancel()} >x</button >
        </div >
        <div className="modal_content" >{children}</div >
        <div className="modal_actions" >
          <button className="apply" onClick={() => onSelect()} >Apply</button >
          <button className="clear" onClick={() => onClear()} >Clear</button >
        </div >
        </DialogContent>
      </DialogOverlay >
     </div >
    );
  });
export default FilterModal;
