"use client";

import { Dispatch, useState } from 'react'
import ProgressBar from '../ProgressBar'
import { FaInfoCircle, FaTimes } from 'react-icons/fa'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ReducerAction } from '@/types';

const DetailProgressBar = ({ name, money, total, memberExpense, index, dispatch }: {
    name: string,
    money: number,
    total: number,
    memberExpense: { item: string; amount: string }[],
    index: number,
    dispatch: Dispatch<ReducerAction>
}) => {

    const [showDetail, setShowDetail] = useState(false)

    const listVariants: Variants = {
        open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
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

    const liVariants: Variants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24,
                staggerChildren: 0.05,
                staggerDirection: 1
            }
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
    };

    const divVariants: Variants = {
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

    const removeExpenseItem = (user: string, index: number) => {
        dispatch({ type: "removeItems", payload: { user: user, index: index } })
        if (memberExpense.length === 1) {
            setShowDetail((prev) => !prev)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -50 }}
            transition={{ duration: 0.2, delay: index * 0.2 }}
        >
            <motion.div className="flex flex-row items-center justify-stretch">
                <ProgressBar name={name} money={money} total={total} />
                {
                    memberExpense ?
                        memberExpense.length !== 0 ? <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowDetail((prev) => !prev)}>
                            <FaInfoCircle size={20} className="ml-4 cursor-pointer" />
                        </motion.div> : <div className='ml-9'></div>
                        :
                        <div className='ml-9'></div>
                }
            </motion.div>
            <AnimatePresence initial={false}>
                {showDetail &&
                    <motion.ul
                        layout
                        variants={listVariants}
                        animate="open"
                        initial="closed"
                        exit="closed"
                        className='rounded-lg px-2 py-1 bg-stroke text-secondary'>
                        {
                            <motion.li
                                layout
                                variants={liVariants}
                            >
                                {
                                    memberExpense?.map((item, i) => (
                                        <motion.div key={i} variants={divVariants} className="flex items-center justify-between p-3" >
                                            <p className='mr-16'>{i + 1}.&nbsp;{item.item}</p>
                                            <div className='flex flex-row items-center'>
                                                <p className='mr-4'>₹{item.amount}</p>
                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => removeExpenseItem(name, i)} className='hover:text-background cursor-pointer'>
                                                    <FaTimes />
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ))
                                }
                            </motion.li>
                        }
                    </motion.ul>
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default DetailProgressBar