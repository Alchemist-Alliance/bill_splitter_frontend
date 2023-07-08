"use client"

import { ReducerAction, appState, snackBarIconType } from "@/types"
import { AnimatePresence, motion } from "framer-motion"
import { Dispatch, MutableRefObject, useState } from "react"
import { BsPersonFill } from "react-icons/bs"
import { FaTimes } from "react-icons/fa"

const OfflineBottomColumn = ({ state, dispatch, snackbar }: { state: appState, dispatch: Dispatch<ReducerAction>, snackbar: MutableRefObject<any> }) => {

    const [member, setMember] = useState<string>('')

    const addMembers = () => {
        if (member === '') {
            return snackbar?.current?.show("Name is Empty", snackBarIconType.FaTimesCircle, "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text")
        }
        if (state.memberNames.some((name) => name.toLowerCase() === member.toLowerCase())) {
            snackbar?.current?.show("Member Name already exists", snackBarIconType.FaTimesCircle, "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text")
            return setMember("")
        }
        dispatch({ type: "addMembers", payload: [member] })
        setMember('')
    }

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === "Enter") {
            addMembers()
        }
    }

    const removeMembers = (element: Element) => {
        const member = element.nodeName === "svg" ? element.parentElement?.getAttribute('data-value') : element.parentElement?.parentElement?.getAttribute('data-value')
        const newNames: string[] = state.memberNames.filter(item => item !== member)
        if (member) {
            dispatch({ type: "removeMembers", payload: newNames, payload2: member })
        }
    }

    return (
        <div className="lg:col-span-2 bg-primary shadow-custom text-stroke text-md flex flex-col gap-y-6 rounded-xl p-5 lg:p-7 md:p-7">
            <div className="flex flex-col gap-y-4 items-start lg:flex-row lg:gap-x-4 lg:items-center">
                <p className="text-2xl font-bold">Edit Members</p>
                <div className='flex flex-row pl-2 justify-start items-stretch bg-secondary rounded-lg'>
                    <BsPersonFill size={40} className="m-2" />
                    <input
                        className="font-bold w-full p-3 my-1 rounded-lg caret-stroke text-stroke bg-secondary cursor-text placeholder:text-stroke placeholder:opacity-40 focus:outline-none"
                        placeholder="Enter Name" name="name" value={member} onChange={(e) => setMember(e.target.value)} onKeyDown={handleKeyPress} />
                    <button className='font-bold bg-stroke text-secondary rounded-r-lg lg:px-8 md:px-8 px-5 cursor-pointer' onClick={addMembers}>Add</button>
                </div>
            </div>
            <div className="flex flex-wrap">
                <AnimatePresence initial={false}>
                    {state.memberNames.map((name, index) => (
                        <motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0 }} exit={{ opacity: 0, scale: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} key={index} data-value={name} className="flex bg-secondary text-stroke items-center p-2 px-3 m-1 rounded">
                            <span className="mr-2 font-bold cursor-default">{name}</span>
                            <FaTimes onClick={(e) => removeMembers(e.target as Element)} className="cursor-pointer" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default OfflineBottomColumn    