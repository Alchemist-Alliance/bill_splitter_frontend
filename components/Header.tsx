import React from 'react'
import { FaRegBell } from "react-icons/fa";
import Avatar from './Avatar';

export default function Header() {
    return (
        <div className="flex flex-row items-center justify-between p-8">
            <div className="text-secondary font-black text-4xl">Bill Splitter</div>
            <div className="flex flex-row items-center justify-between gap-x-4">
                <div className="p-3 bg-white shadow-custom rounded">
                    <FaRegBell size="20" color='#ADBED2' />
                </div>
                <Avatar className="border-stroke shadow-custom" src="https://i.pravatar.cc/300" />
            </div>
        </div>
    )
}
