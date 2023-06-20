import React from 'react'
import ProgressBar from './ProgressBar'
import { currentExpense } from '@/data'
import CustomButton from './CustomButton'

const LastColumn = () => {
    return (
        <div className="flex flex-col justify-between bg-peach text-peach-complementary rounded-2xl p-7">
            <p className="text-2xl font-bold mb-5">Paid Till Now</p>
            <div className='mb-7'>
                {currentExpense.map((user, index) => (
                    <ProgressBar key={index} name={user.name} money={user.money} width={`${(user.money / 2000) * 100}%`} />
                ))}
            </div>
            <CustomButton classname='bg-peach-complementary text-peach' title='Full Summary' />
        </div>
    )
}

export default LastColumn