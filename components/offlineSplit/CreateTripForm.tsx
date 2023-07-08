"use client"

import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaTimes, FaTimesCircle } from "react-icons/fa";
import { SiYourtraveldottv } from "react-icons/si"
import SnackBar from "./SnackBar";
import { useRouter } from 'next/navigation'
import { snackBarIconType } from "@/types";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Link from "next/link";
import { BsPersonFill } from "react-icons/bs";

const CreateTripForm = () => {

    const snackbarRef = useRef<any>(null);
    const [names, setNames] = useState<string[]>([])
    const [query, setQuery] = useState<string>('')
    const [trip, setTrip] = useState<string>('')
    const [tripData, setTripData] = useState<{ tripId: string, tripName: string }[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const navigate = useRouter()

    const listVariants: Variants = {
        open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
                staggerDirection: 1
            }
        },
        closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3
            }
        }
    }

    const itemVariants: Variants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24,
            }
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
    };

    const addMembers = () => {
        if (query === '') {
            return snackbarRef?.current?.show("Name is Empty", snackBarIconType.FaTimesCircle, "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text")
        }
        if (names.some((name) => name.toLowerCase() === query.toLowerCase())) {
            snackbarRef?.current?.show("Member Name already exists", snackBarIconType.FaTimesCircle, "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text")
            return setQuery("")
        }
        const newNames: string[] = [...names, query]
        setNames(newNames)
        setQuery("")
    }

    const removeMembers = (element: Element) => {
        const member = element.nodeName === "svg" ? element.parentElement?.getAttribute('data-value') : element.parentElement?.parentElement?.getAttribute('data-value')
        const newNames: string[] = names.filter(item => item !== member)
        setNames(newNames)
    }

    const genTripId = () => {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).slice(2);
        return (dateString + randomness).toUpperCase();
    };

    const createGroup = () => {
        if (names.length < 2) {
            return snackbarRef?.current?.show("Less than 2 Members", snackBarIconType.FaTimesCircle, "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text")
        }
        if (trip.length === 0) {
            return snackbarRef?.current?.show("Enter name for trip", snackBarIconType.FaTimesCircle, "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text")
        }
        const tripId: string = genTripId()
        const tripObj = {
            [tripId]: {
                memberNames: names,
                tripName: trip,
                creationDate: Date.now()
            }
        }
        const exisitingTrip = localStorage.getItem('trip')
        if (exisitingTrip) {
            localStorage.trip = JSON.stringify({ ...JSON.parse(exisitingTrip), ...tripObj })
        }
        else {
            localStorage.trip = JSON.stringify(tripObj)
        }
        const path = `/trip/${tripId}`
        navigate.push(path)
    }

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === "Enter") {
            addMembers()
        }
    }

    const removeTrip = (element: Element) => {
        const recentTrip = element.nodeName === "svg" ? element.parentElement?.getAttribute('data-value') : element.parentElement?.parentElement?.getAttribute('data-value')
        const trip = localStorage.getItem('trip')
        if (trip) {
            const tripObj = JSON.parse(trip)
            delete tripObj[recentTrip as string]
            localStorage.trip = JSON.stringify(tripObj)
            const temp = tripData.filter((data) => data.tripId !== recentTrip)
            setTripData(temp)
        }
    }

    useEffect(() => {
        const trip = localStorage.getItem('trip')
        if (trip) {
            const temp = []
            const tripObj = JSON.parse(trip)
            for (let i of Object.keys(tripObj)) {
                temp.push({ tripId: i, tripName: tripObj[i]["tripName"] })
            }
            setTripData(temp)
        }

    }, [])

    return (
        <div className='flex items-center justify-center px-5 lg:px-0 md:px-0 lg:mt-10 md:mt-10'>
            <SnackBar ref={snackbarRef} />
            <div className="bg-primary text-stroke text-md flex flex-col gap-y-4 rounded-xl shadow-custom p-5 lg:p-7 md:p-7 lg:w-[450px]">
                <p className="text-2xl font-bold mb-5">Create Group</p>
                <motion.div className='relative flex flex-col items-center rounded-lg'>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsOpen((prev) => !prev)} className='bg-secondary p-3 w-full flex items-center justify-between font-bold rounded-lg'>
                        {'Select Trip'}
                        <motion.div
                            variants={{
                                open: { rotate: 180, transition: { duration: 0.2 } },
                                closed: { rotate: 0, transition: { duration: 0.2 } }
                            }}
                            animate={isOpen ? "open" : "closed"}
                            initial="closed"
                        ><FaChevronDown className='h-8' /></motion.div>
                    </motion.button>
                    <AnimatePresence initial={false}>
                        {isOpen && <motion.div
                            variants={listVariants}
                            animate="open"
                            initial="closed"
                            exit="closed" className='bg-stroke text-secondary z-10 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full no-scrollbar'>
                            {
                                tripData.length === 0 ? <motion.div variants={itemVariants} className='flex items-center w-full font-bold p-4'>
                                    <FaTimesCircle className="mr-4" />
                                    No Recent Trips
                                </motion.div> :
                                    tripData.map((data, index) => (
                                        <motion.div variants={itemVariants} key={index} data-value={data.tripId} className='flex justify-between items-center w-full font-bold p-4 hover:bg-background rounded-r-lg border-l-transparent hover:border-l-secondary border-l-4'>
                                            <Link className="cursor-pointer" href={`trip/${data.tripId}`}>{data.tripName}</Link>
                                            <FaTimes onClick={(e) => removeTrip(e.target as Element)} className="cursor-pointer" />
                                        </motion.div>
                                    ))
                            }

                        </motion.div>}
                    </AnimatePresence>
                </motion.div>
                <div className='flex flex-row items-center bg-secondary rounded-lg'>
                    <SiYourtraveldottv size={30} className="ml-4" />
                    <input
                        className="font-bold w-full rounded-lg p-4 caret-stroke text-stroke bg-secondary placeholder:text-stroke placeholder:opacity-40 focus:outline-none"
                        placeholder="Trip Name" name="trip" value={trip} onChange={(e) => setTrip(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-stretch bg-secondary rounded-lg'>
                        <div className="flex items-center">
                            <BsPersonFill size={30} className="ml-4" />
                            <input
                                className="font-bold w-full p-4 rounded-lg caret-stroke text-stroke bg-secondary cursor-text placeholder:text-stroke placeholder:opacity-40 focus:outline-none"
                                placeholder="Member Name" name="name" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyPress} />
                        </div>
                        <button className='font-bold bg-stroke text-secondary rounded-r-[0.45rem] px-8 cursor-pointer' onClick={addMembers}>Add</button>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <AnimatePresence initial={false}>
                        {names.map((name, index) => (
                            <motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0 }} exit={{ opacity: 0, scale: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} key={index} data-value={name} className="flex bg-secondary text-stroke items-center p-2 px-3 m-1 rounded">
                                <span className="mr-2 font-bold">{name}</span>
                                <FaTimes onClick={(e) => removeMembers(e.target as Element)} className="cursor-pointer" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => createGroup()} className="text-xl font-bold bg-secondary text-stroke rounded-[0.45rem] py-3 mt-5 cursor-pointer">
                    Create Group
                </motion.button>
            </div>
        </div>
    )
}

export default CreateTripForm