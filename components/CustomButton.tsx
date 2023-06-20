import React from 'react'

const CustomButton = ({ classname, title }: { classname: string, title: string }) => {
    return (
        <button className={`text-2xl font-bold rounded-xl py-3 ${classname}`}>
            {title}
        </button>
    )
}

export default CustomButton