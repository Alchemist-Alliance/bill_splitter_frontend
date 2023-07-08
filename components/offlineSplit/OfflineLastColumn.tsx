"use client"

import { ReducerAction, appState } from '@/types';
import { userBillPaid } from '@/utils';
import DetailProgressBar from './DetailProgressBar';
import { Dispatch } from 'react';
import { AnimatePresence } from 'framer-motion';


const OfflineLastColumn = ({ data, dispatch }: { data: appState, dispatch: Dispatch<ReducerAction> }) => {
    return (
        <div className="lg:row-span-2 flex flex-col shadow-custom bg-primary text-stroke rounded-xl overflow-y-auto overflow-x-hidden no-scrollbar p-5 lg:p-7 md:p-7 lg:max-h-[604px]">
            <p className="text-2xl font-bold mb-5">Paid Till Now</p>
            <AnimatePresence initial={false}>
                {data.memberNames.map((user, index) => (
                    <DetailProgressBar key={index} index={index} name={user} money={userBillPaid(data["memberExpenses"][user])} total={data.totalBill} memberExpense={data["memberExpenses"][user]} dispatch={dispatch} />
                ))}
            </AnimatePresence>
        </div>
    )
}

export default OfflineLastColumn