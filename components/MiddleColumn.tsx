import { Avatar } from "@/components";
import { BiSearch } from "react-icons/bi";
import { IconType } from "react-icons";
import { friends, items } from "@/data";

export default function MiddleColumn() {
    return (
        <div className="flex flex-col gap-y-8">
            <div className="bg-primary p-7 text-stroke text-md flex flex-col gap-y-4 rounded-2xl shadow-custom">
                <p className="text-2xl font-bold">Enter Item</p>
                {items.map((item, index) => (<Item key={index} {...item} />))}
                <button className="text-2xl font-bold bg-secondary text-stroke rounded-xl py-3">
                    Add Item
                </button>
            </div>
            <div className="bg-primary p-7 shadow-custom text-stroke text-md flex flex-col gap-y-4 rounded-2xl">
                <p className="text-2xl font-bold">Add Friends To Trip</p>
                <div className="flex flex-row justify-around items-center">
                    {friends.map(friend => (
                        <div className="flex flex-col">
                            <Avatar src={friend.icon} className="border-stroke" width={50} height={50} />
                            <p className="text-center font-bold mt-2">{friend.name}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row justify-start items-center bg-secondary text-stroke rounded-xl">
                    <BiSearch size={40} className="m-4 mr-0" />
                    <input
                        className="font-bold w-full p-4 placeholder:text-stroke focus:outline-none bg-secondary text-stroke"
                        placeholder="Search by Name or ID" name="search" />
                </div>
            </div>
        </div>
    )
}

function Item({ Icon, label }: { Icon: IconType, label: string }) {
    return (
        <div className="flex flex-row justify-start items-center">
            <Icon size={40} className="m-4" />
            <input
                className="font-bold w-full rounded-xl p-4 text-stroke bg-secondary placeholder:text-stroke focus:outline-none"
                placeholder={label} name={label} />
        </div>
    )
}
