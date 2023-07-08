"use client"

import { ReducerAction, appState } from '@/types'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { Dispatch, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const Dropdown = ({ state, dispatch }: { state: appState, dispatch: Dispatch<ReducerAction> }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleOnClick = (element: Element) => {
        dispatch({ type: 'setSelectedUser', payload: element?.getAttribute('data-value') })
        setIsOpen((prev) => !prev)
    }

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

    return (
        <motion.div className='relative flex flex-col items-center rounded-lg'>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsOpen((prev) => !prev)} className='bg-secondary p-3 w-full flex items-center justify-between font-bold text-lg rounded-lg border-4 border-transparent '>
                {state.selectedUser || 'Select User'}
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
                        state.memberNames.map((name, index) => (
                            <motion.div variants={itemVariants} onClick={(e) => handleOnClick(e.target as Element)} key={index} data-value={name} className='flex w-full font-bold p-4 hover:bg-background cursor-pointer rounded-r-lg border-l-transparent hover:border-l-secondary border-l-4'>
                                {name}
                            </motion.div>
                        ))
                    }
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    )
}

export default Dropdown