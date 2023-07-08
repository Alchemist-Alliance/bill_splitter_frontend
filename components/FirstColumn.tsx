import React from 'react'
import Avatar from './Avatar'
import CustomButton from './CustomButton'

const FirstColumn = () => {
    return (
        <div className='flex flex-col relative gap-y-8'>
            <div className='flex flex-col bg-primary rounded-2xl text-stroke shadow-custom p-7'>
                <p className="text-2xl font-bold">#11 Trip to Kashmir</p>
                <p className="text-xl font-semibold mb-24 pt-4">Splitting with</p>
                <div className='flex flex-row relative -top-20'>
                    <Avatar src="https://i.pravatar.cc/300" className={`border-stroke z-0 left-0 absolute`} width={50} height={50} />
                    <Avatar src="https://i.pravatar.cc/300" className={`border-stroke z-10 left-8 absolute`} width={50} height={50} />
                    <Avatar src="https://i.pravatar.cc/300" className={`border-stroke z-20 left-16 absolute`} width={50} height={50} />
                    <Avatar src="https://i.pravatar.cc/300" className={`border-stroke z-30 left-24 absolute`} width={50} height={50} />
                </div>
                <div className='bg-secondary rounded-2xl text-stroke p-6'>
                    <p className="text-xl font-semibold pb-4">Your total bill till now</p>
                    <p className="text-3xl font-bold"><span className='text-xl font-bold pr-2'>₹</span>2000</p>
                </div>
                <CustomButton classname='bg-secondary text-stroke mt-7' title='End Trip' />
            </div>
            <div className='bg-primary rounded-2xl text-stroke shadow-custom p-7'>
                <p className="text-xl font-semibold mb-14">Your Recent Item was</p>
                <div className='flex flex-row justify-between'>
                    <p className="text-2xl font-bold">Shwarma Roll</p>
                    <p className="text-2xl font-bold"><span className='text-xl font-bold pr-2'>₹</span>200</p>
                </div>
            </div>
        </div>
    )
}

export default FirstColumn