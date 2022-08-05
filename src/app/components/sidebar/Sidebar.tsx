import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { navItems } from "./constants";
import './styles.scss';

function Sidebar({ isOpen }) {
        return (isOpen && (
            <div className="flex flex-row bg-gray-100 sidebar-container">
                <div className="flex flex-col w-56 bg-white rouned-r-3xl overflow-hidden">
                    <ul className="flex flex-col py-4">
                        {navItems.map(item => (
                            <li key={item.name}>
                                <Link to={item.path} className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-home"></i></span>
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
        )
    
}

export default Sidebar;
