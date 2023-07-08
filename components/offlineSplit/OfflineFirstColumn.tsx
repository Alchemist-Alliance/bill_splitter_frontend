"use client"

import { ReducerAction, appState, snackBarIconType } from "@/types";
import Avatar from "boring-avatars";
import { AnimatePresence, animate, motion } from "framer-motion";
import { Dispatch, useEffect, useRef } from "react";


const OfflineFirstColumn = ({ data, dispatch }: { data: appState, dispatch: Dispatch<ReducerAction> }) => {

    const previousBill = useRef<number>(data.totalBill)
    const nodeRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        const node = nodeRef.current;
        const controls = animate(previousBill.current, data.totalBill, {
            duration: 0.5,
            onUpdate(value) {
                if (node) {
                    node.textContent = value.toFixed(0);
                }
            }
        });
        previousBill.current = data.totalBill;
        return () => controls.stop();
    }, [data.totalBill])

    const split = () => {

    }

    return (
        <div className='relative flex flex-col bg-primary rounded-xl text-stroke shadow-custom p-5 lg:p-7 md:p-7'>
            <p className="text-2xl font-bold">{data.tripName}</p>
            <p className="text-lg font-bold mb-20 pt-3">Splitting with</p>
            <div className='flex flex-row relative -top-16'>
                <AnimatePresence initial={false}>
                    {data.memberNames.map((name, index) => (
                        <motion.div
                            key={index}
                            style={{ zIndex: index, left: `${index * 2}rem`, position: "absolute" }}
                            initial={{ opacity: 0, translateX: -50, scale: 0.5 }}
                            animate={{ opacity: 1, translateX: 0, scale: 1 }}
                            exit={{ opacity: 0, translateX: -50, scale: 0.5 }}
                            transition={{ duration: 0.2, delay: index * 0.2 }}
                        >
                            <Avatar
                                size={40}
                                name={name}
                                variant="beam"
                                colors={["#45EBA5", "#21ABA5", "#1D566E", "#163A5F", "#073042"]}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <div className='bg-secondary rounded-lg text-stroke p-5'>
                <p className="text-lg font-bold pb-4">Your total bill till now</p>
                <p className="text-3xl font-bold"><span className='text-lg font-bold pr-2'>₹</span><span ref={nodeRef}>{data.totalBill}</span></p>
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={split} className="text-xl font-bold bg-secondary text-stroke rounded-lg py-3">
                Split
            </motion.button>
        </div>
    )
}

export default OfflineFirstColumn