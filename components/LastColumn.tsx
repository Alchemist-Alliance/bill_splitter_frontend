import React from 'react'
import { CustomButton, ProgressBar } from "@/components";
import { currentExpense } from '@/data'

const LastColumn = () => {
    return (
        <div className="flex flex-col justify-between shadow-custom bg-primary text-stroke rounded-2xl p-7">
            <p className="text-2xl font-bold mb-5">Paid Till Now</p>
            <div className='mb-7'>
                {currentExpense.map((user, index) => (
                    <ProgressBar key={index} name={user.name} money={user.money} total={2000} />
                ))}
            </div>
            <CustomButton classname='bg-secondary text-stroke' title='Full Summary' />
        </div>
    )
}

export default LastColumn