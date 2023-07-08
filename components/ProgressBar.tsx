"use client";

import { animate, motion } from "framer-motion"
import { useEffect, useRef } from "react";
import Avatar from "boring-avatars";

const ProgressBar = ({ name, money, total }: {
    name: string,
    money: number,
    total: number
}) => {
    const width = total === 0 ? 0 : Number(money / total)
    const previousBill = useRef<number>(money)
    const nodeRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        const node = nodeRef.current;
        const controls = animate(previousBill.current, money, {
            duration: 0.5,
            onUpdate(value) {
                if (node) {
                    node.textContent = value.toFixed(0);
                }
            }
        });
        previousBill.current = money;
        return () => controls.stop();
    }, [money])

    return (
        <div className='flex flex-row flex-grow py-4'>
            {/* <NamedAvatar name={name} className="w-[3.25rem] h-[3.25rem]" /> */}
            <Avatar
                size={50}
                name={name}
                variant="beam"
                colors={["#45EBA5", "#21ABA5", "#1D566E", "#163A5F", "#073042"]}
            />
            <div className="flex flex-col ml-4 flex-grow">
                <div className='flex flex-row justify-between mb-1'>
                    <p className='font-bold text-lg'>{name}</p>
                    <p className='font-bold text-lg'>₹<span ref={nodeRef}>{money}</span></p>
                </div>
                <div className='flex flex-col h-[0.65rem] bg-secondary rounded-lg rounded-l-sm'>
                    <motion.div animate={{ opacity: 1, width: `${width * 100}%`, transition: { duration: 0.3 } }} initial={{ opacity: 0, width: 0 }} className="flex h-[0.65rem] justify-center bg-gradient-to-r from-stroke-gradient to-stroke rounded-lg rounded-l-sm items-center"></motion.div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar