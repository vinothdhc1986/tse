import React, { useState, useRef, useEffect } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import "./filter.scss";
import FilterModal from "./FilterModal";
 
export default function Filter({children, onApply, label, onClear }) {
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef(undefined);
 const buttonRef = useRef(undefined);
 const modalRef = useRef(undefined);
 
useEffect(() => {
 const handleClick = event => {
 
const isDropdownClicked = dropdownRef.current && dropdownRef.current.contains(event.target);
 const isButtonClicked = buttonRef.current && buttonRef.current.contains(event.target);
 const isModalClicked = modalRef.current && modalRef.current.contains(event.target);
 
 if (isDropdownClicked || isButtonClicked || isModalClicked) {
  // We would do nothing if the ref is undefined or user clicks on menu.
   return;
 }
 
 // Or else close the menu.  
 setIsOpen(false);
 };
 
 document.addEventListener("mousedown", handleClick);
 document.addEventListener("touchstart", handleClick); 
 
 // cleanup
 return () => {
   document.removeEventListener("mousedown", handleClick);
   document.removeEventListener("touchstart", handleClick);
 };
}, [dropdownRef, buttonRef, modalRef]);

const handleSelect = (event) =>{
  setIsOpen(false)
  onApply(event);
}

const onReset = () =>{
  onClear();
}

return (
 <div className="filter_wrapper" > 
   <button 
     ref={buttonRef}
     onClick={() => setIsOpen(!isOpen)}
     className=""
   >
     <div className="filterIcon"><MdOutlineFilterAlt /></div>
  </button >

 {isOpen && (
   <FilterModal
    ref={modalRef}
     onSelect={() => handleSelect()}
     onCancel={() => setIsOpen(false)}
     onClear={() => onReset()}
     
   >
    {children}
‍   </FilterModal >
  )}
‍  </div >
 );
}