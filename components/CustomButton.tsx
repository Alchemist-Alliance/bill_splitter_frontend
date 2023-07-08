import React from 'react'

const CustomButton = ({ classname, title }: { classname: string, title: string }) => {
    return (
        <button className={`text-xl font-bold rounded-lg py-3 ${classname}`}>
            {title}
        </button>
    )
}

export default CustomButton