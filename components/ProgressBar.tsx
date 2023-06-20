
import React from 'react'
import Avatar from './Avatar'

const ProgressBar = ({ name, money, width }: {
    name: string,
    money: number,
    width: string,
}) => {
    return (
        <div className='flex flex-row align-middle py-4'>
            <Avatar src="https://i.pravatar.cc/300" width={50} height={50} />
            <div className="flex flex-col ml-4 flex-grow">
                <div className='flex flex-row justify-between mb-1'>
                    <p className='font-semibold text-xl'>{name}</p>
                    <p className='font-semibold text-xl'>₹{money}</p>
                </div>
                <div className='flex flex-col h-3 bg-peach-complementary rounded-2xl'>
                    <div className={`flex w-[${width}] h-1 justify-center bg-peach rounded-2xl items-center mt-1 mx-1`}></div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar