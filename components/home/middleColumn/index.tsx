import {Avatar} from "@/components";
import {BiSearch} from "react-icons/bi";
import {IconType} from "react-icons";
import {friends, items} from "@/components/data";

export default function MiddleColumn() {
	return (
		<div className="flex flex-col gap-y-8">
			<div className="bg-dark-pink p-4 text-light-pink text-md flex flex-col gap-y-4 rounded-xl">
				<p className="text-2xl font-bold">Enter Item</p>
				{items.map(item => (<Item {...item} />))}
				<button className="text-2xl font-bold bg-light-pink text-dark-pink rounded-xl py-3">
					Add Item
				</button>
			</div>
			<div className="bg-coffee p-4 text-brown text-md flex flex-col gap-y-4 rounded-xl">
				<p className="text-2xl font-bold">Add friends to trip</p>
				<div className="flex flex-row justify-around items-center">
					{friends.map(friend => (
						<div className="flex flex-col">
							<Avatar src={friend.icon} className="border-brown" width={80} height={80}/>
							<p className="text-center font-bold mt-2">{friend.name}</p>
						</div>
					))}
				</div>
				<div className="flex flex-row justify-start items-center bg-brown text-coffee rounded-xl">
					<BiSearch size={40} className="m-4 mr-0"/>
					<input
						className="font-bold w-full p-4 placeholder:text-coffee focus:outline-none bg-brown text-coffee"
						placeholder="Search by Name of ID" name="search"/>
				</div>
			</div>
		</div>
	)
}

function Item({Icon, label}: { Icon: IconType, label: string }) {
	return (
		<div className="flex flex-row justify-start items-center">
			<Icon size={40} className="m-4"/>
			<input
				className="font-bold w-full rounded-xl p-4 text-dark-pink bg-light-pink placeholder:text-dark-pink focus:outline-none"
				placeholder={label} name={label}/>
		</div>
	)
}
