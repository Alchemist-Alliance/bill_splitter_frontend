"use client"

import { Dropdown } from "@/components";
import { FaRupeeSign, FaShoppingBag } from "react-icons/fa";
import { ReducerAction, appState, snackBarIconType } from "@/types";
import { Dispatch, MutableRefObject, useState } from "react";
import { motion } from "framer-motion";

export default function OfflineMiddleColumn({ state, dispatch, snackbar }: { state: appState, dispatch: Dispatch<ReducerAction>, snackbar: MutableRefObject<any> }) {

    const [item, setItem] = useState<string>('')
    const [amount, setAmount] = useState<string>('')

    const addItems = () => {

        if (state.selectedUser == '') {
            return snackbar?.current?.show("User Not Selected", snackBarIconType.FaTimesCircle, "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text")
        }
        if (item == '') {
            return snackbar?.current?.show("Item is Empty", snackBarIconType.FaTimesCircle, "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text")
        }
        if (amount == '') {
            return snackbar?.current?.show("Amount is Empty", snackBarIconType.FaTimesCircle, "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text")
        }
        if (!Number(amount)) {
            snackbar?.current?.show("Invalid Amount", snackBarIconType.FaTimesCircle, "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text")
            return setAmount('')
        }

        dispatch({ type: "addItems", payload: [{ item: item, amount: amount }], payload2: state.totalBill + Number(amount) })
        setItem('')
        setAmount('')
    }

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === "Enter") {
            addItems()
        }
    }

    return (
        <div className="relative bg-primary text-stroke text-md flex flex-col gap-y-4 rounded-xl shadow-custom p-5 lg:p-7 md:p-7">
            <p className="text-2xl font-bold">Enter Item</p>
            <Dropdown state={state} dispatch={dispatch} />
            <div className="flex flex-row p-2 justify-start items-center bg-secondary rounded-lg">
                <FaShoppingBag size={25} className="m-2" />
                <input
                    onKeyDown={handleKeyPress}
                    className="font-bold w-full rounded-lg p-3 text-stroke bg-secondary placeholder:text-stroke placeholder:opacity-40 focus:outline-none"
                    placeholder="Enter Item" name="item" value={item} onChange={(e) => setItem(e.target.value)} />
            </div>
            <div className="flex flex-row p-2 justify-start items-center bg-secondary rounded-lg">
                <FaRupeeSign size={25} className="m-2" />
                <input
                    onKeyDown={handleKeyPress}
                    className="font-bold w-full rounded-lg p-3 text-stroke bg-secondary placeholder:text-stroke placeholder:opacity-40 focus:outline-none"
                    placeholder="Enter Amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={addItems} className="text-xl font-bold bg-secondary text-stroke rounded-lg py-3">
                Add Item
            </motion.button>
        </div>
    )
}

