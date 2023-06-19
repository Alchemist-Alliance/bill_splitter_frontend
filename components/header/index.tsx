import React from 'react'
import {BsBell} from "react-icons/bs";
import Avatar from "@/components/common/avatar";

export default function Header() {
	return (
		<div className="flex flex-row items-center justify-between p-8">
			<div className="text-slate-500 font-black text-4xl">Bill Splitter</div>
			<div className="flex flex-row items-center justify-between gap-x-4">
				<div className="p-4 bg-white shadow-md rounded-full">
					<BsBell size="20"/>
				</div>
				<Avatar className="border-slate-500" src="https://i.pravatar.cc/300"/>
			</div>
		</div>
	)
}
