
import React from "react";
import Doc from "../../app/components/doc/Doc";
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

export default function LOC() {
    const navigate = useNavigate();
    const closeLOC = () => {
        navigate(-1)
    };

    return (
        <>
            <div className="loc-close">
                <MdClose className="pointer close-btn" onClick={closeLOC}/>
            </div>

            <div className="loc-container">
                <Doc source="https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc" />
            </div>
        </>
    );
}
